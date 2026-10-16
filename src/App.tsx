import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import TopBar from './components/TopBar'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import LogoIntro from './components/LogoIntro'
import { useSEO } from './hooks/useSEO'

import Home from './pages/Home'
import About from './pages/About'
import OurWork from './pages/OurWork'
import StoriesNews from './pages/StoriesNews'
import Resources from './pages/Resources'
import Contact from './pages/Contact'
import Donate from './pages/Donate'

function SEOWrapper() {
  useSEO()
  return null
}

function App() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    if (showIntro) {
      const t = setTimeout(() => setShowIntro(false), 2500)
      return () => clearTimeout(t)
    }
  }, [showIntro])

  return (
    <>
      {showIntro && <LogoIntro onComplete={() => setShowIntro(false)} />}
      <Router>
        <SEOWrapper />
        <div className="min-h-screen bg-white flex flex-col">
          <TopBar />
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/our-work" element={<OurWork />} />
              <Route path="/stories-news" element={<StoriesNews />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
