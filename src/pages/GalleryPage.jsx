import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import PageLayout from './PageLayout';

// Placeholder tiles — swap each for a real office / team / event photo.
const tiles = [
  'Our Office',
  'Team Offsite',
  'Product Launch',
  'Workshop',
  'Team Lunch',
  'Award Night',
  'Hackathon',
  'Conference',
  'Culture',
];

const GalleryPage = () => (
  <PageLayout
    eyebrow="Company"
    title="Gallery"
    intro="Moments from the Advancx Solution studio — our office, our team, and the events we share along the way."
  >
    <section className="section page-section">
      <div className="container">
        <div className="gallery-grid">
          {tiles.map((label, i) => (
            <div className="gallery-tile" key={i}>
              <ImageIcon size={26} strokeWidth={1.4} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default GalleryPage;
