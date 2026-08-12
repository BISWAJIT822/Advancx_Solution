import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';


const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSectionNav = (e, targetId) => {
    e.preventDefault();
    const scroll = () => {
      const el = document.getElementById(targetId);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scroll, 120);
    } else {
      scroll();
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <a href="#home" onClick={handleScrollToTop}>
              <Logo variant="stacked" height={60} />
            </a>
            <p>
              Advancx Solution builds modern, reliable, and high-performance digital infrastructure for data-driven enterprises globally.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" /></svg>
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="footer-links-col">
            <h4>Solutions</h4>
            <ul className="footer-links">
              <li><a href="#services" onClick={(e) => handleSectionNav(e, 'services')}>Mobile Applications</a></li>
              <li><a href="#services" onClick={(e) => handleSectionNav(e, 'services')}>Device Integrations</a></li>
              <li><a href="#services" onClick={(e) => handleSectionNav(e, 'services')}>Billing Systems</a></li>
              <li><a href="#services" onClick={(e) => handleSectionNav(e, 'services')}>Enterprise AI Platforms</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-links-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#about" onClick={(e) => handleSectionNav(e, 'about')}>About Us</a></li>
              <li><a href="#" onClick={(e) => handleSectionNav(e, 'contact')}>Careers</a></li>
              <li><a href="#contact" onClick={(e) => handleSectionNav(e, 'contact')}>Contact</a></li>
              <li><a href="#" onClick={(e) => handleSectionNav(e, 'contact')}>Press Kit</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="footer-links-col">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><Link to="/documentation">Documentation</Link></li>
              <li><Link to="/system-status">System Status</Link></li>
              <li><Link to="/security-assurance">Security Assurance</Link></li>
              <li><Link to="/tech-blog">Tech Blog</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Advancx Solution. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">SLA Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
