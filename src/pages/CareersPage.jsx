import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import PageLayout from './PageLayout';
import ApplyPopup from '../components/ApplyPopup';
import { useContent } from '../content/ContentContext';

const CareersPage = () => {
  const { eyebrow, title, intro, positions, footerCtaText, footerCtaLabel } =
    useContent('careers');

  return (
    <PageLayout eyebrow={eyebrow} title={title} intro={intro}>
      <section className="section page-section">
        <div className="container">
          <div className="careers-list">
            {positions.map((p, i) => (
              <div className="career-card" key={i}>
                <div className="career-info">
                  <div className="career-icon">
                    <Briefcase size={20} strokeWidth={1.6} />
                  </div>
                  <div className="career-text">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="career-meta">
                      <span>
                        <Clock size={14} /> {p.type}
                      </span>
                      <span>
                        <MapPin size={14} /> {p.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="career-apply">
                  <ApplyPopup position={p.title} triggerLabel="Apply Now" />
                </div>
              </div>
            ))}
          </div>

          <div className="careers-footer-cta">
            <span>{footerCtaText}</span>
            <ApplyPopup triggerLabel={footerCtaLabel} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CareersPage;
