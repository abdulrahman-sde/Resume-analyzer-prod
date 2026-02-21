# Implementation: Full-Stack Integration

This document describes the changes made to wire the Next.js 16 frontend to the FastAPI backend, replacing all mock data with real server-side API calls.

---

## Architecture Overview

```
Browser  →  Next.js Server Components  →  FastAPI Backend  →  PostgreSQL
              (server actions + fetch)      (JWT auth)          (Neon)
```

- **Auth**: Direct backend JWT auth. No third-party auth provider.
- **Data flow**: Server components call the backend directly using the JWT stored in an httpOnly cookie. No client-side fetching for data reads.
- **File uploads**: Handled via server actions that proxy the multipart form to the backend.
- **Route protection**: Next.js proxy (`proxy.ts`) redirects unauthenticated users from `/dashboard/*` to `/signin`.

---

## Files Created

### `lib/api.ts` — Server-Side Fetch Client

Generic `api<T>(path, options)` wrapper that:

- Reads the `session_token` cookie and attaches it as `Authorization: Bearer <token>`.
- Handles JSON and FormData bodies.
- Parses the backend's `{ success, message, data }` envelope, throwing `ApiError` on failure.
- Uses `cache: "no-store"` for fresh data on every request.

### `lib/auth.ts` — Auth Server Actions & Session Helpers

| Function                      | Purpose                                                                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `signIn(prevState, formData)` | Server action for the sign-in form. Calls `POST /api/v1/auth/login`, stores JWT in `session_token` httpOnly cookie and user info in `session_user` cookie, then redirects to `/dashboard`. |
| `signUp(prevState, formData)` | Server action for sign-up. Calls `POST /api/v1/auth/register`, then auto-signs in.                                                                                                         |
| `signOut()`                   | Deletes both cookies and redirects to `/signin`.                                                                                                                                           |
| `getSession()`                | Reads `session_user` cookie and returns the parsed user object (or null).                                                                                                                  |
| `requireSession()`            | Like `getSession()` but redirects to `/signin` if no session exists.                                                                                                                       |

### `lib/data.ts` — Data Fetchers & Transformers

Server-side functions that call the backend and transform snake_case responses to camelCase frontend types.

| Function                | Backend Endpoint               | Returns            |
| ----------------------- | ------------------------------ | ------------------ |
| `fetchJobs()`           | `GET /api/v1/jobs`             | `Job[]`            |
| `fetchJob(jobId)`       | `GET /api/v1/jobs/:id`         | `Job \| null`      |
| `fetchAnalyses(jobId?)` | `GET /api/v1/analyses?job_id=` | `Analysis[]`       |
| `fetchAnalysis(id)`     | `GET /api/v1/analyses/:id`     | `Analysis \| null` |
| `createJob(data)`       | `POST /api/v1/jobs`            | `JobResponse`      |

**Transformers**: `transformJob()`, `transformAnalysis()`, `transformAnalysisResult()` — map backend field names and types (e.g. `int` IDs → `string`, `snake_case` → `camelCase`).

### `lib/actions.ts` — Server Actions for Mutations

| Function                         | Purpose                                                                                                        |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `createJobAction(data)`          | Creates a job via `POST /api/v1/jobs` and revalidates caches.                                                  |
| `createAnalysisAction(formData)` | Sends multipart form (PDF file + job_id) to `POST /api/v1/analyses`. Returns the new analysis ID for redirect. |

### `middleware.ts` — Route Protection Middleware

Next.js 16 proxy that checks for the `session_token` cookie on any `/dashboard/*` route. Redirects to `/signin` if missing.

### `components/skeletons/index.tsx` — Loading Skeletons

Skeleton components used as Suspense fallbacks:

- `StatCardSkeleton` / `JobCardSkeleton` / `AnalysisCardSkeleton` — individual card skeletons
- `DashboardOverviewSkeleton` — full dashboard page skeleton (stats + quick actions + activity)
- `JobsGridSkeleton` — 6-card grid skeleton
- `AnalysesGridSkeleton` — wraps header + 6-card grid
- `AnalysisDetailSkeleton` — two-column report skeleton
- `JobDetailSkeleton` — job header + description + analyses skeleton

### `components/features/analyze/CreateAnalysisForm.tsx` — Client Form Component

Extracted from the page to allow the page to be a server component. Uses React 19's `use()` hook to unwrap a `Promise<Job[]>` passed from the server component parent.

---

## Files Modified

### Auth Pages

| File                         | Change                                                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `app/(auth)/signin/page.tsx` | Replaced mock `localStorage` auth with `useActionState(signIn, null)`. Form uses `action={formAction}` and displays `state?.error`. |
| `app/(auth)/signup/page.tsx` | Same pattern with `signUp` server action. Fields: name, email, password.                                                            |

### Dashboard Pages (Mock → Real Data)

| File                                     | Change                                                                                                                                                                                                                                       |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/dashboard/page.tsx`                 | Async server component. Fetches `fetchJobs()`, `fetchAnalyses()`, and `getSession()` in parallel. Computes stats from real data. Builds recent activity from actual jobs/analyses. Wrapped in `<Suspense>` with `DashboardOverviewSkeleton`. |
| `app/dashboard/jobs/page.tsx`            | Server component with `<Suspense>` boundary. `JobsContent` fetches `fetchJobs()` and renders `JobCard` grid.                                                                                                                                 |
| `app/dashboard/jobs/[jobId]/page.tsx`    | Server component. Fetches `fetchJob(jobId)` + `fetchAnalyses(jobId)` in parallel. `<Suspense>` with `JobDetailSkeleton`.                                                                                                                     |
| `app/dashboard/analysis/page.tsx`        | Server component. Fetches `fetchAnalyses(jobFilter)` + `fetchJobs()` for the filter dropdown. `<Suspense>` with `AnalysesGridSkeleton`.                                                                                                      |
| `app/dashboard/analysis/[id]/page.tsx`   | Server component. Fetches `fetchAnalysis(id)`. `<Suspense>` with `AnalysisDetailSkeleton`.                                                                                                                                                   |
| `app/dashboard/analysis/create/page.tsx` | Now a server component that passes `fetchJobs()` promise to `CreateAnalysisForm` client component.                                                                                                                                           |

### Hooks (Mock → Real API)

| File                         | Change                                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `hooks/useCreateJob.ts`      | Calls `createJobAction()` server action instead of `setTimeout`. Handles errors.                                |
| `hooks/useCreateAnalysis.ts` | Builds `FormData` with file + job_id, calls `createAnalysisAction()`. Redirects to the new analysis on success. |

### Sidebar

| File                               | Change                                                                                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/dashboard/Sidebar.tsx` | Reads user from `session_user` cookie via `document.cookie`. Shows real name + email. Added sign-out button that calls `signOut()` server action. |

### Backend (New Endpoints)

| File                                       | Change                                                                                                               |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `backend/app/services/analysis_service.py` | Added `get_analyses_by_user(user, job_id=None)` and `get_analysis_by_id(analysis_id, user)`.                         |
| `backend/app/api/v1/endpoints/analysis.py` | Added `GET /analyses` (list with optional job filter) and `GET /analyses/:id` (single analysis). Both authenticated. |

---

## How Auth Works

1. **Sign In / Sign Up**: User submits form → React 19 `useActionState` calls the server action → server action POSTs to backend → receives JWT + user data → sets two cookies:
   - `session_token` (httpOnly, 7 days) — the JWT for API calls
   - `session_user` (non-httpOnly, 7 days) — JSON with `{ id, email, full_name }` for client display

2. **Route Protection**: `middleware.ts` runs on every `/dashboard/*` request and checks for `session_token`. If missing, redirects to `/signin`.

3. **API Calls**: `lib/api.ts` reads `session_token` from cookies and sends it as `Authorization: Bearer` header.

4. **Sign Out**: Deletes both cookies and redirects to `/signin`.

---

## Data Flow: Snake Case → Camel Case

The backend returns Python-style `snake_case` fields. The frontend expects TypeScript-style `camelCase`. Transformers in `lib/data.ts` handle this:

```
Backend: { candidate_name, overall_score, created_at, job_id }
   ↓ transformAnalysis()
Frontend: { candidateName, score, date, jobId }
```

Backend IDs are integers; frontend types use strings. Transformers call `String(id)`.

---

## Suspense Boundaries & Skeletons

Every dashboard page uses the pattern:

```tsx
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <AsyncContent />
    </Suspense>
  );
}

async function AsyncContent() {
  const data = await fetchData(); // server-side
  return <UI data={data} />;
}
```

This gives instant page navigation with skeleton loading states while data streams in.

---

## Environment Variables

| Variable      | Required | Default                 | Description          |
| ------------- | -------- | ----------------------- | -------------------- |
| `BACKEND_URL` | Yes      | `http://localhost:8000` | Backend API base URL |
