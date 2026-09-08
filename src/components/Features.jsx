import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { useContent } from '../content/ContentContext';
import { getIcon } from '../content/icons';

const Features = () => {
  const features = useContent('features');

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="section features-section" style={{ background: 'var(--bg-section-muted-1, rgba(6, 6, 8, 0.3))' }}>
      <div className="container">
        {/* Section Header */}
        <div className="features-header reveal">
          <span className="features-eyebrow">{features.eyebrow}</span>
          <h2>{features.heading}</h2>
          <p>{features.intro}</p>
        </div>

        {/* Features Content Grid */}
        <div className="features-grid reveal">
          {/* Left Column: Features List */}
          <div className="features-list">
            {features.items.map((item, idx) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={idx} className="feature-card-compact">
                  <div className="feature-icon-wrapper">
                    <Icon size={22} />
                  </div>
                  <div className="feature-info">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: About Us Card */}
          <div className="card-premium featured-large-card">
            <div className="about-logo-wrap">
              <Logo height={58} />
            </div>

            <div className="featured-large-content">
              <span className="features-eyebrow">{features.aboutEyebrow}</span>
              <h3>{features.aboutHeading}</h3>
              {features.aboutParagraphs.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}

              <a href="#contact" className="btn-primary" onClick={handleScrollToContact}>
                {features.aboutCta}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
