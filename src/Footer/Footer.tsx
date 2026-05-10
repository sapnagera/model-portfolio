import { FaInstagram, FaTiktok, FaFacebookF } from 'react-icons/fa'
import './Footer.css'
const Footer = () => {
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
            <li>📧 angelina@email.com</li>
            <li>📍 Helsinki, Finland</li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow Me</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/yourhandle" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@yourhandle" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
            <a href="https://www.facebook.com/yourhandle" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
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