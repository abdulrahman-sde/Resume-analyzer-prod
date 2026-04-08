from typing import Annotated
from langchain_core.tools import tool
from langgraph.prebuilt import InjectedState
from app.core.db import get_tool_session
from app.services.job_service import (
    get_all_jobs_json,
    get_job_details_json,
    get_analyses_for_job_json,
)

@tool
async def get_all_jobs(state: Annotated[dict, InjectedState]) -> str:
    """Get a list of all job positions created by the current user.
    Returns each job with: id, title, description preview, and creation date.
    Use this when the user asks about their job listings.
    """
    async with get_tool_session() as db:
        return await get_all_jobs_json(db, state["user_id"])

@tool
async def get_job_details(job_id: int, state: Annotated[dict, InjectedState]) -> str:
    """Get the full details of a specific job position by its ID.
    Returns the complete job title and description.
    Use this when the user asks about a specific job's requirements.
    """
    async with get_tool_session() as db:
        return await get_job_details_json(db, state["user_id"], job_id)

@tool
async def get_analyses_for_job(job_id: int, state: Annotated[dict, InjectedState]) -> str:
    """Get all resume analyses linked to a specific job position.
    Returns a summary of each candidate analyzed for this job.
    Use this when the user asks about candidates for a specific role or job.
    """
    async with get_tool_session() as db:
        return await get_analyses_for_job_json(db, state["user_id"], job_id)
