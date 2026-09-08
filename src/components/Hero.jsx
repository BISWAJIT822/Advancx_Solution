import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import JarvisHUD from './JarvisHUD';
import { useContent } from '../content/ContentContext';

const Hero = () => {
  const hero = useContent('hero');

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
    <section id="home" className="section hero-section-wrapper" style={{ paddingTop: '170px', paddingBottom: '30px', position: 'relative' }}>

      {/* Ambient AI / tech background decor */}
      <div className="hero-tech-decor" aria-hidden="true">
        <div className="tech-dot-grid"></div>
        <div className="tech-scan-lines"></div>

        {hero.codeFragments.map((frag, i) => (
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
              {hero.badge}
            </div>

            <h1>
              {hero.titleLead} <span className="text-accent-color">{hero.titleAccent}</span> {hero.titleTail}
            </h1>

            <p>{hero.subtitle}</p>

            <div className="hero-actions">
              <a href="#contact" className="btn-primary" onClick={(e) => handleNavClick(e, 'contact')}>
                {hero.primaryCta}
                <ArrowRight size={16} style={{ marginLeft: '6px' }} />
              </a>
              <a href="#about" className="btn-text-link" onClick={(e) => handleNavClick(e, 'about')}>
                {hero.secondaryCta}
                <ArrowUpRight size={16} style={{ marginLeft: '6px' }} />
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                {hero.avatars.map((src, i) => (
                  <div key={i} className="trust-avatar" style={{ backgroundImage: `url(${src})` }}></div>
                ))}
              </div>
              <div className="trust-text">
                <strong>{hero.trustText}</strong>
                <div className="trust-stars" style={{ color: 'var(--primary-color)' }}>
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  <span style={{ color: 'var(--text-light)', marginLeft: '6px', fontSize: '12px', fontWeight: '600' }}>{hero.rating}</span>
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
