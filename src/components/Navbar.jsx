import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useContent } from '../content/ContentContext';

const Navbar = () => {
  const nav = useContent('nav');
  const heroCta = useContent('hero').primaryCta;
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  // Stable identity so the scroll listener effect does not re-subscribe each render.
  const navTargets = useMemo(() => nav.links.map((l) => l.target), [nav.links]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);

      // Section highlighters
      const sections = navTargets;
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navTargets]);

  const scrollToSection = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    // On a sub-page, go home first, then scroll to the section
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(targetId), 120);
    } else {
      scrollToSection(targetId);
    }
  };

  return (
    <>
      <header className={`header ${isSticky ? 'header-active' : ''}`}>
        <div className="container">
          <div className="nav-wrapper">
            {/* Reconstructed Logo */}
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
              <Logo height={44} />
            </a>

            {/* Navigation Links */}
            <nav className="nav-links">
              {nav.links.map((link) => (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  className={`nav-link ${isHome && activeSection === link.target ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.target)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <LanguageSwitcher />

              <a
                href="#contact"
                className="btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                {nav.ctaLabel}
                <ArrowRight size={14} />
              </a>

              <button
                className="menu-toggle"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        {nav.links.map((link) => (
          <a
            key={link.target}
            href={`#${link.target}`}
            className={`mobile-nav-link ${isHome && activeSection === link.target ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, link.target)}
          >
            {link.label}
          </a>
        ))}

        <div style={{ marginTop: '24px' }}>
          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            {heroCta}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
