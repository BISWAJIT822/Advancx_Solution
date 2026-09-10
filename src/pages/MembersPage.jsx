import React from 'react';
import { User, Quote } from 'lucide-react';
import PageLayout from './PageLayout';
import { useContent } from '../content/ContentContext';

const MembersPage = () => {
  const { eyebrow, title, intro, groupHeading, items } = useContent('members');

  return (
    <PageLayout eyebrow={eyebrow} title={title} intro={intro}>
      <section className="section page-section">
        <div className="container">
          {groupHeading && <h2 className="members-group-heading">{groupHeading}</h2>}
          <div className="members-grid">
            {items.map((m, i) => (
              <div className="member-card executive-card" key={i}>
                <div className="member-top-section">
                  <div className={`member-photo-frame ${m.image ? 'has-photo' : 'no-photo'}`}>
                    {m.image ? (
                      <img src={m.image} alt={m.name} className="member-photo-img" />
                    ) : (
                      <div className="member-photo-placeholder">
                        <User size={44} strokeWidth={1.3} />
                      </div>
                    )}
                  </div>
                  <div className="member-identity">
                    <h3 className="member-name">{m.name}</h3>
                    <span className="member-role-badge">{m.role}</span>
                  </div>
                </div>

                <div className="member-quote-box">
                  <Quote className="member-quote-mark" size={20} />
                  <p className="member-message">{m.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default MembersPage;
