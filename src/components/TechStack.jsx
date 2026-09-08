import React from 'react';
import { useContent } from '../content/ContentContext';
import { getIcon } from '../content/icons';

const TechStack = () => {
  const { title, items } = useContent('tech');

  // Duplicate for a seamless horizontal loop
  const marqueeTechs = [...items, ...items];

  return (
    <section className="partners-section tech-section">
      <div className="container">
        <p className="partners-title">{title}</p>
        <div className="partners-scroll-wrapper tech-scroll">
          <div className="partners-flex">
            {marqueeTechs.map((tech, idx) => {
              const Icon = getIcon(tech.icon);
              return (
                <div key={idx} className="partner-logo">
                  <Icon size={18} />
                  <span>{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
