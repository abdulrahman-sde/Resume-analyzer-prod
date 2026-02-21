# AI Resume Analyzer

An advanced, AI-powered system designed to analyze resumes against specific job descriptions. Built with a modern tech stack featuring a high-performance Next.js 15 frontend and an AI-driven FastAPI backend using LangChain and LangGraph.

## 🌟 Key Features

- **Automated Resume Parsing & Analysis**: Extract skills, education, experience, and key metrics from resumes using robust AI models.
- **Match Scoring**: Get detailed, AI-generated match scores comparing a candidate's resume with a specified job description.
- **Score Justifications**: Detailed reasoning for match scores based on key factors like education, required skills, and cultural fit.
- **Interactive AI Recruiter Chat**: Converse directly with the AI about specific candidate profiles, ask for summarized strengths/weaknesses, and find specific details instantly.
- **Modern Dashboard**: Visually appealing, responsive data visualizations using Shadcn UI and clean, editorial-style layout.
- **Comprehensive Candidate Profiles**: Visualize candidate skills using spiderweb charts, experience timelines, and detailed matrices.
- **Security & Authorization**: Built-in authentication, PDF encryption handling, and secure database interactions.

## 🛠️ Tech Stack

### Frontend (Next.js)

- **Framework**: Next.js 15 (App Router)
- **UI & Styling**: React 19, Tailwind CSS v4, Lucide Icons, Shadcn UI (`class-variance-authority`, `radix-ui`)
- **Visuals**: Recharts (radar charts, radial charts), custom SVGs.
- **Language**: TypeScript

### Backend (Python/FastAPI)

- **Framework**: FastAPI with standard async endpoints
- **AI/LLM orchestration**: LangChain, LangGraph, OpenAI Models
- **Database**: PostgreSQL with `asyncpg`, SQLAlchemy 2.0 (ORM), Alembic (Migrations)
- **Document Processing**: PyMuPDF (PDF extraction)
- **Media & Storage**: Cloudinary (Image/Asset management)
- **Security**: JWT (`pyjwt`), Argon2 (`pwdlib[argon2]`), Pydantic Settings
- **Package Manager**: `uv`

## 📂 Project Structure

- `/frontend` - The Next.js frontend application.
  - `/app` - Next.js App Router (dashboard, auth, marketing pages)
  - `/components` - Reusable UI components (features, layout, shared widgets)
  - `/hooks` - Custom React hooks for API interaction
  - `/constants` - Shared constant sets like icons and mock configurations
  - `/types` - TypeScript type definitions
- `/backend` - The FastAPI backend application.
  - `/app` - FastAPI core routers, services, schemas, and AI agents
  - `/alembic` - Database migration scripts
  - `/docs` - Backend documentation (if any)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.11+
- PostgreSQL database
- OpenAI API Key
- Cloudinary Account (optional, for specific media)

### Starting the Backend

1. Navigate to the backend directory: `cd backend`
2. Install dependencies via `uv`: `uv sync`
3. Activate the virtual environment: `source .venv/bin/activate` (or equivalent on Windows)
4. Set up environment variables in a `.env` file (Database URL, OpenAI key, etc.)
5. Run migrations: `alembic upgrade head`
6. Start the server: `uvicorn app.main:app --reload`

### Starting the Frontend

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Next.js development server: `npm run dev`
4. Access the web app at `http://localhost:3000`

## 📝 Documentations

To understand the underlying architecture and patterns more deeply, refer to the documentation inside `frontend/docs/`.
