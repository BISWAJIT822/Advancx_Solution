import React from 'react';
import { Target, Zap, TrendingUp, Cpu, Award, Globe, Shield, Layers } from 'lucide-react';

const Stats = () => {
  const logos = [
    { name: 'Logoipsum', icon: <Cpu size={18} /> },
    { name: 'University', icon: <Award size={18} /> },
    { name: 'Network', icon: <Globe size={18} /> },
    { name: 'Solution', icon: <Target size={18} /> },
    { name: 'Global', icon: <Zap size={18} /> },
    { name: 'TechScale', icon: <TrendingUp size={18} /> },
    { name: 'CloudMatrix', icon: <Layers size={18} /> },
    { name: 'CyberShield', icon: <Shield size={18} /> },
  ];

  // Duplicate logos array for seamless horizontal loop
  const marqueeLogos = [...logos, ...logos];

  return (
    <section id="about" className="partners-section">
      <div className="container">
        {/* Partner Logos */}
        <p className="partners-title">Trusted by Leading Organizations</p>
        <div className="partners-scroll-wrapper" style={{ marginBottom: '40px' }}>
          <div className="partners-flex">
            {marqueeLogos.map((logo, idx) => (
              <div key={idx} className="partner-logo">
                {logo.icon}
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid reveal">
          <div className="stats-intro">
            <h2>Transforming Ideas Into Impact</h2>
            <p>
              We design, build, and deploy systems that optimize workflows, scale seamlessly, and generate tangible efficiency gains for your business.
            </p>
          </div>
          
          <div className="stat-item">
            <h3>500+</h3>
            <h4>Successful projects</h4>
            <p>Delivered on schedule with robust SLA compliance.</p>
          </div>
          
          <div className="stat-item">
            <h3>60%</h3>
            <h4>Faster launch time</h4>
            <p>Accelerating time-to-market using modular micro-services.</p>
          </div>
          
          <div className="stat-item">
            <h3>120%</h3>
            <h4>Average ROI increase</h4>
            <p>Proven cloud cost optimization and workflow automation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
