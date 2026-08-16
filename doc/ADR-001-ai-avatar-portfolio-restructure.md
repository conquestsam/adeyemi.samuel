# ADR-001: AI Avatar Portfolio Restructure

Date: 2026-08-16

Status: Proposed

Owner: Adeyemi Samuel

## Context

The current local `/Users/mac/Documents/portfolio` directory is empty except for this documentation work, so this ADR defines the target implementation rather than modifying an existing checked-in app.

The live portfolio at `https://adeyemi-samuel-portfolio.vercel.app/` currently presents a traditional dark React portfolio shell with navigation for Home, About, Experience, Projects, Tech Stack, and Contact. During audit, the rendered app showed several primary sections stuck in loading states:

- `Initializing Portfolio...`
- `Loading about section...`
- `Loading experience...`
- `Loading projects...`
- `Loading tech stack...`

The contact section renders and includes email, phone, location, social links, and a message form. One nav email link resolved to `mailto:undefined`, which should be treated as a production data/configuration bug.

The reference implementation at `https://ai.clarelantoine.com/` is a single-screen, app-like AI portfolio. It uses a dark full-viewport layout, a central avatar/canvas experience, lightweight top navigation, quick-prompt chips, text chat input, and avatar customization controls. Crawlable and rendered evidence indicate a Next.js application using Tailwind-style utility classes, a canvas/WebGL avatar surface, and a chat-first interaction model.

## Decision

Rebuild the portfolio as an AI-assisted, avatar-led portfolio application while preserving standard portfolio discoverability and contact flows.

The target implementation will use:

- Next.js App Router as the main application framework.
- TypeScript for all application and server code.
- Tailwind CSS for styling.
- React Three Fiber and Three.js for the 3D avatar/canvas layer.
- Framer Motion for restrained interface animation.
- OpenAI Realtime API for low-latency voice conversation.
- OpenAI text/audio APIs as fallbacks for non-realtime chat, transcription, and generated speech.
- Vercel for hosting, preview deployments, environment variables, analytics, and edge/serverless APIs.

The final app should not be only a visual clone. It should combine Clarel-style AI interaction with a stronger full portfolio structure: recruiter-readable sections, project evidence, work history, contact conversion, and accessibility.

## Reference Audit

### ai.clarelantoine.com

Observed implementation and UX structure:

- One-page, full-screen dark portfolio experience.
- Header includes name plus external links: Website, GitHub, LinkedIn.
- Center stage is an avatar/canvas area with loading state: `Clarel is getting ready...`.
- Intro copy invites visitors to ask about work, experience, or projects.
- Quick prompts include:
  - `What's your background?`
  - `Tell me about your projects`
  - `What technologies do you work with?`
  - `How can I contact you?`
- Text input placeholder: `Ask me anything...`.
- Send button is icon-only with accessible label.
- Avatar customization affordance exists through a shirt color picker.
- Mobile menu is present.
- Metadata is well-formed for title, description, Open Graph, Twitter card, and share image.
- Technical signals: Next.js static chunks, Tailwind utility classes, canvas/WebGL hints.

Strengths to adopt:

- Immediate differentiation through an AI-first interface.
- Low-friction guided questions.
- Strong first viewport focus.
- Minimal navigation clutter.
- Share metadata and preview image.
- Avatar personalization adds memorability.

Limitations to improve:

- Crawlable portfolio evidence is thin.
- Traditional recruiter scanning is secondary.
- Chat UI should not hide critical credentials, projects, and contact details.
- Voice affordance should be explicit and permission-aware.

### adeyemi-samuel-portfolio.vercel.app

Observed implementation and UX structure:

- Vite/React-style asset bundle: `/assets/index-*.js` and `/assets/index-*.css`.
- Dark themed portfolio with blue accent.
- Navigation sections: Home, About, Experience, Projects, Tech Stack, Contact.
- Contact area renders:
  - Email: `conqueststat@icloud.com`
  - Phone: `+234 806 141 0856`
  - Location: `Brussel`
  - GitHub: `https://github.com/conquestsam`
  - LinkedIn: `https://www.linkedin.com/in/adeniyi-adeyemi-samuel-352569226/`
- Contact form fields: name, email, message.
- SEO metadata exists but is generic.

Issues to address:

- Loading states remain visible for main content.
- `mailto:undefined` appears in nav/social output.
- Main content likely depends on async data that is missing, slow, or misconfigured.
- The app does not currently provide AI chat, voice, or avatar functionality.
- Existing color direction is serviceable but generic; the new experience needs stronger identity.

## Product Goals

The restructured portfolio will answer four visitor intents quickly:

- "Who is Samuel and what does he do?"
- "What has he built?"
- "Can he solve my technical problem?"
- "How do I contact or hire him?"

The AI layer must support those intents without trapping visitors in a chat-only workflow.

## Target User Experience

### First Viewport

The first screen will be an interactive portfolio console:

- Left or bottom info rail with Samuel's name, role, location, availability, and primary CTAs.
- Center full-bleed avatar/canvas stage.
- Right or bottom chat panel depending on viewport.
- Quick prompts for background, projects, stack, availability, and contact.
- Text input for typed questions.
- Voice button for live conversation.
- Compact nav for About, Experience, Projects, Stack, Contact.

The first viewport must include enough visual hint of the next section on mobile and desktop so users know the app continues beyond the AI console.

### Core Sections

1. AI Console
   - Avatar loading, ready, listening, thinking, speaking, idle, and error states.
   - Quick prompts.
   - Chat transcript.
   - Voice session controls.
   - Avatar color/theme controls.
   - Project test links/buttons surfaced when visitors ask about previous work.

2. About
   - Concise profile.
   - Location and remote availability.
   - Core strengths.
   - Current focus.

3. Experience
   - Timeline of roles.
   - Company, period, title, impact bullets.
   - Filter tags for frontend, backend, AI, cloud, leadership.

4. Projects
   - Featured project cards with screenshots or generated project visuals.
   - Problem, solution, stack, impact, links.
   - Project detail modal or route.
   - Each project supports `View live`, `Source`, and optional `Test flow` actions.

5. Tech Stack
   - Grouped by frontend, backend, AI, databases, cloud/devops, testing.
   - Skill confidence and recent usage.
   - Tools should be real and defensible.

6. Services
   - Full-stack web applications.
   - AI-assisted product features.
   - API/backend systems.
   - Portfolio and SaaS engineering.

7. Contact
   - Email, phone, LinkedIn, GitHub.
   - Contact form.
   - CRM lead capture.
   - Calendar booking link/embed.
   - Form success/error states.

8. Footer
   - Copyright.
   - Social links.
   - Privacy note for AI/voice.

## Application Architecture

Recommended directory structure:

```txt
portfolio/
  app/
    api/
      chat/route.ts
      crm/lead/route.ts
      contact/route.ts
      calendar/availability/route.ts
      realtime/session/route.ts
      speech/route.ts
      transcribe/route.ts
    layout.tsx
    page.tsx
    globals.css
    opengraph-image.tsx
    sitemap.ts
    robots.ts
  components/
    ai/
      AvatarStage.tsx
      ChatComposer.tsx
      ChatPanel.tsx
      QuickPrompts.tsx
      VoiceControls.tsx
      VoiceOrb.tsx
    layout/
      Header.tsx
      MobileNav.tsx
      SectionShell.tsx
      Footer.tsx
    portfolio/
      AboutSection.tsx
      ContactSection.tsx
      ExperienceTimeline.tsx
      ProjectCard.tsx
      ProjectsSection.tsx
      ServicesSection.tsx
      TechStackSection.tsx
    ui/
      Button.tsx
      IconButton.tsx
      Tooltip.tsx
      Badge.tsx
      Dialog.tsx
      Toast.tsx
  content/
    profile.ts
    projects.ts
    experience.ts
    stack.ts
    prompts.ts
  lib/
    ai/
      portfolio-context.ts
      prompt-builder.ts
      safety.ts
    analytics.ts
    calendar.ts
    crm.ts
    env.ts
    mailer.ts
    rate-limit.ts
    seo.ts
  public/
    avatar/
      samuel.glb
      animations/
    images/
      projects/
      share.png
  tests/
    e2e/
    unit/
```

## Library Decisions

### Runtime and Framework

- `next`: App Router, server routes, metadata, Open Graph image generation.
- `react` and `react-dom`: UI.
- `typescript`: type safety.

### Styling and UI

- `tailwindcss`: utility styling.
- `postcss` and `autoprefixer`: Tailwind build pipeline.
- `clsx`: conditional class names.
- `tailwind-merge`: class conflict resolution.
- `class-variance-authority`: typed component variants.
- `lucide-react`: icons for nav, send, mic, pause, mail, GitHub, LinkedIn, external links.
- `@radix-ui/react-dialog`: accessible dialogs for project details and privacy notes.
- `@radix-ui/react-tooltip`: accessible icon tooltips.
- `sonner`: toast notifications.

### Motion and 3D

- `framer-motion`: section reveal, chat transitions, panel entrance.
- `three`: WebGL rendering.
- `@react-three/fiber`: React renderer for Three.js.
- `@react-three/drei`: GLTF loading, camera helpers, environment, contact shadows.
- `three-stdlib`: optional loaders/utilities.
- `leva`: development-only tuning controls for avatar/camera/materials.

### Avatar Source

- Use a custom WEBGLB/GLB avatar asset as the primary avatar source.
- Store the optimized asset at `public/avatar/samuel.glb`.
- Keep original source files outside `public/` and commit only optimized runtime assets.
- Optimize with Draco or Meshopt compression when asset size requires it.
- The avatar implementation should support idle, listening, thinking, speaking, and error poses even if lip-sync is added later.

### AI, Voice, and Audio

- `openai`: server SDK for text, speech, transcription, and realtime session creation.
- Browser `RTCPeerConnection`: client WebRTC transport for realtime voice.
- Browser `MediaDevices.getUserMedia`: microphone capture after user permission.
- Browser `AudioContext` and `AnalyserNode`: volume/activity visualization.
- `zustand`: lightweight state for chat, voice state, active section, avatar state.
- `zod`: validate API payloads, content records, contact forms, and env vars.

### Forms, Email, and Validation

- `react-hook-form`: contact form state.
- `@hookform/resolvers`: Zod integration.
- `resend`: transactional contact email.
- Optional `@vercel/kv` or Upstash Redis: rate limiting and abuse protection.

### CRM and Calendar

- `@hubspot/api-client`: CRM lead/contact creation.
- `cal.com` embed or link-based booking: fastest production-ready scheduling path.
- Optional Google Calendar API integration when direct calendar availability is required.
- Contact form submissions create/send:
  - Email notification through Resend.
  - CRM contact/lead record.
  - Optional calendar CTA in the success state.

### Content and Markdown

- Start with typed TS content files in `content/`.
- Add `contentlayer`, `velite`, or MDX only if long-form case studies are needed.

### Quality, Testing, and Tooling

- `eslint`: linting.
- `prettier`: formatting.
- `vitest`: unit tests for prompt builder, content schemas, route helpers.
- `@testing-library/react`: component tests.
- `playwright`: browser smoke tests and responsive checks.
- `axe-core` or `@axe-core/playwright`: accessibility checks.

### Observability

- `@vercel/analytics`: page analytics.
- `@vercel/speed-insights`: performance monitoring.
- Optional `sentry`: production errors when the app becomes more complex.

## Voice Engine

### Primary Mode: Realtime Voice

Use OpenAI Realtime API for live speech-to-speech. The browser never receives the permanent OpenAI API key.

Workflow:

1. User clicks the mic button.
2. UI explains microphone use and requests browser mic permission.
3. Client calls `POST /api/realtime/session`.
4. Server creates a short-lived realtime session/client secret using the OpenAI API key.
5. Client creates `RTCPeerConnection`.
6. Client attaches local microphone stream.
7. Client opens a data channel for session events.
8. Client sends session instructions and portfolio context.
9. Model listens, transcribes, reasons over Samuel's portfolio facts, and responds with audio.
10. Avatar state changes from listening to thinking to speaking.
11. Transcript updates with user and assistant turns.
12. User can mute, stop, or switch back to text.

Realtime session configuration:

- Model: use the currently recommended OpenAI realtime model available to the account.
- Voice: start with a built-in voice such as `marin` or `cedar` for quality.
- Instructions:
  - Speak primarily as Samuel for background, work style, project explanations, and availability.
  - Shift into portfolio-guide mode when helping visitors navigate sections, compare projects, open links, book a call, or submit contact details.
  - Keep answers concise unless asked for detail.
  - Use only approved portfolio context for factual claims.
  - Offer contact options when hiring intent is detected.
  - Never claim availability, rates, or employment history not present in content files.

### Cost and Quota Assumption

OpenAI Realtime and Audio APIs are metered production services, not free unlimited services. The app should assume usage-based billing for text/audio tokens or audio duration depending on model/endpoint. Implementation must include:

- Daily and per-session usage caps.
- IP/session rate limits.
- A visible fallback from voice to text chat.
- Short max response length for voice answers.
- Analytics for aggregate usage volume, without storing raw audio.

### Fallback Mode: Text + TTS

If Realtime API or microphone permission fails:

1. User types a message.
2. Client calls `POST /api/chat`.
3. Server calls OpenAI text model with portfolio context.
4. Text answer streams to UI.
5. If audio is enabled, client calls `POST /api/speech`.
6. Server generates speech audio and streams/returns it.
7. Browser plays generated audio and updates avatar speaking state.

### Transcription Fallback

For browsers where realtime fails but microphone recording works:

1. Record audio as WebM.
2. Send to `POST /api/transcribe`.
3. Server uses OpenAI transcription.
4. Transcribed text continues through `/api/chat`.

### Voice Privacy

The voice UI must include:

- Explicit mic activation by click/tap only.
- Visible listening indicator.
- Stop button always present during an active voice session.
- No background recording.
- Short privacy note: audio is processed to answer portfolio questions and is not used for contact unless the user submits the form.
- Chat transcript content remains ephemeral by default.
- Anonymous analytics may capture event metadata such as prompt category, selected project link, session duration bucket, voice/text mode, errors, and conversion events.

### Avatar Synchronization

Avatar states:

- `loading`: model/assets loading.
- `idle`: ready for text or voice.
- `listening`: mic active and receiving input.
- `thinking`: user turn ended, model preparing response.
- `speaking`: audio output playing.
- `error`: failed model, mic, or network state.

MVP synchronization:

- Use audio analyser amplitude to animate subtle head/shoulder movement or voice orb.
- Use state-based facial/pose changes if the GLB supports morph targets or animations.

Enhanced synchronization:

- Add viseme/lip-sync support only after the base voice engine is reliable.
- Prefer GLB morph target names mapped to phoneme/viseme data if available.

## AI Knowledge Layer

The assistant should answer only from curated local content.

Source files:

- `content/profile.ts`
- `content/projects.ts`
- `content/experience.ts`
- `content/stack.ts`
- `content/prompts.ts`

`portfolio-context.ts` will serialize these into a compact system context.

Example policy:

```txt
You are Adeyemi Samuel's AI portfolio presence.
Primarily answer in Samuel's first person for background, project, skill, and experience questions.
Act as a portfolio guide when helping visitors navigate, open project links, test demos, book a meeting, or submit contact details.
Use only the supplied portfolio facts. If a visitor asks for something not in the facts, say you do not have that detail and offer to connect them with Samuel.
Do not invent employers, project metrics, dates, credentials, rates, or availability.
```

### Public Claims and Metrics Policy

Approved public AI answers must come from `content/` records. Until Samuel supplies exact project metrics, the assistant may discuss:

- Project title, category, summary, stack, live URL, repository URL, and test URL.
- The problem solved and implementation approach.
- Qualitative outcomes that are written in the project record.

The assistant must not invent:

- Revenue, traffic, user count, performance improvement, conversion rate, uptime, funding, client names, employer names, or dates.
- Any metric that is not present in `content/projects.ts` or `content/experience.ts`.

## Data Model

```ts
type Profile = {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone?: string;
  githubUrl: string;
  linkedinUrl: string;
  summary: string;
  availability: string;
};

type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impact?: string;
  image: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  testUrl?: string;
  testLabel?: string;
  featured: boolean;
};

type StackItem = {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'database' | 'cloud' | 'testing' | 'tools';
  level: 'working' | 'strong' | 'expert';
  recentUse: string;
};
```

## API Routes

### `POST /api/chat`

Purpose: text chat with portfolio context.

Input:

```ts
{
  message: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
}
```

Behavior:

- Validate input with Zod.
- Rate-limit by IP/session.
- Build system prompt from curated content.
- Stream answer to the browser.
- Return structured error states.

### `POST /api/realtime/session`

Purpose: create ephemeral realtime credentials/session.

Behavior:

- Validate origin.
- Rate-limit.
- Create realtime session server-side.
- Return short-lived client secret/session payload.
- Never expose permanent `OPENAI_API_KEY`.

### `POST /api/speech`

Purpose: TTS fallback for text answers.

Input:

```ts
{
  text: string;
  voice?: string;
}
```

Behavior:

- Validate max text length.
- Generate speech with OpenAI audio speech API.
- Return audio stream with appropriate content type.

### `POST /api/transcribe`

Purpose: fallback audio transcription.

Input:

- `multipart/form-data` with an audio file.

Behavior:

- Validate file type and size.
- Transcribe with OpenAI audio transcription.
- Return text.

### `POST /api/contact`

Purpose: send contact form message, create CRM lead, and return calendar CTA.

Input:

```ts
{
  name: string;
  email: string;
  message: string;
}
```

Behavior:

- Validate fields.
- Honeypot spam field.
- Rate-limit.
- Send via Resend to Samuel's email.
- Create or update HubSpot contact.
- Create HubSpot note/task with message context and source page.
- Return booking URL for qualified leads.
- Return success or actionable error.

### `POST /api/crm/lead`

Purpose: create CRM lead events from contact form and high-intent AI interactions.

Input:

```ts
{
  name?: string;
  email?: string;
  message?: string;
  source: 'contact_form' | 'ai_chat' | 'project_cta' | 'calendar_cta';
  projectSlug?: string;
}
```

Behavior:

- Validate fields.
- Do not send anonymous chat transcript text to CRM unless visitor submits contact details.
- Create/update HubSpot contact when email is provided.
- Attach source, project interest, and consent-safe metadata.

### `GET /api/calendar/availability`

Purpose: expose calendar availability or booking metadata.

Behavior:

- MVP returns configured Cal.com booking URL and event label.
- Enhanced version reads Google Calendar availability server-side.
- Never expose calendar API credentials to the browser.

## Environment Variables

```txt
OPENAI_API_KEY=
RESEND_API_KEY=
HUBSPOT_PRIVATE_APP_TOKEN=
HUBSPOT_PORTAL_ID=
CONTACT_TO_EMAIL=conqueststat@icloud.com
CONTACT_FROM_EMAIL=
CALCOM_BOOKING_URL=
GOOGLE_CALENDAR_ID=
GOOGLE_CALENDAR_CLIENT_EMAIL=
GOOGLE_CALENDAR_PRIVATE_KEY=
NEXT_PUBLIC_SITE_URL=https://adeyemi-samuel-portfolio.vercel.app
NEXT_PUBLIC_ANALYTICS_ENABLED=true
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Implementation Workflow

1. Bootstrap Next.js app
   - Create Next.js TypeScript project.
   - Install Tailwind, linting, test tooling.
   - Configure absolute imports.

2. Add content model
   - Create typed profile, experience, projects, and stack files.
   - Validate records with Zod.
   - Fix contact constants so no `undefined` mailto can ship.
   - Add live, source, and test links/buttons for previous projects.
   - Mark unapproved project metrics as unavailable until Samuel provides exact public figures.

3. Build static portfolio shell
   - Header and mobile nav.
   - Section layout.
   - About, Experience, Projects, Tech Stack, Services, Contact, Footer.
   - SEO metadata, sitemap, robots, Open Graph image.

4. Build AI console
   - Chat panel.
   - Quick prompts.
   - Text composer.
   - Transcript state.
   - Error and empty states.

5. Build backend AI routes
   - `/api/chat`
   - `/api/realtime/session`
   - `/api/speech`
   - `/api/transcribe`
   - `/api/crm/lead`
   - `/api/calendar/availability`
   - Shared prompt/context builder.
   - Rate limiting.

6. Build voice engine
   - Mic permission UI.
   - Realtime WebRTC client.
   - Transcript events.
   - Audio output.
   - Stop/mute controls.
   - Text/TTS fallback.

7. Build avatar stage
   - Load GLB avatar.
   - Add fallback non-3D visual if WebGL fails.
   - Map avatar state to animations.
   - Add color/theme controls.
   - Optimize GLB with compression where needed.

8. Add polish
   - Framer Motion transitions.
   - Responsive layout.
   - Accessible icon buttons and tooltips.
   - Keyboard navigation.
   - Reduced-motion mode.

9. Test
   - Unit test prompt builder and schema validation.
   - Component test contact form and chat states.
   - Playwright test desktop and mobile first viewport.
   - Playwright test section navigation.
   - Playwright test contact form validation.
   - Manual voice test in Chrome/Safari.

10. Deploy
   - Add Vercel env vars.
   - Deploy preview.
   - Verify live metadata and share image.
   - Verify no loading placeholders remain.
   - Promote to production.

## UI Design Direction

Do:

- Keep the first screen focused on the avatar and conversation.
- Use a restrained dark palette with multiple accents, not only blue.
- Make project proof easy to scan without using nested cards.
- Use icon buttons for mic, send, mute, stop, settings, GitHub, LinkedIn, and external links.
- Add tooltips for icon-only controls.
- Keep text sizes compact inside panels and cards.
- Ensure mobile layout is usable with thumb-friendly controls.

Avoid:

- Hiding all portfolio content behind chat.
- Leaving async content as indefinite loading text.
- Decorative gradients that obscure readability.
- Contact forms without validation and success/error states.
- Voice recording without clear active state and stop control.

## Accessibility Requirements

- All icon-only buttons require `aria-label`.
- Chat transcript uses semantic log region where appropriate.
- Mic status must be visible and programmatically available.
- Keyboard users must be able to navigate all sections, send chat, and stop voice.
- Reduced-motion users should receive static or minimal animation.
- WebGL failure must show a polished fallback.
- Color contrast must meet WCAG AA.

## Security and Abuse Controls

- Keep `OPENAI_API_KEY` server-side only.
- Use ephemeral realtime sessions.
- Rate-limit chat, realtime sessions, transcription, speech, and contact.
- Validate all request bodies with Zod.
- Restrict contact form email injection.
- Do not log raw voice audio.
- Keep chat transcripts ephemeral by default.
- Capture anonymous analytics for product improvement and conversion tracking.
- Send CRM records only when a visitor submits contact details or explicitly chooses a lead/contact action.

## Performance Requirements

- First meaningful portfolio content should render without waiting for AI/avatar.
- Lazy-load avatar and heavy 3D assets.
- Use suspense/fallbacks for 3D only, not for the whole page.
- Compress images and GLB assets.
- Keep initial JS budget reasonable by code-splitting the AI console and 3D layer.
- Prefer static content rendering for portfolio sections.

## Migration Notes From Current Site

- Preserve known contact data:
  - Email: `conqueststat@icloud.com`
  - Phone: `+234 806 141 0856`
  - GitHub: `https://github.com/conquestsam`
  - LinkedIn: `https://www.linkedin.com/in/adeniyi-adeyemi-samuel-352569226/`
- Confirm spelling of location before shipping. The audited live value is `Brussel`; likely intended values may be `Brussels` or `Brussel, Belgium`.
- Replace generic SEO title with Samuel-specific title.
- Replace all indefinite loading placeholders with real content or bounded skeleton states.
- Add a test that fails if rendered anchors contain `undefined`.

## Acceptance Criteria

- The home page renders a complete portfolio without unresolved loading states.
- AI text chat answers questions from curated portfolio content.
- Voice mode starts only after user interaction and mic permission.
- Voice mode can be stopped at any time.
- OpenAI key is never exposed to the client.
- Contact form validates input, sends email, creates/updates CRM lead, and returns calendar booking CTA.
- Project cards and AI responses can show test links/buttons for previous projects.
- Project and experience sections are crawlable without JavaScript-only AI interaction.
- The assistant uses Samuel-first voice for personal/work answers and portfolio-guide voice for navigation/actions.
- Desktop and mobile layouts pass screenshot review.
- Lighthouse targets: Performance 85+, Accessibility 95+, Best Practices 95+, SEO 95+.

## Consequences

Benefits:

- Differentiates the portfolio from a conventional resume site.
- Keeps recruiter-readable content intact.
- Creates a reusable architecture for future AI portfolio features.
- Makes voice a first-class experience without sacrificing privacy.

Tradeoffs:

- More moving parts than a static portfolio.
- 3D and realtime audio increase QA requirements.
- API usage introduces cost and rate-limit needs.
- Avatar assets require optimization and fallback design.

## Open Questions

- Which exact previous projects should be included as approved public project records?
- Which exact metrics are approved for public AI answers?
- Which CRM account and calendar provider credentials will be used for production?

## Resolved Decisions

- Avatar source: custom WEBGLB/GLB avatar.
- Assistant voice: primarily Samuel in first person, with portfolio-guide behavior for navigation and calls to action.
- Transcripts and analytics: transcripts are ephemeral by default; anonymous analytics are captured.
- Project actions: include link/button actions for live demos, repositories, and testing paths on previous projects.
- Contact integrations: email, CRM, and calendar are all phase-one requirements.

## Source References

- Reference portfolio audited: `https://ai.clarelantoine.com/`
- Current portfolio audited: `https://adeyemi-samuel-portfolio.vercel.app/`
- OpenAI Realtime API reference: `https://platform.openai.com/docs/api-reference/realtime`
- OpenAI Audio API reference: `https://platform.openai.com/docs/api-reference/audio`
