import React from 'react';
import { useContent } from '../content/ContentContext';

const ProcessSection = () => {
  const { eyebrow, heading, intro, steps } = useContent('process');

  return (
    <section className="section process-section">
      <div className="container">
        <div className="process-header reveal">
          <span className="process-eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>

        <div className="process-steps reveal">
          {steps.map((s) => (
            <div key={s.n} className={`process-step ${s.active ? 'active' : ''}`}>
              <span className="step-number">{s.n}</span>
              <h4 className="step-title">{s.title}</h4>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
