import React from 'react';
import { ShieldCheck, Lock, KeyRound, ScrollText, ServerCog, Eye } from 'lucide-react';
import PageLayout from './PageLayout';

const measures = [
  { icon: Lock, title: 'End-to-End Encryption', desc: 'Data is encrypted in transit (TLS 1.3) and at rest (AES-256) across every service.' },
  { icon: KeyRound, title: 'Zero-Trust Access', desc: 'Least-privilege access, MFA, and short-lived credentials protect every entry point.' },
  { icon: ShieldCheck, title: 'Secure Development', desc: 'Code review, dependency scanning, and automated security tests on every release.' },
  { icon: ScrollText, title: 'Compliance Ready', desc: 'Practices aligned with GDPR and industry standards, with audit-friendly logging.' },
  { icon: ServerCog, title: 'Hardened Infrastructure', desc: 'Isolated environments, automated patching, and continuous vulnerability monitoring.' },
  { icon: Eye, title: '24/7 Monitoring', desc: 'Real-time threat detection and alerting keep your core data pipeline safe.' },
];

const SecurityAssurance = () => {
  return (
    <PageLayout
      eyebrow="Resources"
      title="Security Assurance"
      intro="Security is built into everything we ship. Here's how we protect your data, your users, and your business at every layer."
    >
      <section className="section page-section">
        <div className="container">
          <div className="page-grid">
            {measures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="page-card">
                <div className="page-card-icon">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SecurityAssurance;
