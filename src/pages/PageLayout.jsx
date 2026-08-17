import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PageLayout = ({ eyebrow, title, intro, children }) => {
  // Scroll-to-top on navigation is handled globally by <ScrollToTop /> in App.
  return (
    <>
      <Navbar />
      <main className="page-main">
        <section className="page-hero">
          <div className="container">
            <span className="page-eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            {intro && <p>{intro}</p>}
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;
