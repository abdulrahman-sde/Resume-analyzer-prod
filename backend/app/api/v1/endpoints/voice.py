import json
import uuid
from fastapi import APIRouter, Depends
from livekit.api import AccessToken, VideoGrants

from app.core.config import settings
from app.core.dependencies import TokenUser, get_current_user

router = APIRouter()


@router.get("/token")
async def get_voice_token(
    user: TokenUser = Depends(get_current_user),
):
    """Generate a LiveKit access token for the authenticated user to join a voice room."""

    if not settings.LIVEKIT_API_KEY or not settings.LIVEKIT_API_SECRET or not settings.LIVEKIT_URL:
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail="LiveKit cloud credentials are not configured on the server.")

    room_name = f"voice-{user.id}-{uuid.uuid4().hex[:8]}"

    token = (
        AccessToken(settings.LIVEKIT_API_KEY, settings.LIVEKIT_API_SECRET)
        .with_identity(user.email)
        .with_metadata(json.dumps({"user_id": user.id}))
        .with_grants(
            VideoGrants(
                room_join=True,
                room=room_name,
            )
        )
    )

    return {
        "token": token.to_jwt(),
        "url": settings.LIVEKIT_URL,
    }
