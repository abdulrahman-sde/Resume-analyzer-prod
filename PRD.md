# AI Resume Analyzer PRD

## Product Summary

AI Resume Analyzer is a recruiter-focused platform that ingests resumes, compares them against job descriptions, and returns structured candidate evaluations. The product combines a FastAPI backend, a Next.js dashboard, and AI-assisted analysis and chat experiences.

## Objectives

- Reduce time spent on first-pass resume screening.
- Provide consistent, explainable match scores and recommendations.
- Let users inspect candidate, job, and resume history from a single dashboard.
- Support natural-language interactions through chat and voice.

## Target Users

- Recruiters screening large applicant pools.
- Hiring managers comparing candidates for a specific role.
- HR teams maintaining a repeatable evaluation workflow.

## Core User Needs

- Upload or manage resumes and job descriptions.
- Generate analysis reports with scoring and justification.
- Compare candidates across jobs and historical analyses.
- Ask follow-up questions through AI chat or voice.

## Functional Requirements

- Authenticate users and scope all data to the signed-in account.
- Store jobs, resumes, conversations, and analyses in PostgreSQL.
- Produce structured analysis output for each resume-job pair.
- Support a chat assistant for retrieval and summarization.
- Support a voice assistant with LiveKit-based streaming interactions.
- Present dashboard views for jobs, analyses, chat history, and voice sessions.

## Non-Goals

- Replacing human hiring judgment.
- Building a full applicant tracking system.
- Exposing other users' data or raw internal IDs in the UI.

## Success Metrics

- Reduced manual screening time per candidate.
- Increased usage of analysis and comparison features.
- High completion rate for generated analyses.
- Low error rate in chat and voice-assisted lookup flows.

## Dependencies

- OpenAI for text generation.
- PostgreSQL for persistence.
- Cloudinary for media/storage support.
- LiveKit, Deepgram, Groq, and ElevenLabs for voice interactions.
