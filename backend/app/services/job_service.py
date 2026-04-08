import logging
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)
from app.core.dependencies import get_db
from app.models.job import Job
from app.models.user import User
from app.schemas.job import JobCreate, JobResponse
from sqlalchemy import select


class JobService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_job(self, job_data: JobCreate, user: User) -> JobResponse:
        """Create a new job for the authenticated user."""
        job = Job(
            title=job_data.title,
            description=job_data.description,
            user_id=user.id,
        )
        self.db.add(job)
        await self.db.flush()
        logger.info("Job created: '%s' (id: %d) for user_id: %d", job.title, job.id, user.id)
        return JobResponse.model_validate(job)

    async def get_jobs_by_user(self, user: User) -> list[JobResponse]:
        """Get all jobs for the authenticated user."""
        jobs = await self.db.execute(select(Job).where(Job.user_id == user.id))
        items = jobs.scalars().all()
        logger.info("Retrieved %d jobs for user_id: %d", len(items), user.id)
        return [JobResponse.model_validate(job) for job in items]

    async def get_job_by_id(self, job_id: int, user: User) -> JobResponse:
        """Get a job by ID for the authenticated user."""
        job = await self.db.execute(
            select(Job).where(Job.id == job_id, Job.user_id == user.id)
        )
        job = job.scalar_one_or_none()
        if not job:
            logger.warning("Job with id %d not found for user_id: %d", job_id, user.id)
            from app.core.exceptions import NotFoundException
            raise NotFoundException(message=f"Job with id {job_id} not found")
        
        logger.info("Successfully retrieved job id: %d ('%s') for user_id: %d", job_id, job.title, user.id)
        return JobResponse.model_validate(job)


def get_job_service(db: AsyncSession = Depends(get_db)) -> JobService:
    return JobService(db)

# ── Shared Data Formatting Functions for AI Agents ──────────────────────────

import json
from sqlalchemy import desc
from app.models.analysis import Analysis

async def get_all_jobs_json(db: AsyncSession, user_id: int) -> str:
    """Get a list of all job positions created by the current user."""
    result = await db.execute(
        select(Job)
        .where(Job.user_id == user_id)
        .order_by(desc(Job.created_at))
    )
    jobs = result.scalars().all()

    if not jobs:
        return "No jobs found. The user hasn't created any job positions yet."

    items = []
    for j in jobs:
        items.append({
            "id": j.id,
            "title": j.title,
            "description_preview": j.description[:200] + "..." if len(j.description) > 200 else j.description,
            "created_at": j.created_at.isoformat(),
        })
    return json.dumps(items, indent=2)


async def get_job_details_json(db: AsyncSession, user_id: int, job_id: int) -> str:
    """Get the full details of a specific job position by its ID."""
    result = await db.execute(
        select(Job).where(Job.id == job_id, Job.user_id == user_id)
    )
    job = result.scalar_one_or_none()

    if not job:
        return f"Job with ID {job_id} not found."

    return json.dumps({
        "id": job.id,
        "title": job.title,
        "description": job.description,
        "created_at": job.created_at.isoformat(),
    }, indent=2)


async def get_analyses_for_job_json(db: AsyncSession, user_id: int, job_id: int) -> str:
    """Get all resume analyses linked to a specific job position."""
    job_result = await db.execute(
        select(Job).where(Job.id == job_id, Job.user_id == user_id)
    )
    job = job_result.scalar_one_or_none()

    if not job:
        return f"Job with ID {job_id} not found."

    result = await db.execute(
        select(Analysis)
        .where(Analysis.job_id == job_id, Analysis.user_id == user_id)
        .order_by(desc(Analysis.overall_score))
    )
    analyses = result.scalars().all()

    if not analyses:
        return f"No analyses found for job '{job.title}'."

    items = []
    for a in analyses:
        items.append({
            "id": a.id,
            "candidate_name": a.candidate_name,
            "overall_score": a.overall_score,
            "recommendation": a.recommendation,
            "total_experience_years": a.total_experience_years,
            "created_at": a.created_at.isoformat(),
        })

    return json.dumps({
        "job_title": job.title,
        "total_candidates": len(items),
        "candidates": items,
    }, indent=2)
