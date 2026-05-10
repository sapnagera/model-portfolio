import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import About from './About/About'
import Portfolio from './Portfolio/Portfolio'
import Admin from './Admin/Admin'

function Layout() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <>
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App