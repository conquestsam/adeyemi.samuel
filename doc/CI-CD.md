# CI/CD Pipeline

## Frontend

The frontend is deployed through `.github/workflows/deploy-frontend.yml`.

Required GitHub secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`

The workflow installs dependencies, pulls Vercel production settings, builds the frontend, and deploys the prebuilt production output.

## Backend

The backend is built through `.github/workflows/deploy-backend.yml`.

For Render, use `render.yaml` or configure the service manually:

- Runtime: `Node`
- Build command: `npm ci && npm run build:api`
- Start command: `npm run start:api`
- Health check path: `/portfolio`
- Node version: `20.18.1`

Required GitHub secret:

- `BACKEND_DEPLOY_HOOK_URL`

Use a deploy hook from the backend host, such as Render, Railway, Fly.io, or another container host. The repository also includes `Dockerfile.api` for a NestJS API container.

Runtime backend environment variables:

- `PORT`
- `HOST`
- `WEB_ORIGIN`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- CRM/calendar provider variables as integrations are finalized.

## Quality Gate

`.github/workflows/ci.yml` runs on pull requests and pushes to `main`:

- TypeScript check
- Next lint
- Unit tests
- NestJS API build
- Next.js frontend build

## Resume Asset

The public resume is served from:

- `/resume/adeyemi-samuel-cv.pdf`

The in-app viewer is available at:

- `/resume`
