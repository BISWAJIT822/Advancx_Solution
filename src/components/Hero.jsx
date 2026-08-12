import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import JarvisHUD from './JarvisHUD';

// Ambient AI / telemetry code fragments drifting in the hero background
const codeFragments = [
  '> BOOTING AI KERNEL…',
  'const core = new NeuralCore();',
  'model.predict(x) → 0.986',
  '[OK] synapse link established',
  '0x1F · 0xFF · 0x5F',
  'await core.think();',
  'tensor.shape = [1, 512, 512]',
  '01001101 01001001 01000001',
  'GET /v1/inference · 200 OK',
  'sync 100% · latency 12ms',
  'nodes: 12,458 · load 67.3%',
  'training epoch 42 · loss 0.014',
];

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
    <section id="home" className="section hero-section-wrapper" style={{ paddingTop: '88px', paddingBottom: '30px', position: 'relative' }}>

      {/* Ambient AI / tech background decor */}
      <div className="hero-tech-decor" aria-hidden="true">
        <div className="tech-dot-grid"></div>
        <div className="tech-scan-lines"></div>

        {codeFragments.map((frag, i) => (
          <span key={i} className={`code-frag cf-${i + 1}`}>{frag}</span>
        ))}

        <svg className="circuit-accent ca-tl" viewBox="0 0 140 140" fill="none">
          <path d="M4 44 H34 L50 28 H104 L118 42 V96" stroke="currentColor" strokeWidth="1" />
          <path d="M4 72 H22 L36 86 H92" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <circle cx="4" cy="44" r="2.5" fill="currentColor" />
          <circle cx="104" cy="28" r="2.5" fill="currentColor" />
          <circle cx="118" cy="96" r="2.5" fill="currentColor" />
          <circle cx="92" cy="86" r="2" fill="currentColor" />
        </svg>

        <svg className="circuit-accent ca-br" viewBox="0 0 140 140" fill="none">
          <path d="M136 96 H106 L90 112 H36 L22 98 V44" stroke="currentColor" strokeWidth="1" />
          <path d="M136 68 H118 L104 54 H48" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <circle cx="136" cy="96" r="2.5" fill="currentColor" />
          <circle cx="36" cy="112" r="2.5" fill="currentColor" />
          <circle cx="22" cy="44" r="2.5" fill="currentColor" />
          <circle cx="48" cy="54" r="2" fill="currentColor" />
        </svg>
      </div>

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
