import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Services from '../components/Services';
import Demo from '../components/Demo';
import TechStack from '../components/TechStack';
import ProcessSection from '../components/ProcessSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const HomePage = () => {
  useEffect(() => {
    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
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
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Services />
      <Demo />
      <TechStack />
      <ProcessSection />
      <ContactForm />
      <Footer />
    </>
  );
};

export default HomePage;
