import React from 'react';
import { User } from 'lucide-react';
import PageLayout from './PageLayout';

// Placeholder members — replace names/roles (and add photos) with the real team.
const members = [
  { name: 'Team Member', role: 'Founder & CEO' },
  { name: 'Team Member', role: 'Chief Technology Officer' },
  { name: 'Team Member', role: 'Lead Software Engineer' },
  { name: 'Team Member', role: 'UI / UX Designer' },
  { name: 'Team Member', role: 'Project Manager' },
  { name: 'Team Member', role: 'QA Engineer' },
];

const MembersPage = () => (
  <PageLayout
    eyebrow="Company"
    title="Our Members"
    intro="The people who design, build, and ship every Advancx Solution project."
  >
    <section className="section page-section">
      <div className="container">
        <div className="members-grid">
          {members.map((m, i) => (
            <div className="member-card" key={i}>
              <div className="member-avatar">
                <User size={34} strokeWidth={1.5} />
              </div>
              <h3 className="member-name">{m.name}</h3>
              <span className="member-role">{m.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default MembersPage;
