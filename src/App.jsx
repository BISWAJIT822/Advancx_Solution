import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Documentation from './pages/Documentation';
import SystemStatus from './pages/SystemStatus';
import SecurityAssurance from './pages/SecurityAssurance';
import TechBlog from './pages/TechBlog';
import Article from './pages/Article';

function App() {
  return (
    <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient background orange glowing nodes */}
      <div className="glow-backdrop-1"></div>
      <div className="glow-backdrop-2"></div>
      <div className="glow-backdrop-3"></div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/system-status" element={<SystemStatus />} />
        <Route path="/security-assurance" element={<SecurityAssurance />} />
        <Route path="/tech-blog" element={<TechBlog />} />
        <Route path="/tech-blog/:slug" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
