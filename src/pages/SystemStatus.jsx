import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import PageLayout from './PageLayout';

const services = [
  { name: 'Web Application', status: 'Operational', uptime: '99.99%' },
  { name: 'API & GraphQL Gateway', status: 'Operational', uptime: '99.98%' },
  { name: 'Authentication', status: 'Operational', uptime: '100%' },
  { name: 'Database Cluster', status: 'Operational', uptime: '99.97%' },
  { name: 'File & Media Storage', status: 'Operational', uptime: '99.99%' },
  { name: 'Payments & Billing', status: 'Operational', uptime: '99.96%' },
  { name: 'Email & Notifications', status: 'Operational', uptime: '99.95%' },
  { name: 'Dashboard & Analytics', status: 'Operational', uptime: '99.98%' },
];

const SystemStatus = () => {
  return (
    <PageLayout
      eyebrow="Resources"
      title="System Status"
      intro="Real-time health of Advancx services. We monitor everything around the clock so you always know what's running smoothly."
    >
      <section className="section page-section">
        <div className="container">
          <div className="status-banner">
            <CheckCircle2 size={22} />
            <span>All Systems Operational</span>
          </div>

          <div className="status-list">
            {services.map((s) => (
              <div key={s.name} className="status-item">
                <div className="status-item-name">
                  <span className="status-dot" />
                  {s.name}
                </div>
                <div className="status-item-meta">
                  <span className="status-uptime">{s.uptime} uptime</span>
                  <span className="status-badge">{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SystemStatus;
