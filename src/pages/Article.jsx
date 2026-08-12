import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactPopup from '../components/ContactPopup';
import { getPost, posts } from '../data/blogPosts';

const Article = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="page-main">
          <section className="page-hero">
            <div className="container">
              <span className="page-eyebrow">Tech Blog</span>
              <h1>Article not found</h1>
              <p>The article you&apos;re looking for doesn&apos;t exist or may have moved.</p>
              <Link to="/tech-blog" className="btn-primary" style={{ marginTop: '20px' }}>
                Back to Blog
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="page-main">
        <article className="article">
          <div className="container article-container">
            <Link to="/tech-blog" className="article-back">
              <ArrowLeft size={16} /> Back to Blog
            </Link>

            <div className="blog-meta article-meta">
              <span className="blog-tag">{post.tag}</span>
              <span className="blog-date">
                {post.date} &middot; {post.readTime}
              </span>
            </div>

            <h1 className="article-title">{post.title}</h1>
            <p className="article-lead">{post.excerpt}</p>

            <div className="article-body">
              {post.content.map((block, i) =>
                block.type === 'h' ? (
                  <h2 key={i}>{block.text}</h2>
                ) : (
                  <p key={i}>{block.text}</p>
                )
              )}
            </div>

            <div className="article-cta">
              <span>Have a project in mind?</span>
              <ContactPopup triggerLabel="Get in touch" />
            </div>
          </div>
        </article>

        <section className="section page-section article-related">
          <div className="container">
            <h2 className="article-related-title">More from the blog</h2>
            <div className="page-grid blog-grid">
              {related.map((p) => (
                <Link to={`/tech-blog/${p.slug}`} key={p.slug} className="page-card blog-card">
                  <div className="blog-meta">
                    <span className="blog-tag">{p.tag}</span>
                    <span className="blog-date">{p.date}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="page-card-link">
                    Read article <ArrowUpRight size={14} />
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

export default Article;
