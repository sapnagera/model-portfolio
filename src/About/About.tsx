import { useState, useEffect } from 'react';
import './About.css'

const API = "https://angelina-portfolio-api.onrender.com";

const About = () => {
  const [bio, setBio] = useState("Loading...");

  useEffect(() => {
    async function loadBio() {
      try {
        const res = await fetch(`${API}/bio`);
        const data = await res.json();
        setBio(data.bio || "Hi, I'm Angelina! 🖤\n\nI'm a beauty and glamour model based in Helsinki, Finland...");
      } catch {
        setBio("Hi, I'm Angelina! 🖤\n\nI'm a beauty and glamour model based in Helsinki, Finland...");
      }
    }
    loadBio();
  }, []);

  return (
    <section className="about">
      <div className="about-image">
        <img src="/assets/About/profile.jpg" alt="Angelina Love" />
      </div>
      <div className="about-details">
        <h1>Angelina Love</h1>
        <p className="about-bio" style={{ whiteSpace: 'pre-wrap' }}>
          {bio}
        </p>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-label">Age</span>
            <span className="stat-value">24</span>
          </div>
          <div className="stat">
            <span className="stat-label">Height</span>
            <span className="stat-value">175 cm / 5'9"</span>
          </div>
          <div className="stat">
            <span className="stat-label">Bust</span>
            <span className="stat-value">86 cm</span>
          </div>
          <div className="stat">
            <span className="stat-label">Waist</span>
            <span className="stat-value">61 cm</span>
          </div>
          <div className="stat">
            <span className="stat-label">Hips</span>
            <span className="stat-value">89 cm</span>
          </div>
          <div className="stat">
            <span className="stat-label">Shoe</span>
            <span className="stat-value">EU 39</span>
          </div>
          <div className="stat">
            <span className="stat-label">Eyes</span>
            <span className="stat-value">Brown</span>
          </div>
          <div className="stat">
            <span className="stat-label">Hair</span>
            <span className="stat-value">Dark Brown</span>
          </div>
        </div>
      </div>
    </section>
  )
}
export default About