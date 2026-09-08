import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import PageLayout from './PageLayout';
import { useContent } from '../content/ContentContext';

const GalleryPage = () => {
  const { eyebrow, title, intro, tiles } = useContent('gallery');

  return (
    <PageLayout eyebrow={eyebrow} title={title} intro={intro}>
      <section className="section page-section">
        <div className="container">
          <div className="gallery-grid">
            {tiles.map((tile, i) => (
              <div className={`gallery-tile ${tile.image ? 'has-photo' : ''}`} key={i}>
                {tile.image ? (
                  <img src={tile.image} alt={tile.label} className="gallery-tile-img" />
                ) : (
                  <ImageIcon size={26} strokeWidth={1.4} />
                )}
                <span>{tile.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default GalleryPage;
