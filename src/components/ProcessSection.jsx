import React from 'react';

const steps = [
  {
    n: '01',
    title: 'Strategic Planning',
    desc: 'We map goals, scope, and architecture, turning your idea into a clear, actionable project roadmap.',
  },
  {
    n: '02',
    title: 'UI/UX Design',
    desc: 'Wireframes and polished, user-first interfaces designed to convert and delight across every device.',
  },
  {
    n: '03',
    title: 'Development',
    desc: 'Our team use the right framework, features, tools, and technology based on your needs.',
    active: true,
  },
  {
    n: '04',
    title: 'Testing & QA',
    desc: 'Rigorous manual and automated testing to ship secure, fast, and bug-free releases.',
  },
  {
    n: '05',
    title: 'Launch & Support',
    desc: 'Smooth deployment plus ongoing monitoring, updates, and support to keep you scaling.',
  },
];

const ProcessSection = () => {
  return (
    <section className="section process-section">
      <div className="container">
        <div className="process-header reveal">
          <span className="process-eyebrow">Smart Digital Services for Modern Businesses</span>
          <h2>Expert-Driven Product Development Process</h2>
          <p>
            Specializing in custom web, mobile apps, software and AI solutions, we follow a proven
            product development process to build powerful, feature-packed, secure applications for
            businesses worldwide. Here&apos;s how a project runs:
          </p>
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
