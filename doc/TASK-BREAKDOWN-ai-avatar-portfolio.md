# Task Breakdown: AI Avatar Portfolio

Date: 2026-08-16

Related ADR: [ADR-001: AI Avatar Portfolio Restructure](./ADR-001-ai-avatar-portfolio-restructure.md)

## Goal

Build a portfolio application inspired by `ai.clarelantoine.com`, but tailored for Adeyemi Samuel with a custom WEBGLB avatar, AI text chat, realtime voice, recruiter-readable sections, project test links, CRM lead capture, calendar booking, and analytics.

## Feature Inventory

### Core Portfolio

- Hero/AI console first viewport.
- About section.
- Experience timeline.
- Projects section.
- Tech stack section.
- Services section.
- Contact section.
- Footer.
- SEO metadata.
- Open Graph share image.
- Sitemap and robots.

### AI Console

- Quick-prompt chips.
- Text chat input.
- Streaming assistant responses.
- Chat transcript display.
- Suggested project links/buttons inside AI answers.
- Error, loading, retry, and offline states.
- Samuel-first persona with portfolio-guide behavior for navigation/actions.

### Voice Engine

- Explicit microphone start button.
- Browser mic permission handling.
- OpenAI Realtime API WebRTC session.
- Live voice conversation.
- Stop/mute controls.
- Listening/thinking/speaking states.
- Text and speech fallback when realtime fails.
- Transcription fallback for recorded audio.
- Usage caps and rate limits.
- Voice privacy note.

### Avatar

- Custom WEBGLB/GLB avatar loaded from `public/avatar/samuel.glb`.
- WebGL scene with idle pose.
- Listening/thinking/speaking animation states.
- Audio-reactive visual motion.
- Avatar shirt/theme customization.
- WebGL fallback visual.
- Mobile-safe rendering.

### Projects

- Project cards with title, summary, stack, image, and actions.
- Live demo button.
- Repository button.
- Test flow button.
- Project detail modal or route.
- AI can recommend relevant project links.
- Metrics displayed only when explicitly approved in content.

### Contact, CRM, Calendar

- Contact form with validation.
- Resend email notification.
- HubSpot contact/lead creation.
- Lead source tracking.
- Calendar booking CTA through Cal.com.
- Optional Google Calendar availability endpoint.
- Success and error states.

### Analytics

- Anonymous page events.
- Section view tracking.
- AI prompt category tracking.
- Voice/text mode usage.
- Project CTA clicks.
- Contact conversion events.
- Error events.
- No raw audio storage.
- Ephemeral chat transcripts by default.

## Delivery Phases

### Phase 0: Project Bootstrap

Tasks:

- Initialize Next.js App Router project with TypeScript.
- Add Tailwind CSS.
- Add ESLint and Prettier.
- Add base `README.md`.
- Add `.env.example`.
- Configure path aliases.
- Create app route structure.
- Create shared UI component folder.

Outputs:

- App runs locally.
- Base page renders.
- Lint command works.
- Environment variables are documented.

Acceptance:

- `npm run dev` starts the app.
- `npm run lint` passes.
- No secret values committed.

### Phase 1: Content Model

Tasks:

- Create `content/profile.ts`.
- Create `content/projects.ts`.
- Create `content/experience.ts`.
- Create `content/stack.ts`.
- Create `content/prompts.ts`.
- Add Zod schemas for all content.
- Add known contact details:
  - Email: `conqueststat@icloud.com`
  - Phone: `+234 806 141 0856`
  - GitHub: `https://github.com/conquestsam`
  - LinkedIn: `https://www.linkedin.com/in/adeniyi-adeyemi-samuel-352569226/`
- Add fields for project `liveUrl`, `repoUrl`, `testUrl`, and approved metrics.
- Add tests that fail when required content is missing.
- Add test that fails when any rendered link includes `undefined`.

Outputs:

- Typed portfolio data source.
- AI-safe public facts.
- Project links ready for UI and AI actions.

Acceptance:

- All portfolio sections can render from local content.
- No indefinite loading placeholders are needed.
- No AI answer can access unapproved metrics.

### Phase 2: Static Portfolio Shell

Tasks:

- Build responsive app layout.
- Build header navigation.
- Build mobile navigation.
- Build section shell.
- Build About section.
- Build Experience timeline.
- Build Projects section.
- Build Tech Stack section.
- Build Services section.
- Build Footer.
- Build Contact section UI without backend submission.
- Add icons through `lucide-react`.
- Add accessible tooltips for icon-only buttons.
- Add SEO metadata.
- Add Open Graph image route.
- Add sitemap and robots.

Outputs:

- Complete recruiter-readable portfolio.
- All sections are crawlable and useful without AI interaction.

Acceptance:

- Home, About, Experience, Projects, Tech Stack, Services, and Contact render real content.
- Navigation scrolls or routes correctly.
- Mobile layout is usable.
- No overlapping text or broken cards.

### Phase 3: AI Text Chat

Tasks:

- Build `ChatPanel`.
- Build `ChatComposer`.
- Build `QuickPrompts`.
- Build chat state store with `zustand`.
- Create `lib/ai/portfolio-context.ts`.
- Create `lib/ai/prompt-builder.ts`.
- Create `lib/ai/safety.ts`.
- Implement `POST /api/chat`.
- Add streaming response support.
- Add rate limiting.
- Add empty/error/retry states.
- Add project action rendering in AI answers.
- Add quick prompts:
  - `What is your background?`
  - `Show me your best projects`
  - `Which technologies do you use?`
  - `Can I test your previous projects?`
  - `How can I hire you?`
  - `Book a call`

Outputs:

- Typed chat experience backed by portfolio content.
- AI can guide users to projects and contact flows.

Acceptance:

- Chat answers use Samuel's approved facts.
- Chat refuses or deflects unknown metrics.
- Chat can surface project buttons.
- Chat does not expose server secrets.

### Phase 4: Avatar Stage

Tasks:

- Add `public/avatar/samuel.glb`.
- Build `AvatarStage`.
- Add React Three Fiber canvas.
- Load WEBGLB/GLB with Drei.
- Add camera, lighting, shadows, and environment.
- Add loading state.
- Add WebGL unsupported fallback.
- Add avatar state machine:
  - `loading`
  - `idle`
  - `listening`
  - `thinking`
  - `speaking`
  - `error`
- Add avatar color/theme controls.
- Add reduced-motion behavior.
- Optimize asset size.

Outputs:

- First viewport has a distinctive interactive avatar.

Acceptance:

- Avatar renders on desktop and mobile.
- Avatar does not block static portfolio content.
- WebGL failure still shows a polished fallback.
- Canvas is nonblank in Playwright screenshot checks.

### Phase 5: Realtime Voice Engine

Tasks:

- Build `VoiceControls`.
- Build `VoiceOrb`.
- Implement microphone permission flow.
- Implement `POST /api/realtime/session`.
- Create ephemeral OpenAI realtime session server-side.
- Create browser `RTCPeerConnection`.
- Attach microphone audio track.
- Open realtime data channel.
- Send portfolio instructions and context.
- Receive audio output.
- Render transcript events.
- Sync avatar state to voice events.
- Add stop and mute controls.
- Add quota and rate-limit checks.
- Add max session duration.
- Add clear voice privacy copy.

Outputs:

- Visitor can speak with the portfolio in realtime.

Acceptance:

- Voice starts only after user clicks mic.
- Browser mic permission is handled gracefully.
- User can stop voice at any time.
- Realtime API key is never sent to the client.
- Voice session fails over to text when unavailable.

### Phase 6: Audio Fallbacks

Tasks:

- Implement `POST /api/speech`.
- Implement `POST /api/transcribe`.
- Add text-to-speech playback.
- Add recorded audio transcription fallback.
- Add UI state for fallback mode.
- Add retry behavior.
- Add response length controls to reduce cost.

Outputs:

- Voice-like experience remains usable if realtime is unavailable.

Acceptance:

- Typed chat can produce spoken audio.
- Recorded audio can be transcribed and answered.
- Errors are visible and actionable.

### Phase 7: Contact, CRM, Calendar

Tasks:

- Implement contact form validation with `react-hook-form` and Zod.
- Implement `POST /api/contact`.
- Send email through Resend.
- Create `lib/crm.ts`.
- Implement HubSpot contact create/update.
- Implement `POST /api/crm/lead`.
- Track lead source:
  - `contact_form`
  - `ai_chat`
  - `project_cta`
  - `calendar_cta`
- Create `lib/calendar.ts`.
- Add Cal.com booking URL.
- Implement `GET /api/calendar/availability`.
- Add calendar CTA after successful contact submission.
- Add AI action for booking a call.

Outputs:

- Contact flow captures leads, not just emails.
- Hiring intent can convert directly to booking.

Acceptance:

- Valid form sends email.
- Valid form creates/updates CRM lead.
- Success state includes booking CTA.
- Calendar credentials remain server-side.
- Anonymous visitors are not sent to CRM unless they submit contact details or explicitly choose a lead action.

### Phase 8: Analytics and Observability

Tasks:

- Add Vercel Analytics.
- Add Vercel Speed Insights.
- Track anonymous events:
  - Page loaded.
  - Section viewed.
  - Prompt clicked.
  - Chat sent.
  - Voice started.
  - Voice stopped.
  - Project link clicked.
  - Contact submitted.
  - Calendar clicked.
  - AI error.
- Add optional Sentry setup.
- Add server-side structured logs for API errors.
- Exclude raw audio and full transcripts from analytics.

Outputs:

- Product and conversion visibility without over-collecting visitor data.

Acceptance:

- Analytics events fire in production.
- No raw audio is stored.
- No full transcript is sent to analytics by default.

### Phase 9: Testing and QA

Tasks:

- Unit test content schemas.
- Unit test prompt builder.
- Unit test safety guardrails.
- Component test chat states.
- Component test contact form states.
- Playwright desktop smoke test.
- Playwright mobile smoke test.
- Playwright section navigation test.
- Playwright project CTA test.
- Playwright no-undefined-link test.
- Accessibility audit with Axe.
- Manual voice test in Chrome.
- Manual voice test in Safari.
- Lighthouse run.

Outputs:

- Confidence before launch.

Acceptance:

- Tests pass.
- Desktop and mobile screenshots are approved.
- Lighthouse targets:
  - Performance: 85+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 95+

### Phase 10: Deployment

Tasks:

- Configure Vercel project.
- Add production environment variables.
- Deploy preview.
- Verify OpenAI routes.
- Verify Resend.
- Verify HubSpot.
- Verify calendar CTA.
- Verify metadata/share image.
- Verify no loading placeholders.
- Promote to production.
- Monitor first production usage.

Outputs:

- Production AI portfolio.

Acceptance:

- Production site is reachable.
- Voice and text chat work within quotas.
- Contact creates email and CRM record.
- Calendar CTA works.
- No server secrets are exposed.

## End-to-End Visitor Workflows

### Workflow 1: Recruiter Scans Portfolio

1. Visitor lands on homepage.
2. Header, hero, and AI console render immediately.
3. Visitor scrolls to Experience.
4. Visitor reviews project cards.
5. Visitor opens LinkedIn or submits contact form.
6. System records anonymous section and CTA analytics.

Success:

- Visitor can understand Samuel's experience without chatting.

### Workflow 2: Visitor Uses AI Text Chat

1. Visitor clicks a quick prompt.
2. Chat sends request to `/api/chat`.
3. Server builds answer from approved portfolio context.
4. Response streams into transcript.
5. Relevant project buttons appear when applicable.
6. Visitor clicks a live demo, source, or test link.

Success:

- AI helps navigate the portfolio and exposes useful project proof.

### Workflow 3: Visitor Uses Realtime Voice

1. Visitor clicks mic.
2. App requests microphone permission.
3. Client requests ephemeral realtime session.
4. Browser starts WebRTC session.
5. Visitor asks about Samuel.
6. Assistant answers primarily as Samuel.
7. Avatar moves through listening, thinking, and speaking states.
8. Visitor stops the session.

Success:

- Voice feels live, controlled, and privacy-safe.

### Workflow 4: Realtime Voice Fails

1. Visitor clicks mic.
2. Browser denies mic permission or realtime setup fails.
3. App shows friendly fallback state.
4. Visitor types a question.
5. `/api/chat` responds.
6. Optional `/api/speech` generates audio.

Success:

- Visitor is not blocked by voice failure.

### Workflow 5: Hiring Intent

1. Visitor asks, "Are you available for a project?"
2. AI answers from approved availability content.
3. AI shows contact and booking actions.
4. Visitor submits contact form.
5. `/api/contact` validates and sends email.
6. HubSpot lead is created or updated.
7. Success state shows calendar booking CTA.
8. Calendar click is tracked anonymously.

Success:

- Lead is captured and visitor can book a call.

### Workflow 6: Project Testing

1. Visitor asks to see previous work.
2. AI lists approved projects.
3. Each listed project includes action buttons.
4. Visitor clicks `Test flow`.
5. App opens the configured project test URL.
6. Analytics records project CTA click.

Success:

- Previous work is easy to verify.

## Dependency Order

1. Content model before UI sections.
2. Static portfolio before AI.
3. Text chat before voice.
4. Avatar state machine before voice synchronization.
5. Contact email before CRM/calendar.
6. Analytics after primary workflows exist.
7. Playwright checks after UI stabilizes.

## Environment Variables

Required:

```txt
OPENAI_API_KEY=
RESEND_API_KEY=
HUBSPOT_PRIVATE_APP_TOKEN=
CONTACT_TO_EMAIL=conqueststat@icloud.com
CONTACT_FROM_EMAIL=
CALCOM_BOOKING_URL=
NEXT_PUBLIC_SITE_URL=
```

Optional:

```txt
HUBSPOT_PORTAL_ID=
GOOGLE_CALENDAR_ID=
GOOGLE_CALENDAR_CLIENT_EMAIL=
GOOGLE_CALENDAR_PRIVATE_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
SENTRY_DSN=
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

## Definition of Done

- Portfolio renders complete content on first load.
- AI text chat works with approved portfolio facts.
- Voice works through OpenAI Realtime API.
- Voice fallback works.
- Custom WEBGLB avatar renders.
- Project demo/source/test buttons are visible.
- Contact form sends email.
- Contact form creates/updates CRM lead.
- Calendar booking CTA is available.
- Anonymous analytics are captured.
- No raw audio or full transcript is stored by default.
- No `undefined` URLs or placeholder loading states ship.
- Desktop and mobile QA pass.
