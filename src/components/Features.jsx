import React from 'react';
import { Code2, Smartphone, ShoppingCart, Boxes, ArrowRight } from 'lucide-react';
import Logo from './Logo';

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
      icon: <Code2 size={22} />,
      title: 'Web Development',
      desc: 'Fast, responsive, SEO-friendly websites and web apps built with modern frameworks like React and Next.js for a flawless user experience.',
    },
    {
      icon: <Smartphone size={22} />,
      title: 'Mobile Application',
      desc: 'Innovative cross-platform mobile apps tailored to your business, built with Flutter or React Native for smooth performance on iOS and Android.',
    },
    {
      icon: <ShoppingCart size={22} />,
      title: 'E-Commerce Solutions',
      desc: 'Scalable online stores with secure payments, inventory management, and conversion-focused design that turns visitors into loyal customers.',
    },
    {
      icon: <Boxes size={22} />,
      title: 'Custom Software',
      desc: 'Bespoke software and internal tools engineered around your exact workflows, from process automation to dashboards and API integrations.',
    },
  ];

  return (
    <section className="section features-section" style={{ background: 'var(--bg-section-muted-1, rgba(6, 6, 8, 0.3))' }}>
      <div className="container">
        {/* Section Header */}
        <div className="features-header reveal">
          <span className="features-eyebrow">Why Choose Us</span>
          <h2>Driven by Innovation</h2>
          <p>
            We build practical, high-performance websites, apps, and commerce platforms focused on real outcomes. From strategy and design to deployment and support, we keep it secure, scalable, and ROI-driven.
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

          {/* Right Column: About Us Card */}
          <div className="card-premium featured-large-card">
            <div className="about-logo-wrap">
              <Logo variant="inline" height={58} />
            </div>

            <div className="featured-large-content">
              <span className="features-eyebrow">About Us</span>
              <h3>Who We Are</h3>
              <p>
                Advancx Solution is a software studio building high-performance websites, mobile apps,
                e-commerce platforms, and custom software for businesses worldwide. Driven by innovation,
                we turn ideas into secure, scalable, ROI-driven products &mdash; handling everything from
                strategy and design to deployment and support.
              </p>
              <p>
                Based in Baripada, Odisha, our team blends clean engineering with thoughtful design to
                help startups and enterprises launch faster and scale with confidence. We treat every
                project as a long-term partnership, measuring success by the real results we deliver for
                your business.
              </p>
              <p>
                From the first idea to launch day and beyond, we stay hands-on &mdash; writing
                maintainable code, obsessing over performance and security, and keeping you in the loop
                at every step.
              </p>

              <a href="#contact" className="btn-primary" onClick={handleScrollToContact}>
                Get in Touch
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
