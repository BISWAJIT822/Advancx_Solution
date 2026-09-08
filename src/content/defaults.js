// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for every piece of editable copy on the site.
// The admin panel edits a deep clone of this shape; components read it through
// useContent(). Keep values JSON-serializable — the panel exports this as
// content.json, so no functions, JSX, or component references here.
// ─────────────────────────────────────────────────────────────────────────────
import { posts as defaultPosts } from '../data/blogPosts';
import { docs as defaultDocs } from '../data/docsData';
import { legalPages as defaultLegal } from '../data/legalData';

export const defaultContent = {
  site: {
    brandName: 'Advancx Solution',
    seoTitle: 'Advancx Solution | Advancing Software with Vision & Passion',
    seoDescription:
      'Advancx Solution creates high-end enterprise software, robust mobile applications, seamless device integrations, smart billing architectures, and custom AI platform solutions.',
    seoKeywords:
      'Advancx Solution, software engineering, enterprise applications, mobile development, device integration, billing systems, AI solutions',
    seoAuthor: 'Advancx Solution',
  },

  theme: {
    primaryColor: '#ff5f1f',
  },

  nav: {
    links: [
      { label: 'Home', target: 'home' },
      { label: 'About', target: 'about' },
      { label: 'Services', target: 'services' },
      { label: 'Demos', target: 'demo' },
      { label: 'Contact', target: 'contact' },
    ],
    ctaLabel: 'Get in Touch',
  },

  hero: {
    badge: '// Where Privacy Meets Performance Excellence',
    titleLead: 'We Create World Advancing',
    titleAccent: 'Software',
    titleTail: 'With Vision and Passion',
    subtitle:
      'We build high-performance websites, mobile apps, e-commerce platforms, and custom software that help businesses grow faster.',
    primaryCta: 'Get started now',
    secondaryCta: 'Learn more information',
    trustText: 'Trusted by Industry experts',
    rating: '4.9',
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60',
    ],
    codeFragments: [
      '> BOOTING AI KERNEL…',
      'const core = new NeuralCore();',
      'model.predict(x) → 0.986',
      '[OK] synapse link established',
      '0x1F · 0xFF · 0x5F',
      'await core.think();',
      'tensor.shape = [1, 512, 512]',
      '01001101 01001001 01000001',
      'GET /v1/inference · 200 OK',
      'sync 100% · latency 12ms',
      'nodes: 12,458 · load 67.3%',
      'training epoch 42 · loss 0.014',
    ],
  },

  partners: {
    title: 'Trusted by Leading Organizations',
    logos: [
      { name: 'Logoipsum', icon: 'Cpu' },
      { name: 'University', icon: 'Award' },
      { name: 'Network', icon: 'Globe' },
      { name: 'Solution', icon: 'Target' },
      { name: 'Global', icon: 'Zap' },
      { name: 'TechScale', icon: 'TrendingUp' },
      { name: 'CloudMatrix', icon: 'Layers' },
      { name: 'CyberShield', icon: 'Shield' },
    ],
  },

  stats: {
    heading: 'Transforming Ideas Into Impact',
    intro:
      'We design, build, and deploy systems that optimize workflows, scale seamlessly, and generate tangible efficiency gains for your business.',
    items: [
      {
        value: '500+',
        label: 'Successful projects',
        desc: 'Delivered on schedule with robust SLA compliance.',
      },
      {
        value: '60%',
        label: 'Faster launch time',
        desc: 'Accelerating time-to-market using modular micro-services.',
      },
      {
        value: '120%',
        label: 'Average ROI increase',
        desc: 'Proven cloud cost optimization and workflow automation.',
      },
    ],
  },

  features: {
    eyebrow: 'Why Choose Us',
    heading: 'Driven by Innovation',
    intro:
      'We build practical, high-performance websites, apps, and commerce platforms focused on real outcomes. From strategy and design to deployment and support, we keep it secure, scalable, and ROI-driven.',
    items: [
      {
        icon: 'Code2',
        title: 'Web Development',
        desc: 'Fast, responsive, SEO-friendly websites and web apps built with modern frameworks like React and Next.js for a flawless user experience.',
      },
      {
        icon: 'Smartphone',
        title: 'Mobile Application',
        desc: 'Innovative cross-platform mobile apps tailored to your business, built with Flutter or React Native for smooth performance on iOS and Android.',
      },
      {
        icon: 'ShoppingCart',
        title: 'E-Commerce Solutions',
        desc: 'Scalable online stores with secure payments, inventory management, and conversion-focused design that turns visitors into loyal customers.',
      },
      {
        icon: 'Boxes',
        title: 'Custom Software',
        desc: 'Bespoke software and internal tools engineered around your exact workflows, from process automation to dashboards and API integrations.',
      },
    ],
    aboutEyebrow: 'About Us',
    aboutHeading: 'Who We Are',
    aboutParagraphs: [
      'Advancx Solution is a software studio building high-performance websites, mobile apps, e-commerce platforms, and custom software for businesses worldwide. Driven by innovation, we turn ideas into secure, scalable, ROI-driven products — handling everything from strategy and design to deployment and support.',
      'Based in Baripada, Odisha, our team blends clean engineering with thoughtful design to help startups and enterprises launch faster and scale with confidence. We treat every project as a long-term partnership, measuring success by the real results we deliver.',
    ],
    aboutCta: 'Get in Touch',
  },

  industries: {
    eyebrow: 'Industries We Serve',
    heading: 'Customized Digital Solutions For Every Industry',
    intro:
      'Every industry comes with its own challenges, and businesses need solutions that fit the way they work. Our web, software, mobile and AI expertise helps organizations improve processes, serve customers better, and grow with confidence.',
    items: [
      { icon: 'ShoppingCart', label: 'Ecommerce' },
      { icon: 'Plane', label: 'Travel & Hospitality' },
      { icon: 'HeartPulse', label: 'Healthcare' },
      { icon: 'Building2', label: 'Real Estate & Construction' },
      { icon: 'GraduationCap', label: 'Education' },
      { icon: 'Truck', label: 'Transportation & Logistics' },
      { icon: 'Lightbulb', label: 'Utilities & On Demand' },
      { icon: 'Umbrella', label: 'Finance & Insurance' },
      { icon: 'Clapperboard', label: 'Media & Entertainment' },
      { icon: 'Factory', label: 'Manufacturing' },
    ],
  },

  demo: {
    eyebrow: 'Live Demos',
    heading: 'See Advancx in Action',
    intro:
      "Explore real websites we've designed and built. Use the arrows to browse through our live demos, then request one tailored to your business.",
    primaryCta: 'Request a Demo',
    secondaryCta: 'Open Live Site',
    items: [
      { name: 'College Website', url: 'https://college-website-template-kappa.vercel.app/' },
      { name: 'NGO Website', url: 'https://ngowebsite-azure.vercel.app/' },
      { name: 'Resort Website', url: 'https://resort-website-3yb2.vercel.app/' },
      { name: 'Club Website', url: 'https://clubwebsite-six.vercel.app/' },
      { name: 'Coaching Website', url: 'https://coaching-web-three.vercel.app/' },
    ],
  },

  tech: {
    title: 'Technologies We Use',
    items: [
      { name: 'React', icon: 'Atom' },
      { name: 'TypeScript', icon: 'Braces' },
      { name: 'Node.js', icon: 'Hexagon' },
      { name: 'Python', icon: 'Code2' },
      { name: 'Flutter', icon: 'Smartphone' },
      { name: 'AWS', icon: 'Cloud' },
      { name: 'Docker', icon: 'Container' },
      { name: 'Kubernetes', icon: 'Boxes' },
      { name: 'PostgreSQL', icon: 'Database' },
      { name: 'TensorFlow', icon: 'BrainCircuit' },
      { name: 'GraphQL', icon: 'Share2' },
      { name: 'Redis', icon: 'Server' },
    ],
  },

  process: {
    eyebrow: 'Smart Digital Services for Modern Businesses',
    heading: 'Expert-Driven Product Development Process',
    intro:
      "Specializing in custom web, mobile apps, software and AI solutions, we follow a proven product development process to build powerful, feature-packed, secure applications for businesses worldwide. Here's how a project runs:",
    steps: [
      {
        n: '01',
        title: 'Strategic Planning',
        desc: 'We map goals, scope, and architecture, turning your idea into a clear, actionable project roadmap.',
      },
      {
        n: '02',
        title: 'UI/UX Design',
        desc: 'Wireframes and polished, user-first interfaces designed to convert and delight across every device.',
      },
      {
        n: '03',
        title: 'Development',
        desc: 'Our team use the right framework, features, tools, and technology based on your needs.',
      },
      {
        n: '04',
        title: 'Testing & QA',
        desc: 'Rigorous manual and automated testing to ship secure, fast, and bug-free releases.',
      },
      {
        n: '05',
        title: 'Launch & Support',
        desc: 'Smooth deployment plus ongoing monitoring, updates, and support to keep you scaling.',
      },
    ],
  },

  contact: {
    heading: "Let's Advancx Your Business",
    email: 'advancxsolution@gmail.com',
    phone: '+91 93483 86856',
    phoneHref: '+919348386856',
    address: 'Advancx Solution, Baripada, Odisha 757001, India',
  },

  footer: {
    about:
      'Advancx Solution builds modern, reliable, and high-performance digital infrastructure for data-driven enterprises globally.',
    socials: [
      { type: 'linkedin', url: 'https://www.linkedin.com/company/advancx-solution/' },
      { type: 'github', url: '#' },
      { type: 'fiverr', url: 'https://www.fiverr.com/s/1EAq4x4' },
      { type: 'instagram', url: 'https://www.instagram.com/advancxsolution/' },
    ],
    columns: [
      {
        title: 'Solutions',
        links: [
          { label: 'Mobile Applications', href: 'services', kind: 'section' },
          { label: 'Device Integrations', href: 'services', kind: 'section' },
          { label: 'Billing Systems', href: 'services', kind: 'section' },
          { label: 'Enterprise AI Platforms', href: 'services', kind: 'section' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: 'about', kind: 'section' },
          { label: 'Members', href: '/members', kind: 'route' },
          { label: 'Gallery', href: '/gallery', kind: 'route' },
          { label: 'Careers', href: '/careers', kind: 'route' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '/documentation', kind: 'route' },
          { label: 'System Status', href: '/system-status', kind: 'route' },
          { label: 'Security Assurance', href: '/security-assurance', kind: 'route' },
          { label: 'Tech Blog', href: '/tech-blog', kind: 'route' },
        ],
      },
    ],
    copyright: 'Advancx Solution. All rights reserved.',
    legalLinks: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'SLA Agreement', href: '/sla-agreement' },
    ],
  },

  members: {
    eyebrow: 'Company',
    title: 'Our Members',
    intro:
      'Meet the people who design, build, and ship every Advancx Solution project — in their own words.',
    items: [
      {
        name: 'Biswajit Behera',
        role: 'Founder & CEO',
        image: '/images/ceo-biswajit.png',
        quote:
          'We build software that actually moves the needle for the businesses we work with.',
      },
      {
        name: 'Team Member',
        role: 'Chief Technology Officer',
        image: '',
        quote: 'Great engineering is invisible — it just works, reliably, every single time.',
      },
      {
        name: 'Team Member',
        role: 'Lead Software Engineer',
        image: '',
        quote: 'I love turning messy, complex problems into clean and dependable code.',
      },
      {
        name: 'Team Member',
        role: 'UI / UX Designer',
        image: '',
        quote: "Good design is honest and simple — it gets out of the user's way.",
      },
      {
        name: 'Team Member',
        role: 'Project Manager',
        image: '',
        quote: 'Clear communication is what keeps every project on time and on point.',
      },
      {
        name: 'Team Member',
        role: 'QA Engineer',
        image: '',
        quote: 'Quality is not a final step — it is built into everything we ship.',
      },
    ],
  },

  careers: {
    eyebrow: 'Company',
    title: 'Careers',
    intro:
      "Join a team that builds fast, polished software for data-driven enterprises. We're always looking for sharp, curious people who love shipping great work.",
    positions: [
      {
        title: 'Senior Full-Stack Engineer',
        type: 'Full-time',
        location: 'Remote',
        desc: 'Build and ship end-to-end features across our web and mobile products.',
      },
      {
        title: 'UI / UX Designer',
        type: 'Full-time',
        location: 'Remote / Hybrid',
        desc: 'Design clean, accessible interfaces and design systems for enterprise apps.',
      },
      {
        title: 'Mobile Developer (React Native)',
        type: 'Full-time',
        location: 'Remote',
        desc: 'Own cross-platform mobile apps from prototype to production.',
      },
      {
        title: 'QA Engineer',
        type: 'Contract',
        location: 'Remote',
        desc: 'Design test plans and automation that keep every release rock-solid.',
      },
    ],
    footerCtaText: "Don't see your role? We'd still love to hear from you.",
    footerCtaLabel: 'Send Application',
  },

  gallery: {
    eyebrow: 'Company',
    title: 'Gallery',
    intro:
      'Moments from the Advancx Solution studio — our office, our team, and the events we share along the way.',
    tiles: [
      { label: 'Our Office', image: '' },
      { label: 'Team Offsite', image: '' },
      { label: 'Product Launch', image: '' },
      { label: 'Workshop', image: '' },
      { label: 'Team Lunch', image: '' },
      { label: 'Award Night', image: '' },
      { label: 'Hackathon', image: '' },
      { label: 'Conference', image: '' },
      { label: 'Culture', image: '' },
    ],
  },

  systemStatus: {
    eyebrow: 'Resources',
    title: 'System Status',
    intro:
      "Real-time health of Advancx services. We monitor everything around the clock so you always know what's running smoothly.",
    bannerText: 'All Systems Operational',
    services: [
      { name: 'Web Application', status: 'Operational', uptime: '99.99%' },
      { name: 'API & GraphQL Gateway', status: 'Operational', uptime: '99.98%' },
      { name: 'Authentication', status: 'Operational', uptime: '100%' },
      { name: 'Database Cluster', status: 'Operational', uptime: '99.97%' },
      { name: 'File & Media Storage', status: 'Operational', uptime: '99.99%' },
      { name: 'Payments & Billing', status: 'Operational', uptime: '99.96%' },
      { name: 'Email & Notifications', status: 'Operational', uptime: '99.95%' },
      { name: 'Dashboard & Analytics', status: 'Operational', uptime: '99.98%' },
    ],
  },

  security: {
    eyebrow: 'Resources',
    title: 'Security Assurance',
    intro:
      "Security is built into everything we ship. Here's how we protect your data, your users, and your business at every layer.",
    measures: [
      {
        icon: 'Lock',
        title: 'End-to-End Encryption',
        desc: 'Data is encrypted in transit (TLS 1.3) and at rest (AES-256) across every service.',
      },
      {
        icon: 'KeyRound',
        title: 'Zero-Trust Access',
        desc: 'Least-privilege access, MFA, and short-lived credentials protect every entry point.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Secure Development',
        desc: 'Code review, dependency scanning, and automated security tests on every release.',
      },
      {
        icon: 'ScrollText',
        title: 'Compliance Ready',
        desc: 'Practices aligned with GDPR and industry standards, with audit-friendly logging.',
      },
      {
        icon: 'ServerCog',
        title: 'Hardened Infrastructure',
        desc: 'Isolated environments, automated patching, and continuous vulnerability monitoring.',
      },
      {
        icon: 'Eye',
        title: '24/7 Monitoring',
        desc: 'Real-time threat detection and alerting keep your core data pipeline safe.',
      },
    ],
  },

  docsPage: {
    eyebrow: 'Resources',
    title: 'Documentation',
    intro:
      'Everything you need to build, integrate, and scale with Advancx. Browse guides, references, and SDKs to get up and running fast.',
    items: defaultDocs,
  },

  blogPage: {
    eyebrow: 'Resources',
    title: 'Tech Blog',
    intro:
      'Notes from the Advancx team on building modern software, mobile apps, and AI, straight from real client work.',
    posts: defaultPosts,
  },

  legal: defaultLegal,
};

// Deep clone so callers can never mutate the shared defaults by accident.
export const cloneDefaults = () =>
  typeof structuredClone === 'function'
    ? structuredClone(defaultContent)
    : JSON.parse(JSON.stringify(defaultContent));
