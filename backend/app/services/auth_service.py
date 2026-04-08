import asyncio
import logging

from fastapi import Depends

logger = logging.getLogger(__name__)
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.core.dependencies import get_db
from app.core.exceptions import (
    ConflictException,
    UnauthorizedException,
)
from app.core.security import get_password_hash, verify_password, create_access_token
from app.models.user import User
from app.schemas.user import (
    UserBaseResponse,
    UserLogin,
    UserLoginResponse,
    UserRegister,
    UserRegisterResponse,
)


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def register(self, register_data: UserRegister) -> UserRegisterResponse:
        
        result = await self.db.execute(
            select(User).where(User.email == register_data.email)
        )
        existing_user = result.scalar_one_or_none()

        if existing_user:
            logger.warning("Registration failed: User with email %s already exists", register_data.email)
            raise ConflictException(message="User with this email already exists")

        hashed_password = await asyncio.to_thread(
            get_password_hash, register_data.password
        )
        user = User(
            full_name=register_data.full_name,
            email=register_data.email,
            password=hashed_password,
        )
        self.db.add(user)
        await self.db.flush()
        logger.info("User registered successfully: %s (id: %d)", user.email, user.id)
        return UserRegisterResponse.model_validate(user)

    async def login(self, credentials: UserLogin) -> UserLoginResponse:
        result = await self.db.execute(
            select(User).where(User.email == credentials.email)
        )
        user = result.scalar_one_or_none()

        if not user:
            logger.warning("Login failed: User not found with email %s", credentials.email)
            raise UnauthorizedException(message="Invalid credentials")

        is_valid = await asyncio.to_thread(
            verify_password, credentials.password, user.password
        )
        if not is_valid:
            logger.warning("Login failed: Invalid password for email %s", credentials.email)
            raise UnauthorizedException(message="Invalid credentials")
        
        logger.info("User logged in successfully: %s (id: %d)", user.email, user.id)
        payload = {
            "user_id": user.id,
            "email": user.email,
        }

        access_token = create_access_token(payload)

        user_data = UserBaseResponse.model_validate(user)

        return UserLoginResponse(
            **user_data.model_dump(),
            access_token=access_token,
        )


def get_auth_service(db: AsyncSession = Depends(get_db)) -> AuthService:
    return AuthService(db)
