import { useState, useEffect } from 'react';
import './About.css'

const API = "https://angelina-portfolio-api.onrender.com";

const About = () => {
  const [bio, setBio] = useState("Loading...");
  const [photoUrl, setPhotoUrl] = useState("/assets/About/profile.jpg");
  const [stats, setStats] = useState({
    age: "24",
    height: "175 cm / 5'9\"",
    bust: "86 cm",
    waist: "61 cm",
    hips: "89 cm",
    shoe: "EU 39",
    eyes: "Brown",
    hair: "Dark Brown"
  });

  useEffect(() => {
    async function loadContent() {
      try {
        const [bioRes, statsRes, photoRes] = await Promise.all([
          fetch(`${API}/bio`),
          fetch(`${API}/stats`),
          fetch(`${API}/about-photo`)
        ]);

        const bioData = await bioRes.json();
        const statsData = await statsRes.json();
        const photoData = await photoRes.json();

        setBio(bioData.bio || "Hi, I'm Angelina! 🖤\n\nI'm a beauty and glamour model based in Helsinki, Finland...");
        setStats(statsData.stats || stats);
        if (photoData.about_photo) {
          setPhotoUrl(photoData.about_photo);
        }
      } catch (err) {
        console.error("Failed to load content:", err);
        setBio("Hi, I'm Angelina! 🖤\n\nI'm a beauty and glamour model based in Helsinki, Finland...");
      }
    }
    loadContent();
  }, []);

  return (
    <section className="about">
      <div className="about-image">
        <img src={photoUrl} alt="Angelina Akok" />
      </div>
      <div className="about-details">
        <h1>Angelina Akok</h1>
        <p className="about-bio" style={{ whiteSpace: 'pre-wrap' }}>
          {bio}
        </p>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-label">Age</span>
            <span className="stat-value">{stats.age}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Height</span>
            <span className="stat-value">{stats.height}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Bust</span>
            <span className="stat-value">{stats.bust}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Waist</span>
            <span className="stat-value">{stats.waist}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Hips</span>
            <span className="stat-value">{stats.hips}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Shoe</span>
            <span className="stat-value">{stats.shoe}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Eyes</span>
            <span className="stat-value">{stats.eyes}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Hair</span>
            <span className="stat-value">{stats.hair}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About