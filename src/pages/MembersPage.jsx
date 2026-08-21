import React from 'react';
import { User, Quote } from 'lucide-react';
import PageLayout from './PageLayout';

// Placeholder members — replace names, roles, quotes (and add photos) with the real team.
const members = [
  {
    name: 'Team Member',
    role: 'Founder & CEO',
    quote: 'We build software that actually moves the needle for the businesses we work with.',
  },
  {
    name: 'Team Member',
    role: 'Chief Technology Officer',
    quote: 'Great engineering is invisible — it just works, reliably, every single time.',
  },
  {
    name: 'Team Member',
    role: 'Lead Software Engineer',
    quote: 'I love turning messy, complex problems into clean and dependable code.',
  },
  {
    name: 'Team Member',
    role: 'UI / UX Designer',
    quote: "Good design is honest and simple — it gets out of the user's way.",
  },
  {
    name: 'Team Member',
    role: 'Project Manager',
    quote: 'Clear communication is what keeps every project on time and on point.',
  },
  {
    name: 'Team Member',
    role: 'QA Engineer',
    quote: 'Quality is not a final step — it is built into everything we ship.',
  },
];

const MembersPage = () => (
  <PageLayout
    eyebrow="Company"
    title="Our Members"
    intro="Meet the people who design, build, and ship every Advancx Solution project — in their own words."
  >
    <section className="section page-section">
      <div className="container">
        <div className="members-grid">
          {members.map((m, i) => (
            <div className="member-card" key={i}>
              <Quote className="member-quote-mark" size={26} />
              <p className="member-message">{m.quote}</p>
              <div className="member-person">
                <div className="member-avatar">
                  <User size={24} strokeWidth={1.6} />
                </div>
                <div className="member-person-info">
                  <h3 className="member-name">{m.name}</h3>
                  <span className="member-role">{m.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default MembersPage;
