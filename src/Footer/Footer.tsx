import { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa'
import './Footer.css'

const API = "https://angelina-portfolio-api.onrender.com";

const Footer = () => {
  const [contact, setContact] = useState({
    email: "angelina@email.com",
    phone: "",
    location: "Helsinki, Finland"
  });

  const [social, setSocial] = useState({
    instagram: "",
    facebook: "",
    twitter: ""
  });

  useEffect(() => {
    async function loadContent() {
      try {
        const [contactRes, socialRes] = await Promise.all([
          fetch(`${API}/contact`),
          fetch(`${API}/social`)
        ]);

        const contactData = await contactRes.json();
        const socialData = await socialRes.json();

        setContact(contactData.contact || contact);
        setSocial(socialData.social || social);
      } catch (err) {
        console.error("Failed to load footer content:", err);
      }
    }
    loadContent();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Angelina Love</h2>
          <p>Beauty & Glamour Model</p>
        </div>
        <div className="footer-contact">
          <h3>Contact</h3>
          <ul>
            {contact.email && <li>📧 {contact.email}</li>}
            {contact.phone && <li>📞 {contact.phone}</li>}
            {contact.location && <li>📍 {contact.location}</li>}
          </ul>
        </div>
        <div className="footer-social">
          <h3>Follow Me</h3>
          <div className="social-icons">
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Angelina Love. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer