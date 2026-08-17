import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PageLayout from './PageLayout';
import { getLegalPage } from '../data/legalData';

const LegalPage = ({ slug: slugProp }) => {
  const params = useParams();
  const slug = slugProp || params.slug;
  const page = getLegalPage(slug);

  if (!page) {
    return (
      <PageLayout eyebrow="Legal" title="Page not found" intro="This page doesn't exist or may have moved.">
        <section className="section page-section">
          <div className="container">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout eyebrow={page.eyebrow} title={page.title} intro={page.intro}>
      <section className="section page-section">
        <div className="container legal-container">
          <p className="legal-effective">Effective date: {page.effective}</p>

          <div className="legal-body">
            {page.sections.map((section) => (
              <div className="legal-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((block, i) =>
                  typeof block === 'string' ? (
                    <p key={i}>{block}</p>
                  ) : (
                    <ul key={i}>
                      {block.list.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default LegalPage;
