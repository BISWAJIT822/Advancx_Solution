import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageLayout from './PageLayout';
import { useContent } from '../content/ContentContext';

const TechBlog = () => {
  const { eyebrow, title, intro, posts } = useContent('blogPage');

  return (
    <PageLayout eyebrow={eyebrow} title={title} intro={intro}>
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
