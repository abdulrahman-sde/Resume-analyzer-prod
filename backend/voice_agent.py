import asyncio
import json
import logging
from dotenv import load_dotenv

from livekit.agents import Agent, AgentSession, JobContext, JobProcess, cli, WorkerOptions
from livekit.agents.llm import function_tool
from livekit.plugins import  deepgram, groq, elevenlabs,silero

from app.core.db import get_tool_session
from app.services.analysis_service import (
    get_all_analyses_json,
    get_analysis_details_json,
    search_analyses_by_candidate_json,
    get_top_candidates_json,
)
from app.services.resume_service import (
    get_all_resumes_json,
    get_resume_content_json,
)
from app.services.job_service import (
    get_all_jobs_json,
    get_job_details_json,
    get_analyses_for_job_json,
)
from app.models.conversation import Conversation 

load_dotenv()

logger = logging.getLogger("voice-agent")


# ── Prewarm ──────────────────────────────────────────────────────────────────

def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


# ── Voice Agent with Tools ───────────────────────────────────────────────────

VOICE_SYSTEM_PROMPT = """\
You are Unroll AI Voice Assistant for the Unroll AI Resume Analyzer platform.

PURPOSE:
Help users access and understand their jobs, resumes, and candidate analyses.

CAPABILITIES:
- Retrieve analyses, resumes, and job postings.
- Compare candidates by score and recommendation.
- Summarize skills, experience, strengths, and red flags.
- Answer platform-related questions.

BEHAVIOR RULES:
1. Only respond to greetings or questions related to Unroll AI Resume Analyzer.
2. If a question is unrelated, briefly redirect the user to ask about jobs, resumes, or analyses. Keep it short and vary wording naturally. Do not repeat the same sentence every time.
3. Never answer unrelated questions.
4. Always use tools when data is required. Never guess or fabricate information.
5. Keep responses concise, conversational, and voice-friendly.
6. You only have access to the current user's data.
7. If no data is found, clearly inform the user.
8. Never expose raw database IDs unless explicitly requested.
9. When listing results, summarize key insights instead of reading every detail.
"""


class VoiceAssistant(Agent):
    def __init__(self, user_id: int):
        super().__init__(instructions=VOICE_SYSTEM_PROMPT)
        self.user_id = user_id

    # ── Analysis Tools ───────────────────────────────────────────────────

    @function_tool()
    async def get_all_analyses(self, confirm: bool = True) -> str:
        """Get a summary list of all resume analyses for the current user.
        Returns each analysis with: candidate name, target role, overall score, recommendation, and date.
        Use this when the user asks about their analyses, candidates, or overall results.
        """
        async with get_tool_session() as db:
            return await get_all_analyses_json(db, self.user_id)

    @function_tool()
    async def get_analysis_details(self, analysis_id: int) -> str:
        """Get the full detailed analysis for a specific analysis ID.
        Returns complete data including scores, score justifications, skills, experience,
        red flags, key vectors, summary, and recommendation.
        Use this when the user asks for details about a specific candidate or analysis.
        """
        async with get_tool_session() as db:
            return await get_analysis_details_json(db, self.user_id, analysis_id)

    @function_tool()
    async def search_analyses_by_candidate(self, candidate_name: str) -> str:
        """Search analyses by candidate name (partial, case-insensitive match).
        Use this when the user asks about a specific person by name.
        """
        async with get_tool_session() as db:
            return await search_analyses_by_candidate_json(db, self.user_id, candidate_name)

    @function_tool()
    async def get_top_candidates(self, limit: int = 5, job_id: int | None = None) -> str:
        """Get the top candidates ranked by overall score.
        Optionally filter by job_id to see top candidates for a specific job.
        Use this when the user asks about best candidates or rankings.
        """
        async with get_tool_session() as db:
            return await get_top_candidates_json(db, self.user_id, limit, job_id)

    # ── Resume Tools ─────────────────────────────────────────────────────

    @function_tool()
    async def get_all_resumes(self, confirm: bool = True) -> str:
        """Get a list of all uploaded resumes for the current user.
        Returns each resume with: id, url, content preview (first 200 chars), and upload date.
        Use this when the user asks about their uploaded resumes.
        """
        async with get_tool_session() as db:
            return await get_all_resumes_json(db, self.user_id)

    @function_tool()
    async def get_resume_content(self, resume_id: int) -> str:
        """Get the full extracted text content of a specific resume by its ID.
        Use this when the user wants to see the actual content of a resume,
        or when you need the resume text to answer questions about it.
        """
        async with get_tool_session() as db:
            return await get_resume_content_json(db, self.user_id, resume_id)

    # ── Job Tools ────────────────────────────────────────────────────────

    @function_tool()
    async def get_all_jobs(self, confirm: bool = True) -> str:
        """Get a list of all job positions created by the current user.
        Returns each job with: id, title, description preview, and creation date.
        Use this when the user asks about their job listings.
        """
        async with get_tool_session() as db:
            return await get_all_jobs_json(db, self.user_id)

    @function_tool()
    async def get_job_details(self, job_id: int) -> str:
        """Get the full details of a specific job position by its ID.
        Returns the complete job title and description.
        Use this when the user asks about a specific job's requirements.
        """
        async with get_tool_session() as db:
            return await get_job_details_json(db, self.user_id, job_id)

    @function_tool()
    async def get_analyses_for_job(self, job_id: int) -> str:
        """Get all resume analyses linked to a specific job position.
        Returns a summary of each candidate analyzed for this job.
        Use this when the user asks about candidates for a specific role or job.
        """
        async with get_tool_session() as db:
            return await get_analyses_for_job_json(db, self.user_id, job_id)


# ── Entrypoint ───────────────────────────────────────────────────────────────

async def entrypoint(ctx: JobContext):
    await ctx.connect()

    logger.info("Waiting for participant to join room...")

    participant = await ctx.wait_for_participant()

    user_id = None

    if participant.metadata:
        try:
            data = json.loads(participant.metadata)
            user_id = data.get("user_id")
        except json.JSONDecodeError:
            logger.error("Invalid participant metadata JSON")

    if not user_id:
        logger.error("No user_id found in participant metadata")
        return

    logger.info(f"Starting session for user_id: {user_id}")

    session = AgentSession(
        vad=ctx.proc.userdata["vad"],
        stt=deepgram.STT(model="nova-2"),                              
        llm=groq.LLM(model="llama-3.3-70b-versatile"),               
        tts=elevenlabs.TTS(
            voice_id="ODq5zmih8GrVes37Dizd",
            model="eleven_multilingual_v2"
        )
    )

    await session.start(
        room=ctx.room,
        agent=VoiceAssistant(user_id=user_id),
    )

    # Small delay to ensure WebRTC negotiation completes
    await asyncio.sleep(1.0)

    await session.generate_reply(
        instructions="Greet the user and ask how you can help."
    )

if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=prewarm,
        )
    )
