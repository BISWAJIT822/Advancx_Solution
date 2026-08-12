// Shared blog data used by the Tech Blog list and the article pages.
export const posts = [
  {
    slug: 'building-fast-seo-friendly-web-apps',
    tag: 'Engineering',
    date: 'Aug 2, 2026',
    readTime: '6 min read',
    title: 'Building Fast, SEO-Friendly Web Apps with React & Vite',
    excerpt:
      'How we squeeze sub-second loads out of modern React apps with smart bundling, lazy loading, and edge caching.',
    content: [
      { type: 'p', text: 'A great web app has to feel instant. For our clients that means fast first paint, snappy interactions, and pages that search engines can actually read. Here is the approach we use to get there with React and Vite.' },
      { type: 'h', text: 'Start with a lean bundle' },
      { type: 'p', text: 'Vite gives us fast dev startup and highly optimized production builds out of the box. We keep the initial bundle small by code-splitting routes, lazy-loading heavy components (like charts and 3D scenes), and deferring anything that is not needed for the first paint.' },
      { type: 'h', text: 'Make it readable for crawlers' },
      { type: 'p', text: 'Meaningful titles, descriptive meta tags, semantic HTML, and pre-rendered or server-rendered content go a long way. Where SEO is critical, we reach for static generation or SSR so the important content is in the HTML from the very first byte.' },
      { type: 'h', text: 'Cache aggressively at the edge' },
      { type: 'p', text: 'Static assets get long-lived, content-hashed cache headers, and we push them to a CDN close to users. The result is repeat visits that load almost instantly and a much lighter load on the origin.' },
      { type: 'p', text: 'Put together, these techniques routinely take a project from a sluggish multi-second load to a crisp sub-second experience, without sacrificing developer speed.' },
    ],
  },
  {
    slug: 'flutter-vs-react-native-2026',
    tag: 'Mobile',
    date: 'Jul 21, 2026',
    readTime: '7 min read',
    title: 'Flutter vs React Native in 2026: Choosing the Right Tool',
    excerpt:
      'A practical comparison from real client projects, covering performance, cost, and time-to-market.',
    content: [
      { type: 'p', text: 'Both Flutter and React Native are excellent choices for cross-platform apps in 2026. The right pick depends less on hype and more on your team, your product, and your timeline.' },
      { type: 'h', text: 'Performance & UI' },
      { type: 'p', text: 'Flutter renders its own pixels, which gives you consistent, highly custom UIs across platforms. React Native maps to native components, so it feels at home on each OS and integrates smoothly with existing native code.' },
      { type: 'h', text: 'Team & ecosystem' },
      { type: 'p', text: 'If your team already lives in JavaScript and React, React Native is a natural extension and shares tooling with the web. Teams starting fresh often love Flutter for its batteries-included widgets and predictable layouts.' },
      { type: 'h', text: 'Our rule of thumb' },
      { type: 'p', text: 'For content and commerce apps that reuse a web codebase, we lean React Native. For pixel-perfect, brand-heavy experiences or when a single design system must look identical everywhere, we lean Flutter. Either way, we prototype early to validate the choice.' },
    ],
  },
  {
    slug: 'shipping-reliable-ai-features',
    tag: 'AI',
    date: 'Jul 9, 2026',
    readTime: '5 min read',
    title: 'Shipping Reliable AI Features Without the Hype',
    excerpt:
      'Our playbook for adding LLM-powered features that are safe, testable, and genuinely useful.',
    content: [
      { type: 'p', text: 'AI features are easy to demo and hard to ship reliably. The gap is all about guardrails, evaluation, and honest scoping. Here is how we keep AI features useful and trustworthy.' },
      { type: 'h', text: 'Scope to a real job' },
      { type: 'p', text: 'We start from a concrete user task, not a technology. Summarize this ticket, draft this reply, extract these fields. Narrow scope makes it far easier to measure quality and control cost.' },
      { type: 'h', text: 'Evaluate like you mean it' },
      { type: 'p', text: 'We build a small evaluation set of real inputs and expected outputs, then track quality on every change. Prompt tweaks and model swaps become measurable instead of vibes-based.' },
      { type: 'h', text: 'Design for failure' },
      { type: 'p', text: 'Models are wrong sometimes. We add validation, fallbacks, and clear ways for users to correct or undo. Done well, an AI feature earns trust because it fails gracefully, not because it is always right.' },
    ],
  },
  {
    slug: 'designing-checkout-flows-that-convert',
    tag: 'E-Commerce',
    date: 'Jun 28, 2026',
    readTime: '5 min read',
    title: 'Designing Checkout Flows That Actually Convert',
    excerpt:
      'Small UX decisions that made a measurable difference to conversion for our commerce clients.',
    content: [
      { type: 'p', text: 'The checkout is where good intentions turn into revenue, or get abandoned. Small, deliberate UX choices consistently move the needle more than a full redesign.' },
      { type: 'h', text: 'Reduce the fields, not the trust' },
      { type: 'p', text: 'Every extra field costs conversions. We ask only for what we truly need, autofill wherever possible, and keep security cues visible so shoppers feel safe handing over payment details.' },
      { type: 'h', text: 'Show progress and cost clearly' },
      { type: 'p', text: 'No surprises. Shipping, taxes, and totals appear early, and a simple step indicator tells shoppers exactly how far they have to go. Predictability keeps people moving forward.' },
      { type: 'h', text: 'Make errors friendly' },
      { type: 'p', text: 'Inline, human-readable validation and a one-tap way to fix mistakes prevent the frustration that sends carts to the graveyard. These details compound into real gains in completed orders.' },
    ],
  },
  {
    slug: 'zero-downtime-deployments-on-a-budget',
    tag: 'DevOps',
    date: 'Jun 15, 2026',
    readTime: '6 min read',
    title: 'Zero-Downtime Deployments on a Budget',
    excerpt:
      'A lightweight CI/CD setup that ships confidently without an enterprise-sized bill.',
    content: [
      { type: 'p', text: 'You do not need a platform team to deploy safely and often. With a few well-chosen tools, small teams can ship multiple times a day with zero downtime.' },
      { type: 'h', text: 'Automate the boring parts' },
      { type: 'p', text: 'Every push runs tests, builds artifacts, and deploys on green. Removing manual steps removes the fear, and fear is what makes teams deploy rarely and riskily.' },
      { type: 'h', text: 'Roll out, do not swap' },
      { type: 'p', text: 'Blue-green or rolling deploys let new versions come up healthy before old ones step down. Users never hit a half-deployed app, and rollbacks are a single click away.' },
      { type: 'h', text: 'Watch what matters' },
      { type: 'p', text: 'A little monitoring and alerting on errors and latency catches problems before customers do. It is inexpensive, and it turns deploys from a gamble into a routine.' },
    ],
  },
  {
    slug: 'practical-zero-trust-for-small-teams',
    tag: 'Security',
    date: 'Jun 1, 2026',
    readTime: '5 min read',
    title: 'A Practical Guide to Zero-Trust for Small Teams',
    excerpt:
      'You don’t need a security team to get the fundamentals right. Here’s where to start.',
    content: [
      { type: 'p', text: 'Zero-trust sounds enterprise, but the core idea is simple: never assume a request is safe just because of where it comes from. Small teams can adopt the essentials without a big budget.' },
      { type: 'h', text: 'Verify every identity' },
      { type: 'p', text: 'Strong authentication and multi-factor everywhere is the highest-leverage move. Short-lived tokens and least-privilege access limit the blast radius if something leaks.' },
      { type: 'h', text: 'Encrypt by default' },
      { type: 'p', text: 'TLS in transit and encryption at rest should be non-negotiable defaults, not features you bolt on later. Most modern platforms make this a checkbox rather than a project.' },
      { type: 'h', text: 'Log and review' },
      { type: 'p', text: 'Audit-friendly logging plus a regular, lightweight review of access and alerts catches drift early. Security is a habit, and small consistent steps beat one heroic effort.' },
    ],
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);
