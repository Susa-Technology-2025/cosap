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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Our Work', href: '/our-work' },
    { name: 'Stories & News', href: '/stories-news' },
    { name: 'Documentation & Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
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
              className="lg:hidden p-2 text-gray-700 z-[60] relative"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold text-[#0047AB]">Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-[#0047AB]/5 hover:text-[#0047AB] transition-colors ${
                    location.pathname === link.href ? 'text-[#0047AB] bg-[#0047AB]/5' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/donate" 
                className="mt-4 px-6 py-3 bg-[#0047AB] text-white font-medium rounded-full text-center hover:bg-[#003380] transition-colors"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
