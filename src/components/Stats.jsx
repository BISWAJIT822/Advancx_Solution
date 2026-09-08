import React from 'react';
import { useContent } from '../content/ContentContext';
import { getIcon } from '../content/icons';

const Stats = () => {
  const partners = useContent('partners');
  const stats = useContent('stats');

  // Duplicate logos array for seamless horizontal loop
  const marqueeLogos = [...partners.logos, ...partners.logos];

  return (
    <section id="about" className="partners-section">
      <div className="container">
        {/* Partner Logos */}
        <p className="partners-title">{partners.title}</p>
        <div className="partners-scroll-wrapper" style={{ marginBottom: '80px' }}>
          <div className="partners-flex">
            {marqueeLogos.map((logo, idx) => {
              const Icon = getIcon(logo.icon);
              return (
                <div key={idx} className="partner-logo">
                  <Icon size={18} />
                  <span>{logo.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid reveal">
          <div className="stats-intro">
            <h2>{stats.heading}</h2>
            <p>{stats.intro}</p>
          </div>

          {stats.items.map((item, idx) => (
            <div className="stat-item" key={idx}>
              <h3>{item.value}</h3>
              <h4>{item.label}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
