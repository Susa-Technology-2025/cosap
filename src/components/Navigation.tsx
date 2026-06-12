import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Our Work', href: '/our-work' },
    { name: 'Stories & News', href: '/stories-news' },
    { name: 'Documentation & Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white py-3'
      }`}
    >
      <div className="w-full section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/cosap-logo.jpg" alt="CoSAP Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-gray-700 font-medium hover:text-[#0047AB] transition-colors ${
                  location.pathname === link.href ? 'text-[#0047AB]' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Donate Button */}
          <div className="hidden lg:block">
            <Link 
              to="/donate" 
              className="px-6 py-2.5 bg-[#0047AB] text-white font-medium rounded-full hover:bg-[#003380] transition-colors"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden bg-white border-t transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="section-padding py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-gray-700 font-medium py-2 hover:text-[#0047AB] transition-colors ${
                location.pathname === link.href ? 'text-[#0047AB]' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/donate" 
            className="mt-2 px-6 py-2.5 bg-[#0047AB] text-white font-medium rounded-full text-center"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </nav>
  )
}
