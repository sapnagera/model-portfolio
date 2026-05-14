import { useState, useEffect } from 'react';
import './Body.css'

const API = "https://angelina-portfolio-api.onrender.com";

const Body = () => {
  const [videoUrl, setVideoUrl] = useState("/assets/body/body.mp4");

  useEffect(() => {
    async function loadVideo() {
      try {
        const res = await fetch(`${API}/video`);
        const data = await res.json();
        if (data.video) {
          setVideoUrl(data.video);
        }
      } catch (err) {
        console.error("Failed to load video:", err);
      }
    }
    loadVideo();
  }, []);

  return (
    <section className="body">
      <video
        className="body-video"
        autoPlay
        muted
        loop
        playsInline
        key={videoUrl}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="body-content">
        <h1>Angelina Akok</h1>
        <p>Beauty & Glamour Model</p>
      </div>
    </section>
  )
}

export default Body