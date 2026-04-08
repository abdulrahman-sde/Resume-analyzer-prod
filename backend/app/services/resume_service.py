from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
import json
import logging
from app.models.resume import Resume

logger = logging.getLogger(__name__)

async def get_all_resumes_json(db: AsyncSession, user_id: int) -> str:
    """Get a list of all uploaded resumes for the current user."""
    result = await db.execute(
        select(Resume)
        .where(Resume.user_id == user_id)
        .order_by(desc(Resume.created_at))
    )
    resumes = result.scalars().all()
    logger.info("AI Agent: Retrieved %d resumes for user_id: %d", len(resumes), user_id)

    if not resumes:
        return "No resumes found. The user hasn't uploaded any resumes yet."

    items = []
    for r in resumes:
        items.append({
            "id": r.id,
            "url": r.url,
            "content_preview": r.content[:200] + "..." if len(r.content) > 200 else r.content,
            "created_at": r.created_at.isoformat(),
        })
    return json.dumps(items, indent=2)

async def get_resume_content_json(db: AsyncSession, user_id: int, resume_id: int) -> str:
    """Get the full extracted text content of a specific resume by its ID."""
    result = await db.execute(
        select(Resume).where(
            Resume.id == resume_id, Resume.user_id == user_id
        )
    )
    resume = result.scalar_one_or_none()

    if not resume:
        logger.warning("AI Agent: Resume with ID %d not found for user_id: %d", resume_id, user_id)
        return f"Resume with ID {resume_id} not found."

    logger.info("AI Agent: Successfully retrieved content for resume id: %d", resume_id)
    return json.dumps({
        "id": resume.id,
        "url": resume.url,
        "content": resume.content,
        "created_at": resume.created_at.isoformat(),
    }, indent=2)
