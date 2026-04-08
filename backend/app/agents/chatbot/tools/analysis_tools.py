from typing import Annotated
from langchain_core.tools import tool
from langgraph.prebuilt import InjectedState
from app.core.db import get_tool_session
from app.services.analysis_service import (
    get_all_analyses_json,
    get_analysis_details_json,
    search_analyses_by_candidate_json,
    get_top_candidates_json,
)

@tool
async def get_all_analyses(state: Annotated[dict, InjectedState]) -> str:
    """Get a summary list of all resume analyses for the current user.
    Returns each analysis with: id, candidate name, target role, overall score, recommendation, and date.
    Use this when the user asks about their analyses, candidates, or overall results.
    """
    async with get_tool_session() as db:
        return await get_all_analyses_json(db, state["user_id"])

@tool
async def get_analysis_details(analysis_id: int, state: Annotated[dict, InjectedState]) -> str:
    """Get the full detailed analysis for a specific analysis ID.
    Returns complete data including scores, score justifications, skills, experience,
    red flags, key vectors, summary, and recommendation.
    Use this when the user asks for details about a specific candidate or analysis.
    """
    async with get_tool_session() as db:
        return await get_analysis_details_json(db, state["user_id"], analysis_id)

@tool
async def search_analyses_by_candidate(candidate_name: str, state: Annotated[dict, InjectedState]) -> str:
    """Search analyses by candidate name (partial, case-insensitive match).
    Use this when the user asks about a specific person by name.
    """
    async with get_tool_session() as db:
        return await search_analyses_by_candidate_json(db, state["user_id"], candidate_name)

@tool
async def get_top_candidates(
    state: Annotated[dict, InjectedState],
    limit: int = 5,
    job_id: int | None = None,
) -> str:
    """Get the top candidates ranked by overall score.
    Optionally filter by job_id to see top candidates for a specific job.
    Use this when the user asks about best candidates or rankings.
    """
    async with get_tool_session() as db:
        return await get_top_candidates_json(db, state["user_id"], limit, job_id)
