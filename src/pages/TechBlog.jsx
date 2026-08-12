import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageLayout from './PageLayout';
import { posts } from '../data/blogPosts';

const TechBlog = () => {
  return (
    <PageLayout
      eyebrow="Resources"
      title="Tech Blog"
      intro="Notes from the Advancx team on building modern software, mobile apps, and AI, straight from real client work."
    >
      <section className="section page-section">
        <div className="container">
          <div className="page-grid blog-grid">
            {posts.map((p) => (
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
    </PageLayout>
  );
};

export default TechBlog;
