import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import PageLayout from './PageLayout';
import ContactPopup from '../components/ContactPopup';

// Placeholder openings — edit titles/details or add real positions.
const positions = [
  {
    title: 'Senior Full-Stack Engineer',
    type: 'Full-time',
    location: 'Remote',
    desc: 'Build and ship end-to-end features across our web and mobile products.',
  },
  {
    title: 'UI / UX Designer',
    type: 'Full-time',
    location: 'Remote / Hybrid',
    desc: 'Design clean, accessible interfaces and design systems for enterprise apps.',
  },
  {
    title: 'Mobile Developer (React Native)',
    type: 'Full-time',
    location: 'Remote',
    desc: 'Own cross-platform mobile apps from prototype to production.',
  },
  {
    title: 'QA Engineer',
    type: 'Contract',
    location: 'Remote',
    desc: 'Design test plans and automation that keep every release rock-solid.',
  },
];

const CareersPage = () => (
  <PageLayout
    eyebrow="Company"
    title="Careers"
    intro="Join a team that builds fast, polished software for data-driven enterprises. We're always looking for sharp, curious people who love shipping great work."
  >
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
                <ContactPopup triggerLabel="Apply Now" />
              </div>
            </div>
          ))}
        </div>

        <div className="careers-footer-cta">
          <span>Don&apos;t see your role? We&apos;d still love to hear from you.</span>
          <ContactPopup triggerLabel="Get in Touch" />
        </div>
      </div>
    </section>
  </PageLayout>
);

export default CareersPage;
