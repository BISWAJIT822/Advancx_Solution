import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import JarvisHUD from './JarvisHUD';

const Hero = () => {
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

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="section hero-section-wrapper" style={{ paddingTop: '150px', paddingBottom: '90px', position: 'relative' }}>

      <div className="container" style={{ position: 'relative', zIndex: '2' }}>
        <div className="hero-grid">
          {/* Hero Left Content */}
          <div className="hero-content reveal active">
            {/* Raw Text Subtitle Badge */}
            <div className="hero-raw-badge">
              // AI ASSISTANT. ANALYTICS. AUTOMATION.
            </div>

            <h1>
              We Create World <br />
              Advancing <span className="text-accent-color">Software</span> <br />
              With Vision and Passion
            </h1>
            
            <p>
              We help build the operating system for data-driven companies to find and pull their performance levers.
            </p>
            
            <div className="hero-actions">
              <a href="#contact" className="btn-primary" onClick={handleScrollToContact}>
                Get started now
                <ArrowRight size={16} style={{ marginLeft: '6px' }} />
              </a>
              <a href="#solutions" className="btn-text-link" onClick={(e) => handleNavClick(e, 'solutions')}>
                Learn more information
                <ArrowUpRight size={16} style={{ marginLeft: '6px' }} />
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                <div className="trust-avatar" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60)' }}></div>
                <div className="trust-avatar" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60)' }}></div>
                <div className="trust-avatar" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&auto=format&fit=crop&q=60)' }}></div>
                <div className="trust-avatar" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60)' }}></div>
              </div>
              <div className="trust-text">
                <strong>Trusted by Industry experts</strong>
                <div className="trust-stars" style={{ color: 'var(--primary-color)' }}>
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  <span style={{ color: 'var(--text-light)', marginLeft: '6px', fontSize: '12px', fontWeight: '600' }}>4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Jarvis HUD Motion System */}
          <div className="hero-visual reveal active" style={{ display: 'block' }}>
            <JarvisHUD />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
