import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import PageLayout from './PageLayout';
import { useContent } from '../content/ContentContext';

const SystemStatus = () => {
  const { eyebrow, title, intro, bannerText, services } = useContent('systemStatus');

  return (
    <PageLayout eyebrow={eyebrow} title={title} intro={intro}>
      <section className="section page-section">
        <div className="container">
          <div className="status-banner">
            <CheckCircle2 size={22} />
            <span>{bannerText}</span>
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
