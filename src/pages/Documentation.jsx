import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageLayout from './PageLayout';
import { useContent } from '../content/ContentContext';
import { getIcon } from '../content/icons';

const Documentation = () => {
  const { eyebrow, title, intro, items: docs } = useContent('docsPage');

  return (
    <PageLayout eyebrow={eyebrow} title={title} intro={intro}>
      <section className="section page-section">
        <div className="container">
          <div className="page-grid">
            {docs.map((d) => {
              const Icon = getIcon(d.icon);
              return (
              <Link to={`/documentation/${d.slug}`} key={d.slug} className="page-card doc-card">
                <div className="page-card-icon">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <span className="page-card-link">
                  Read more <ArrowUpRight size={14} />
                </span>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Documentation;
