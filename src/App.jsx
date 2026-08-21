import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Documentation from './pages/Documentation';
import DocPage from './pages/DocPage';
import SystemStatus from './pages/SystemStatus';
import SecurityAssurance from './pages/SecurityAssurance';
import TechBlog from './pages/TechBlog';
import Article from './pages/Article';
import LegalPage from './pages/LegalPage';
import MembersPage from './pages/MembersPage';
import GalleryPage from './pages/GalleryPage';

// Scroll to the top of the page whenever the route path changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Jump instantly to the top on route change. The html element uses
    // smooth scrolling, so temporarily disable it to avoid an animated
    // scroll. Run once now and again on the next frame to catch any
    // late layout shift as the new page's content settles.
    const jumpTop = () => {
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      html.style.scrollBehavior = prev;
    };
    jumpTop();
    const raf = requestAnimationFrame(jumpTop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <ScrollToTop />
      {/* Ambient background orange glowing nodes */}
      <div className="glow-backdrop-1"></div>
      <div className="glow-backdrop-2"></div>
      <div className="glow-backdrop-3"></div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/documentation/:slug" element={<DocPage />} />
        <Route path="/system-status" element={<SystemStatus />} />
        <Route path="/security-assurance" element={<SecurityAssurance />} />
        <Route path="/tech-blog" element={<TechBlog />} />
        <Route path="/tech-blog/:slug" element={<Article />} />
        <Route path="/privacy-policy" element={<LegalPage slug="privacy-policy" />} />
        <Route path="/terms-of-service" element={<LegalPage slug="terms-of-service" />} />
        <Route path="/sla-agreement" element={<LegalPage slug="sla-agreement" />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </div>
  );
}

export default App;
