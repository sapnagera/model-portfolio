import { useState } from 'react'
import './Portfolio.css'

const images = [
  '/assets/portfolio/img1.jpg',
  '/assets/portfolio/img2.jpg',
  '/assets/portfolio/img3.jpg',
  '/assets/portfolio/img4.jpg',
  '/assets/portfolio/img5.jpg',
  '/assets/portfolio/img6.jpg',
]

const Portfolio = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const [current, setCurrent] = useState<number>(0)

  const openImage = (index: number) => {
    setCurrent(index)
    setSelected(images[index])
  }

  const closeImage = () => {
    setSelected(null)
  }

  const prevImage = () => {
    const newIndex = (current - 1 + images.length) % images.length
    setCurrent(newIndex)
    setSelected(images[newIndex])
  }

  const nextImage = () => {
    const newIndex = (current + 1) % images.length
    setCurrent(newIndex)
    setSelected(images[newIndex])
  }

  return (
    <section className="portfolio">

      <div className="portfolio-header">
        <h1>Portfolio</h1>
        <p>Selected Works</p>
      </div>

      {/* GRID */}
      <div className="portfolio-grid">
        {images.map((img, index) => (
          <div
            key={index}
            className="portfolio-item"
            onClick={() => openImage(index)}
          >
            <img src={img} alt={`Portfolio ${index + 1}`} />
            <div className="portfolio-overlay">
              <span>View</span>
            </div>
          </div>
        ))}
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
  )
}

export default Portfolio