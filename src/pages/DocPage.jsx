import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getDoc, docs } from '../data/docsData';

const DocPage = () => {
  const { slug } = useParams();
  const doc = getDoc(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!doc) {
    return (
      <>
        <Navbar />
        <main className="page-main">
          <section className="page-hero">
            <div className="container">
              <span className="page-eyebrow">Documentation</span>
              <h1>Page not found</h1>
              <p>The documentation page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
              <Link to="/documentation" className="btn-primary" style={{ marginTop: '20px' }}>
                Back to Documentation
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const Icon = doc.icon;
  const related = docs.filter((d) => d.slug !== doc.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="page-main">
        <article className="article">
          <div className="container article-container">
            <Link to="/documentation" className="article-back">
              <ArrowLeft size={16} /> Back to Documentation
            </Link>

            <div className="doc-article-head">
              <div className="page-card-icon">
                <Icon size={22} strokeWidth={1.6} />
              </div>
              <span className="page-eyebrow">Documentation</span>
            </div>

            <h1 className="article-title">{doc.title}</h1>
            <p className="article-lead">{doc.desc}</p>

            <div className="article-body">
              {doc.content.map((block, i) =>
                block.type === 'h' ? (
                  <h2 key={i}>{block.text}</h2>
                ) : (
                  <p key={i}>{block.text}</p>
                )
              )}
            </div>

            <div className="article-cta">
              <span>Need a hand getting set up?</span>
              <Link to="/#contact" className="page-card-link">
                Talk to our team <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </article>

        <section className="section page-section article-related">
          <div className="container">
            <h2 className="article-related-title">Explore more docs</h2>
            <div className="page-grid">
              {related.map(({ icon: RIcon, title, desc, slug: rslug }) => (
                <Link to={`/documentation/${rslug}`} key={rslug} className="page-card doc-card">
                  <div className="page-card-icon">
                    <RIcon size={22} strokeWidth={1.6} />
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <span className="page-card-link">
                    Read more <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DocPage;
