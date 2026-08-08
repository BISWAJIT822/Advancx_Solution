import React from 'react';
import { Smartphone, Cpu, CreditCard, ArrowRight } from 'lucide-react';
import orangeWave from '../assets/orange_3d_wave.png';

const Features = () => {
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

  const featureItems = [
    {
      icon: <Smartphone size={22} />,
      title: 'Mobile Applications',
      desc: 'Innovative mobile apps carefully tailored to your special business needs, built using Flutter or React Native for cross-platform efficiency.',
    },
    {
      icon: <Cpu size={22} />,
      title: 'Integration With Devices',
      desc: 'Seamless device integration designed to simplify your user experience, including IoT networks and embedded systems controls.',
    },
    {
      icon: <CreditCard size={22} />,
      title: 'Billing Systems',
      desc: 'Smart billing and microtransaction systems built to simplify financial management, recurring subscriptions, and secure payment processing.',
    },
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-section-muted-1, rgba(6, 6, 8, 0.3))' }}>
      <div className="container">
        {/* Section Header */}
        <div className="features-header reveal">
          <h2>Discover All The Powerful Advancx Features</h2>
          <p>
            Unlock powerful features designed to streamline workflows, enhance collaboration, spark innovation, and help your ideas reach the world faster.
          </p>
        </div>

        {/* Features Content Grid */}
        <div className="features-grid reveal">
          {/* Left Column: Features List */}
          <div className="features-list">
            {featureItems.map((item, idx) => (
              <div key={idx} className="feature-card-compact">
                <div className="feature-icon-wrapper">
                  {item.icon}
                </div>
                <div className="feature-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Large Featured Card */}
          <div className="card-premium featured-large-card">
            <div className="featured-graphic">
              <img src={orangeWave} alt="3D abstract orange wavy sculpture" />
            </div>

            <div className="featured-large-content">
              <h3>Where Privacy Meets Performance Excellence</h3>
              <p>
                Designed to provide privacy, reliability, and security for modern businesses everywhere. Our zero-trust frameworks secure your core data pipeline.
              </p>

              <a href="#contact" className="btn-primary" onClick={handleScrollToContact}>
                Get Started
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
