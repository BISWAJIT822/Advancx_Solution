import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

const bars = [42, 64, 50, 78, 58, 86, 70];

const Demo = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section id="demo" className="section demo-section">
      <div className="container">
        <div className="demo-header reveal">
          <span className="features-eyebrow">Live Demo</span>
          <h2>See Advancx in Action</h2>
          <p>
            Take a quick look at the kind of fast, polished products we build. Explore a sample
            dashboard, then request a personalized walkthrough tailored to your project.
          </p>
        </div>

        <div className="demo-window reveal">
          <div className="demo-window-bar">
            <span className="demo-dot" />
            <span className="demo-dot" />
            <span className="demo-dot" />
            <div className="demo-url">app.advancx.solution</div>
          </div>

          <div className="demo-window-body">
            <aside className="demo-sidebar">
              <div className="demo-sidebar-logo">AX</div>
              <span className="demo-nav-item active" />
              <span className="demo-nav-item" />
              <span className="demo-nav-item" />
              <span className="demo-nav-item" />
            </aside>

            <div className="demo-main">
              <div className="demo-main-top">
                <span className="demo-main-title">Dashboard Overview</span>
                <span className="demo-avatar" />
              </div>

              <div className="demo-stats">
                <div className="demo-stat">
                  <span className="demo-stat-label">Revenue</span>
                  <span className="demo-stat-value">$128.4k</span>
                  <span className="demo-stat-trend">+23%</span>
                </div>
                <div className="demo-stat">
                  <span className="demo-stat-label">Active Users</span>
                  <span className="demo-stat-value">4,218</span>
                  <span className="demo-stat-trend">+8.1%</span>
                </div>
                <div className="demo-stat">
                  <span className="demo-stat-label">Conversion</span>
                  <span className="demo-stat-value">3.9%</span>
                  <span className="demo-stat-trend">+0.6%</span>
                </div>
              </div>

              <div className="demo-chart">
                <div className="demo-chart-head">
                  <span>Weekly Performance</span>
                  <span className="demo-chart-legend" />
                </div>
                <div className="demo-bars">
                  {bars.map((h, i) => (
                    <span key={i} className="demo-bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-actions reveal">
          <a href="#contact" className="btn-primary" onClick={scrollToContact}>
            Request a Demo
            <ArrowRight size={16} />
          </a>
          <span className="demo-actions-note">
            <Play size={14} /> 2-minute product walkthrough
          </span>
        </div>
      </div>
    </section>
  );
};

export default Demo;
