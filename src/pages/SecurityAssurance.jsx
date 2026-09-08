import React from 'react';
import PageLayout from './PageLayout';
import { useContent } from '../content/ContentContext';
import { getIcon } from '../content/icons';

const SecurityAssurance = () => {
  const { eyebrow, title, intro, measures } = useContent('security');

  return (
    <PageLayout eyebrow={eyebrow} title={title} intro={intro}>
      <section className="section page-section">
        <div className="container">
          <div className="page-grid">
            {measures.map((m) => {
              const Icon = getIcon(m.icon);
              return (
                <div key={m.title} className="page-card">
                  <div className="page-card-icon">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SecurityAssurance;
