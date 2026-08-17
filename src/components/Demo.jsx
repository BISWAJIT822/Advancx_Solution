import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';

const demos = [
  { name: 'College Website', url: 'https://college-website-template-kappa.vercel.app/' },
  { name: 'NGO Website', url: 'https://ngowebsite-azure.vercel.app/' },
  { name: 'Resort Website', url: 'https://resort-website-3yb2.vercel.app/' },
  { name: 'Club Website', url: 'https://clubwebsite-six.vercel.app/' },
  { name: 'Coaching Website', url: 'https://coaching-web-three.vercel.app/' },
];

const prettyUrl = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const Demo = () => {
  const [index, setIndex] = useState(0);
  const viewportRef = useRef(null);
  const current = demos[index];

  const goTo = (i) => {
    const clamped = (i + demos.length) % demos.length;
    setIndex(clamped);
    const vp = viewportRef.current;
    if (vp) vp.scrollTo({ left: clamped * vp.clientWidth, behavior: 'smooth' });
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Keep the caption / url in sync when the user swipes the carousel
  const handleScroll = () => {
    const vp = viewportRef.current;
    if (!vp || vp.clientWidth === 0) return;
    const i = Math.round(vp.scrollLeft / vp.clientWidth);
    setIndex((prev) => (prev !== i ? i : prev));
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section id="demo" className="section demo-section">
      <div className="container">
        <div className="demo-header reveal">
          <span className="features-eyebrow">Live Demos</span>
          <h2>See Advancx in Action</h2>
          <p>
            Explore real websites we&apos;ve designed and built. Use the arrows to browse through our
            live demos, then request one tailored to your business.
          </p>
        </div>

        <div className="demo-carousel">
          <button className="demo-nav-btn demo-prev" onClick={prev} aria-label="Previous demo">
            <ChevronLeft size={22} />
          </button>

          <div className="demo-window">
            <div className="demo-window-bar">
              <span className="demo-dot" />
              <span className="demo-dot" />
              <span className="demo-dot" />
              <div className="demo-url">{prettyUrl(current.url)}</div>
              <a
                href={current.url}
                target="_blank"
                rel="noreferrer"
                className="demo-open"
                aria-label="Open live site in a new tab"
              >
                <ExternalLink size={15} />
              </a>
            </div>

            <div className="demo-viewport" ref={viewportRef} onScroll={handleScroll}>
              {demos.map((d) => (
                <div className="demo-slide" key={d.url}>
                  <iframe
                    src={d.url}
                    title={d.name}
                    loading="lazy"
                    scrolling="no"
                    tabIndex={-1}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                  <a
                    className="demo-slide-overlay"
                    href={d.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${d.name} in a new tab`}
                  >
                    <span>
                      Open live site <ExternalLink size={14} />
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button className="demo-nav-btn demo-next" onClick={next} aria-label="Next demo">
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="demo-controls">
          <span className="demo-caption">
            {current.name} <span className="demo-count">{index + 1} / {demos.length}</span>
          </span>
          <div className="demo-dots">
            {demos.map((d, i) => (
              <button
                key={d.url}
                className={`demo-dot-btn ${i === index ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to ${d.name}`}
              />
            ))}
          </div>
        </div>

        <div className="demo-actions">
          <a href="#contact" className="btn-primary" onClick={scrollToContact}>
            Request a Demo
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Demo;
