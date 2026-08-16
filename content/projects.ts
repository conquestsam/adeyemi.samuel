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
      'The existing portfolio remains Samuel’s personal website and source reference for project, contact, and profile knowledge.',
    problem: 'The AI site needs Samuel’s existing body of work without copying the old layout.',
    solution:
      'Use the existing portfolio as a content and project reference for voice/chat answers and project test links.',
    impact: 'Public quantitative metrics pending approval.',
    image: '/images/projects/ai-avatar-portfolio.svg',
    stack: ['React', 'TypeScript', 'Vercel', 'Portfolio Systems'],
    liveUrl: 'https://adeyemisamuel.vercel.app/',
    repoUrl: 'https://github.com/conquestsam',
    testUrl: 'https://adeyemisamuel.vercel.app/',
    testLabel: 'Open personal website',
    featured: true,
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
    image: '/images/projects/saas-systems.svg',
    stack: ['Native iOS', 'Mobile Apps', 'API Integration', 'Authentication', 'Product UX'],
    liveUrl: 'https://adeyemisamuel.vercel.app/',
    repoUrl: 'https://github.com/conquestsam',
    testUrl: 'https://adeyemisamuel.vercel.app/',
    testLabel: 'View mobile work',
    featured: true,
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
    image: '/images/projects/saas-systems.svg',
    stack: ['Fintech', 'NestJS', 'TypeScript', 'PostgreSQL', 'Secure APIs'],
    liveUrl: 'https://adeyemisamuel.vercel.app/',
    repoUrl: 'https://github.com/conquestsam',
    testUrl: 'https://adeyemisamuel.vercel.app/',
    testLabel: 'View fintech work',
    featured: true,
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
    image: '/images/projects/ai-avatar-portfolio.svg',
    stack: ['Social Apps', 'React', 'Mobile UX', 'APIs', 'Analytics'],
    liveUrl: 'https://adeyemisamuel.vercel.app/',
    repoUrl: 'https://github.com/conquestsam',
    testUrl: 'https://adeyemisamuel.vercel.app/',
    testLabel: 'View social app work',
    featured: true,
    approvedMetrics: []
  },
  {
    slug: 'full-stack-saas',
    title: 'Full-Stack SaaS Systems',
    explanation:
      'A project category for the product systems I build: dashboards, authentication, APIs, subscriptions, admin panels, and operational workflows.',
    purpose:
      'Help teams move from scattered requirements to maintainable products with clear user flows and reliable backend contracts.',
    responsibilities: [
      'Design frontend architecture and reusable UI flows.',
      'Build backend APIs, authentication boundaries, database models, and integrations.',
      'Ship deployment-ready systems with testing, monitoring hooks, and practical documentation.'
    ],
    technicalImplementation:
      'Implemented with typed React/Next.js interfaces, NestJS or Node API services, PostgreSQL-style relational data modeling, REST contracts, and production deployment workflows.',
    summary: 'Reusable architecture for dashboards, authentication, APIs, subscriptions, and admin workflows.',
    problem: 'Product teams need maintainable systems that can grow without expensive rewrites.',
    solution:
      'Use typed frontend patterns, clean API boundaries, role-aware interfaces, and production-focused deployment workflows.',
    impact: 'Public quantitative metrics pending approval.',
    image: '/images/projects/saas-systems.svg',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs'],
    liveUrl: undefined,
    repoUrl: 'https://github.com/conquestsam',
    testUrl: undefined,
    testLabel: undefined,
    featured: true,
    approvedMetrics: []
  }
] as const;
