import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <nav className="header">
      <div className="logo">
        <h1>Angelina Akok</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
      </ul>
    </nav>
  )
}

export default Header