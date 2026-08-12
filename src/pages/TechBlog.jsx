import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import PageLayout from './PageLayout';

const posts = [
  {
    tag: 'Engineering',
    date: 'Aug 2, 2026',
    title: 'Building Fast, SEO-Friendly Web Apps with React & Vite',
    excerpt: 'How we squeeze sub-second loads out of modern React apps with smart bundling, lazy loading, and edge caching.',
  },
  {
    tag: 'Mobile',
    date: 'Jul 21, 2026',
    title: 'Flutter vs React Native in 2026: Choosing the Right Tool',
    excerpt: 'A practical comparison from real client projects, covering performance, cost, and time-to-market.',
  },
  {
    tag: 'AI',
    date: 'Jul 9, 2026',
    title: 'Shipping Reliable AI Features Without the Hype',
    excerpt: 'Our playbook for adding LLM-powered features that are safe, testable, and genuinely useful.',
  },
  {
    tag: 'E-Commerce',
    date: 'Jun 28, 2026',
    title: 'Designing Checkout Flows That Actually Convert',
    excerpt: 'Small UX decisions that made a measurable difference to conversion for our commerce clients.',
  },
  {
    tag: 'DevOps',
    date: 'Jun 15, 2026',
    title: 'Zero-Downtime Deployments on a Budget',
    excerpt: 'A lightweight CI/CD setup that ships confidently without an enterprise-sized bill.',
  },
  {
    tag: 'Security',
    date: 'Jun 1, 2026',
    title: 'A Practical Guide to Zero-Trust for Small Teams',
    excerpt: 'You don’t need a security team to get the fundamentals right. Here’s where to start.',
  },
];

const TechBlog = () => {
  return (
    <PageLayout
      eyebrow="Resources"
      title="Tech Blog"
      intro="Notes from the Advancx team on building modern software, mobile apps, and AI, straight from real client work."
    >
      <section className="section page-section">
        <div className="container">
          <div className="page-grid blog-grid">
            {posts.map((p) => (
              <a href="#" key={p.title} className="page-card blog-card">
                <div className="blog-meta">
                  <span className="blog-tag">{p.tag}</span>
                  <span className="blog-date">{p.date}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="page-card-link">
                  Read article <ArrowUpRight size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TechBlog;
