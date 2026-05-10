import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import About from './About/About'
import Portfolio from './Portfolio/Portfolio'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App