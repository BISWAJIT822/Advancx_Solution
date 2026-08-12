import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageLayout from './PageLayout';
import { docs } from '../data/docsData';

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
            {docs.map(({ icon: Icon, title, desc, slug }) => (
              <Link to={`/documentation/${slug}`} key={slug} className="page-card doc-card">
                <div className="page-card-icon">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="page-card-link">
                  Read more <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Documentation;
