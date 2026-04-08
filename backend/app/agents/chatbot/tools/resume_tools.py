from typing import Annotated
from langchain_core.tools import tool
from langgraph.prebuilt import InjectedState
from app.core.db import get_tool_session
from app.services.resume_service import (
    get_all_resumes_json,
    get_resume_content_json,
)

@tool
async def get_all_resumes(state: Annotated[dict, InjectedState]) -> str:
    """Get a list of all uploaded resumes for the current user.
    Returns each resume with: id, url, content preview (first 200 chars), and upload date.
    Use this when the user asks about their uploaded resumes.
    """
    async with get_tool_session() as db:
        return await get_all_resumes_json(db, state["user_id"])

@tool
async def get_resume_content(resume_id: int, state: Annotated[dict, InjectedState]) -> str:
    """Get the full extracted text content of a specific resume by its ID.
    Use this when the user wants to see the actual content of a resume,
    or when you need the resume text to answer questions about it.
    """
    async with get_tool_session() as db:
        return await get_resume_content_json(db, state["user_id"], resume_id)
