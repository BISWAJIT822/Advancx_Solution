import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve after showing to prevent flicker
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully in view
      }
    );

    for (const el of revealElements) {
      observer.observe(el);
    }

    return () => {
      for (const el of revealElements) {
        observer.unobserve(el);
      }
    };
  }, []);

  return (
    <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient background orange glowing nodes */}
      <div className="glow-backdrop-1"></div>
      <div className="glow-backdrop-2"></div>
      <div className="glow-backdrop-3"></div>

      {/* Main Sections */}
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Services />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
