import { Rocket, BookOpen, Code2, Boxes, Plug, LifeBuoy } from 'lucide-react';

// Shared documentation data used by the Docs list and detail pages.
export const docs = [
  {
    slug: 'getting-started',
    icon: Rocket,
    title: 'Getting Started',
    desc: 'Set up your project, configure environments, and ship your first build in minutes.',
    content: [
      { type: 'p', text: 'This guide walks you from an empty folder to a running project in a few minutes. If you can run a terminal command, you can follow along.' },
      { type: 'h', text: '1. Install the tooling' },
      { type: 'p', text: 'Make sure you have a recent Node.js LTS installed. Then install dependencies with your package manager of choice (npm, pnpm, or yarn). We keep dependencies lean so installs stay fast.' },
      { type: 'h', text: '2. Configure your environment' },
      { type: 'p', text: 'Copy the example environment file and fill in your keys and endpoints. Never commit secrets, use your host’s environment variables in production.' },
      { type: 'h', text: '3. Run and build' },
      { type: 'p', text: 'Start the dev server for instant hot-reload while you build, then create an optimized production bundle when you are ready to ship. That is it, you now have a running project.' },
    ],
  },
  {
    slug: 'guides-tutorials',
    icon: BookOpen,
    title: 'Guides & Tutorials',
    desc: 'Step-by-step walkthroughs for common workflows, from auth to payments and deployment.',
    content: [
      { type: 'p', text: 'Guides are task-focused walkthroughs that take you end to end on a real feature, with copy-paste examples and sensible defaults.' },
      { type: 'h', text: 'Authentication' },
      { type: 'p', text: 'Add secure sign-in with email, social login, and multi-factor, plus session handling and role-based access done right.' },
      { type: 'h', text: 'Payments & subscriptions' },
      { type: 'p', text: 'Take one-time payments or recurring subscriptions, handle webhooks reliably, and reconcile billing without headaches.' },
      { type: 'h', text: 'Deployment' },
      { type: 'p', text: 'Ship to production with a simple CI/CD pipeline, environment configuration, and zero-downtime releases.' },
    ],
  },
  {
    slug: 'api-reference',
    icon: Code2,
    title: 'API Reference',
    desc: 'Complete REST and GraphQL endpoints with request/response examples and error codes.',
    content: [
      { type: 'p', text: 'The API reference documents every endpoint with request and response examples so you always know what to send and what you will get back.' },
      { type: 'h', text: 'Authentication' },
      { type: 'p', text: 'All requests are authenticated with a bearer token. Tokens are short-lived and scoped to least privilege, so a leaked token has a limited blast radius.' },
      { type: 'h', text: 'REST & GraphQL' },
      { type: 'p', text: 'Use REST for simple, cacheable resources or GraphQL when you need to fetch exactly the fields you want in a single round trip. Both are fully documented.' },
      { type: 'h', text: 'Errors & rate limits' },
      { type: 'p', text: 'Predictable error codes and clear messages make failures easy to handle, and rate-limit headers tell you exactly how much headroom you have.' },
    ],
  },
  {
    slug: 'sdks-libraries',
    icon: Boxes,
    title: 'SDKs & Libraries',
    desc: 'Official client libraries for JavaScript, Python, Flutter, and more, with quick installs.',
    content: [
      { type: 'p', text: 'Our SDKs wrap the API in idiomatic, typed clients so you write less boilerplate and catch mistakes at compile time.' },
      { type: 'h', text: 'Supported languages' },
      { type: 'p', text: 'First-class clients for JavaScript/TypeScript, Python, and Flutter/Dart, with community libraries for more. Each ships with types and inline docs.' },
      { type: 'h', text: 'Install & initialize' },
      { type: 'p', text: 'Add the package with a single command, initialize the client with your API key, and you are ready to make your first call in a couple of lines.' },
      { type: 'h', text: 'Versioning' },
      { type: 'p', text: 'We follow semantic versioning and keep changelogs clear, so upgrades are safe and you always know what changed.' },
    ],
  },
  {
    slug: 'integrations',
    icon: Plug,
    title: 'Integrations',
    desc: 'Connect third-party services, webhooks, and internal tools with ready-made connectors.',
    content: [
      { type: 'p', text: 'Integrations let your product talk to the rest of your stack, from CRMs and analytics to messaging and internal tools.' },
      { type: 'h', text: 'Webhooks' },
      { type: 'p', text: 'Subscribe to events and receive signed, retried webhook deliveries so your systems stay in sync in near real time.' },
      { type: 'h', text: 'Prebuilt connectors' },
      { type: 'p', text: 'Drop-in connectors for popular services get you live in minutes without writing glue code, and they are easy to configure.' },
      { type: 'h', text: 'Custom integrations' },
      { type: 'p', text: 'Need something bespoke? The API and SDKs give you everything to build custom integrations that fit your exact workflow.' },
    ],
  },
  {
    slug: 'support-faq',
    icon: LifeBuoy,
    title: 'Support & FAQ',
    desc: 'Troubleshooting tips, best practices, and answers to the questions we hear most.',
    content: [
      { type: 'p', text: 'Stuck on something? Start here. This section covers the questions and issues that come up most often.' },
      { type: 'h', text: 'Troubleshooting' },
      { type: 'p', text: 'Common setup pitfalls, environment issues, and error messages, with the quickest path to a fix for each.' },
      { type: 'h', text: 'Best practices' },
      { type: 'p', text: 'Recommendations for security, performance, and maintainability that keep your project healthy as it grows.' },
      { type: 'h', text: 'Still need help?' },
      { type: 'p', text: 'If you can’t find an answer here, reach out to our team, we’re happy to help you get unblocked quickly.' },
    ],
  },
];

export const getDoc = (slug) => docs.find((d) => d.slug === slug);
