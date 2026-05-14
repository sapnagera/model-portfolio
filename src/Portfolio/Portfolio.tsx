import { useState, useEffect } from 'react'
import './Portfolio.css'

const API = "https://angelina-portfolio-api.onrender.com";

const Portfolio = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    async function loadPhotos() {
      try {
        const res = await fetch(`${API}/photos`);
        const data = await res.json();
        const urls = data.photos?.map((p: any) => p.url) || [];
        setImages(urls);
      } catch (err) {
        console.error("Failed to load photos:", err);
      }
    }
    loadPhotos();
  }, []);

  const openImage = (index: number) => {
    setCurrent(index);
    setSelected(images[index]);
  };

  const closeImage = () => {
    setSelected(null);
  };

  const prevImage = () => {
    const newIndex = (current - 1 + images.length) % images.length;
    setCurrent(newIndex);
    setSelected(images[newIndex]);
  };

  const nextImage = () => {
    const newIndex = (current + 1) % images.length;
    setCurrent(newIndex);
    setSelected(images[newIndex]);
  };

  return (
    <section className="portfolio">
      <div className="portfolio-header">
        <h1>Portfolio</h1>
        <p>Selected Works</p>
      </div>
      {/* GRID */}
      <div className="portfolio-grid">
        {images.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', padding: '40px' }}>
            No photos yet. Upload some in the admin panel!
          </p>
        ) : (
          images.map((img, index) => (
            <div
              key={index}
              className="portfolio-item"
              onClick={() => openImage(index)}
            >
              <img src={img} alt={`Portfolio ${index + 1}`} loading="lazy" />
              <div className="portfolio-overlay">
                <span>View</span>
              </div>
            </div>
          ))
        )}
      </div>
      {/* LIGHTBOX */}
      {selected && (
        <div className="lightbox" onClick={closeImage}>
          <button className="lightbox-close" onClick={closeImage}>✕</button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>←</button>
          <img
            src={selected}
            alt="Selected"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>→</button>
        </div>
      )}
    </section>
  );
};

export default Portfolio;