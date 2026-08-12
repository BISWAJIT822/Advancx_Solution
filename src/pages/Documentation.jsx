import React from 'react';
import { Rocket, BookOpen, Code2, Boxes, Plug, LifeBuoy, ArrowUpRight } from 'lucide-react';
import PageLayout from './PageLayout';

const docs = [
  { icon: Rocket, title: 'Getting Started', desc: 'Set up your project, configure environments, and ship your first build in minutes.' },
  { icon: BookOpen, title: 'Guides & Tutorials', desc: 'Step-by-step walkthroughs for common workflows, from auth to payments and deployment.' },
  { icon: Code2, title: 'API Reference', desc: 'Complete REST and GraphQL endpoints with request/response examples and error codes.' },
  { icon: Boxes, title: 'SDKs & Libraries', desc: 'Official client libraries for JavaScript, Python, Flutter, and more, with quick installs.' },
  { icon: Plug, title: 'Integrations', desc: 'Connect third-party services, webhooks, and internal tools with ready-made connectors.' },
  { icon: LifeBuoy, title: 'Support & FAQ', desc: 'Troubleshooting tips, best practices, and answers to the questions we hear most.' },
];

const Documentation = () => {
  return (
    <PageLayout
      eyebrow="Resources"
      title="Documentation"
      intro="Everything you need to build, integrate, and scale with Advancx. Browse guides, references, and SDKs to get up and running fast."
    >
      <section className="section page-section">
        <div className="container">
          <div className="page-grid">
            {docs.map(({ icon: Icon, title, desc }) => (
              <a href="#" key={title} className="page-card doc-card">
                <div className="page-card-icon">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="page-card-link">
                  Read more <ArrowUpRight size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Documentation;
