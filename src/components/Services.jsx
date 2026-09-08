import React from 'react';
import { useContent } from '../content/ContentContext';
import { getIcon } from '../content/icons';

const Services = () => {
  const { eyebrow, heading, intro, items } = useContent('industries');

  return (
    <section id="services" className="industries-section">
      <div className="container">
        <div className="industries-header reveal">
          <span className="industries-eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>

        <div className="industries-grid reveal">
          {items.map(({ icon, label }) => {
            const Icon = getIcon(icon);
            return (
              <div key={label} className="industry-card">
                <Icon className="industry-icon" size={40} strokeWidth={1.2} />
                <span className="industry-label">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
