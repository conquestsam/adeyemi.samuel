export const profile = {
  name: 'Adeyemi Samuel',
  headline: 'Senior Full Stack Developer',
  location: 'Brussels, Belgium',
  email: 'conqueststat@icloud.com',
  phone: '+234 806 141 0856',
  websiteUrl: 'https://adeyemi-samuel-portfolio.vercel.app/',
  githubUrl: 'https://github.com/conquestsam',
  linkedinUrl: 'https://www.linkedin.com/in/adeniyi-adeyemi-samuel-352569226/',
  availability: 'Available for full-stack, AI-assisted product, and SaaS engineering projects.',
  summary:
    'I build reliable web applications across frontend, backend, APIs, databases, and deployment workflows. My focus is practical product engineering: clear interfaces, scalable systems, and thoughtful automation.'
} as const;

export const projects = [
  {
    slug: 'existing-portfolio',
    title: 'Personal Portfolio Reference',
    explanation:
      'This is my existing public portfolio. The AI portfolio uses it as the source reference for my profile, project navigation, and visitor testing paths without copying its layout.',
    purpose:
      'Give visitors a reliable place to inspect my earlier work, profile details, contact routes, and public project links.',
    responsibilities: [
      'Maintain the public portfolio as the personal website reference.',
      'Expose project and contact information clearly enough for AI chat and voice answers.',
      'Keep the AI portfolio visually independent while linking back to verified source pages.'
    ],
    technicalImplementation:
      'Built as a React and TypeScript portfolio deployed on Vercel, then referenced by this AI interface through structured project data and clickable chat actions.',
    summary:
      'The existing portfolio is retained as Samuel’s personal website and source reference for project, contact, and profile knowledge.',
    problem: 'The new AI site needs Samuel’s existing body of work without copying the old visual structure.',
    solution:
      'Use the existing portfolio as a content and project reference for voice/chat answers and project test links.',
    impact: 'Public quantitative metrics pending approval.',
    stack: ['React', 'TypeScript', 'Vercel', 'Portfolio Systems'],
    liveUrl: 'https://adeyemi-samuel-portfolio.vercel.app/',
    repoUrl: 'https://github.com/conquestsam',
    testUrl: 'https://adeyemi-samuel-portfolio.vercel.app/',
    testLabel: 'Open personal website',
    approvedMetrics: []
  },
  {
    slug: 'native-ios-mobile-apps',
    title: 'Native iOS & Mobile App Engineering',
    explanation:
      'A recruiter-facing track for mobile products I can build and support, especially native iOS apps and app-style product experiences.',
    purpose:
      'Help companies ship polished mobile experiences with strong architecture, clear user flows, and reliable API integration.',
    responsibilities: [
      'Build native iOS application screens and interaction flows.',
      'Connect mobile apps to authentication, backend APIs, payment or data services.',
      'Translate product requirements into usable mobile interfaces and maintainable app structure.'
    ],
    technicalImplementation:
      'Native iOS experience paired with TypeScript backend/API delivery, mobile-friendly authentication flows, REST integrations, state management, deployment coordination, and testable product workflows.',
    summary: 'Mobile and native iOS product engineering for app-first workflows.',
    problem: 'Mobile products need fast, reliable interfaces backed by stable APIs and clean release paths.',
    solution:
      'Combine native iOS implementation with backend/API architecture so the app experience and system contracts stay aligned.',
    impact: 'Public quantitative metrics pending approval.',
    stack: ['Native iOS', 'Mobile Apps', 'API Integration', 'Authentication', 'Product UX'],
    liveUrl: 'https://adeyemi-samuel-portfolio.vercel.app/',
    repoUrl: 'https://github.com/conquestsam',
    testUrl: 'https://adeyemi-samuel-portfolio.vercel.app/',
    testLabel: 'View mobile work',
    approvedMetrics: []
  },
  {
    slug: 'fintech-product-systems',
    title: 'Fintech Product Systems',
    explanation:
      'A focused track for fintech-style products where reliability, data accuracy, secure flows, and operational visibility matter.',
    purpose:
      'Support product teams building payment, wallet, transaction, dashboard, onboarding, or financial operations workflows.',
    responsibilities: [
      'Design secure user flows for onboarding, account actions, and operational dashboards.',
      'Build typed APIs and data models for transaction-style workflows.',
      'Integrate third-party services while keeping the product experience clear and auditable.'
    ],
    technicalImplementation:
      'Implemented through TypeScript, NestJS/Node APIs, relational data modeling, role-aware dashboards, validation, external service integrations, and deployment workflows suited for regulated product surfaces.',
    summary: 'Backend-heavy fintech and operational product engineering.',
    problem: 'Financial products need dependable workflows, clear permissions, and trustworthy data handling.',
    solution:
      'Use typed APIs, validation, role boundaries, and observable dashboard flows to reduce ambiguity and risk.',
    impact: 'Public quantitative metrics pending approval.',
    stack: ['Fintech', 'NestJS', 'TypeScript', 'PostgreSQL', 'Secure APIs'],
    liveUrl: 'https://adeyemi-samuel-portfolio.vercel.app/',
    repoUrl: 'https://github.com/conquestsam',
    testUrl: 'https://adeyemi-samuel-portfolio.vercel.app/',
    testLabel: 'View fintech work',
    approvedMetrics: []
  },
  {
    slug: 'social-media-apps',
    title: 'Social Media & Community Apps',
    explanation:
      'A product track for social, creator, community, and content-driven applications.',
    purpose:
      'Build engaging app experiences where profiles, feeds, messaging, content actions, and user growth loops need to feel natural.',
    responsibilities: [
      'Create profile, feed, content, and engagement-oriented interfaces.',
      'Build backend APIs for user-generated content and app interactions.',
      'Connect analytics-ready flows so product teams can understand usage and improve retention.'
    ],
    technicalImplementation:
      'Built with React/Next.js or mobile app interfaces, TypeScript APIs, authentication, media/content data models, responsive UI states, and deployment-ready frontend/backend workflows.',
    summary: 'Social and community app engineering for content-led products.',
    problem: 'Social products need responsive interfaces, dependable identity flows, and fast content interactions.',
    solution:
      'Pair clean frontend UX with backend APIs for profiles, content, engagement, and analytics-ready events.',
    impact: 'Public quantitative metrics pending approval.',
    stack: ['Social Apps', 'React', 'Mobile UX', 'APIs', 'Analytics'],
    liveUrl: 'https://adeyemi-samuel-portfolio.vercel.app/',
    repoUrl: 'https://github.com/conquestsam',
    testUrl: 'https://adeyemi-samuel-portfolio.vercel.app/',
    testLabel: 'View social app work',
    approvedMetrics: []
  },
  {
    slug: 'ai-avatar-portfolio',
    title: 'AI Avatar Portfolio',
    explanation:
      'A Clarel-inspired interactive portfolio that puts an avatar, compact chat, local voice fallback, project links, contact, CRM, and booking workflows in one focused interface.',
    purpose:
      'Let visitors ask about my background and projects naturally, then jump directly into demos, source references, contact, or booking actions.',
    responsibilities: [
      'Build the full-screen avatar interface and compact chat layer.',
      'Implement the NestJS API for portfolio context, AI chat, Realtime voice sessions, speech, contact, CRM, and calendar routing.',
      'Keep project answers grounded in approved public information and avoid invented metrics.'
    ],
    technicalImplementation:
      'Frontend uses Next.js, React, Three.js, React Three Fiber, Drei, Tailwind CSS, and a WebGLB avatar. Backend uses NestJS with OpenAI chat, Realtime session provisioning, audio speech endpoints, CRM, and calendar integration boundaries.',
    summary: 'A Clarel-inspired voice-enabled AI portfolio with custom WEBGLB avatar and NestJS backend.',
    problem: 'Static portfolios do not let visitors naturally ask, test, and verify project work.',
    solution:
      'Use a full-screen avatar/chat interface backed by a NestJS API, OpenAI voice, CRM, and calendar workflows.',
    impact: 'In development. Metrics will be added only after public approval.',
    stack: ['Next.js', 'NestJS', 'OpenAI Realtime API', 'Three.js', 'Tailwind CSS'],
    liveUrl: undefined,
    repoUrl: 'https://github.com/conquestsam',
    testUrl: undefined,
    testLabel: undefined,
    approvedMetrics: []
  }
] as const;

export const experience = [
  {
    company: 'Independent / Client Projects',
    role: 'Full Stack Developer',
    start: '2019',
    end: 'Present',
    location: 'Remote',
    summary:
      'Built and maintained web applications spanning frontend interfaces, backend services, API integrations, deployment, and product iteration.',
    highlights: [
      'Delivered responsive React and TypeScript interfaces.',
      'Integrated APIs, authentication, forms, and operational dashboards.',
      'Improved product workflows through automation and reusable architecture.'
    ],
    tags: ['frontend', 'backend', 'apis', 'cloud', 'product']
  }
] as const;

export const stack = [
  { name: 'React', category: 'frontend', level: 'expert', recentUse: 'Portfolio and SaaS interfaces' },
  { name: 'Native iOS', category: 'mobile', level: 'strong', recentUse: 'Mobile app and app-first product experiences' },
  { name: 'Next.js', category: 'frontend', level: 'strong', recentUse: 'AI portfolio frontend' },
  { name: 'NestJS', category: 'backend', level: 'strong', recentUse: 'AI, voice, CRM, and calendar API backend' },
  { name: 'TypeScript', category: 'frontend', level: 'expert', recentUse: 'Typed frontend and backend contracts' },
  { name: 'Fintech Systems', category: 'product', level: 'strong', recentUse: 'Secure product workflows, dashboards, and API-backed flows' },
  { name: 'Social Apps', category: 'product', level: 'strong', recentUse: 'Profiles, feeds, community flows, and content interactions' },
  { name: 'OpenAI APIs', category: 'ai', level: 'strong', recentUse: 'Chat, audio, and realtime portfolio features' },
  { name: 'Three.js', category: 'frontend', level: 'working', recentUse: 'WEBGLB avatar rendering' },
  { name: 'Vercel', category: 'cloud', level: 'strong', recentUse: 'Frontend deployment' }
] as const;

export const quickPrompts = [
  'What is your background?',
  'Tell me about your projects',
  'What technologies do you work with?',
  'Can I test your previous projects?',
  'How can I contact you?',
  'Book a call'
] as const;
