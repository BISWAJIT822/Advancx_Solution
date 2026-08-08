import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import orangeSpectrum from '../assets/orange_3d_spectrum.png';

const Services = () => {
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
    <section id="services" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="services-header reveal">
          <p className="partners-title" style={{ textAlign: 'left', marginBottom: '8px' }}>Our Offerings</p>
          <h2>What we provide</h2>
        </div>

        {/* Services Grid */}
        <div className="services-grid reveal">
          {/* Card 1: Optimizing Business Performance */}
          <div className="card-premium service-card">
            <div className="service-card-info">
              <h3>Optimizing Business Performance</h3>
              <p>
                An intelligent system designed for data-driven teams to measure, manage, and amplify performance across all operations. We build custom dashboards, data warehouses, and custom analytics layers.
              </p>
              <a href="#contact" className="btn-secondary" onClick={handleScrollToContact}>
                Get Started Now
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="service-graphic-wrapper" style={{ marginTop: '24px' }}>
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=60"
                alt="Business performance optimization team"
              />
            </div>
          </div>

          {/* Card 2: AI & Automation Solutions */}
          <div className="card-premium service-card">
            <div className="service-card-info">
              <h3>AI & Automation Solutions</h3>
              <p>
                Harness the power of machine learning, NLP, and agentic workflows to automate routine processes, predict market trends, and deliver hyper-personalized customer experiences.
              </p>
              <a href="#contact" className="btn-secondary" onClick={handleScrollToContact}>
                Get Started Now
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="service-graphic-wrapper" style={{ marginTop: '24px' }}>
              <img
                src={orangeSpectrum}
                className="contain"
                alt="AI soundwave and audio spectrum visual"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
