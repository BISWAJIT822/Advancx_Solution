import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);

      // Section highlighters
      const sections = ['home', 'about', 'services', 'contact'];
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
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header className={`header ${isSticky ? 'header-active' : ''}`}>
        <div className="container">
          <div className="nav-wrapper">
            {/* Reconstructed Logo */}
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
              <Logo variant="inline" height={44} />
            </a>

            {/* Navigation Links */}
            <nav className="nav-links">
              <a
                href="#home"
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'home')}
              >
                Home
              </a>
              <a
                href="#about"
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'about')}
              >
                About
              </a>
              <a
                href="#services"
                className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'services')}
              >
                Services
              </a>
              <a
                href="#contact"
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Contact
              </a>
            </nav>

            {/* CTA Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a
                href="#contact"
                className="btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Get in Touch
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

        <a
          href="#home"
          className={`mobile-nav-link ${activeSection === 'home' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'home')}
        >
          Home
        </a>
        <a
          href="#about"
          className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'about')}
        >
          About
        </a>
        <a
          href="#services"
          className={`mobile-nav-link ${activeSection === 'services' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'services')}
        >
          Services
        </a>
        <a
          href="#contact"
          className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'contact')}
        >
          Contact
        </a>

        <div style={{ marginTop: '24px' }}>
          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Get started now
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
