import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Users, Network, Target, BookOpen, Shield, TrendingUp, Calendar, ArrowRightCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

// Hero Slider Component
function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: "/hero-bg.jpg",
      title: "CONSORTIUM OF SELF HELP GROUP APPROACH PROMOTERS",
      subtitle: "Sustainable Development through Community Empowerment"
    },
    {
      image: "https://kimi-web-img.moonshot.cn/img/hopeforjustice.org/0cb6ec3676d18e27d8ef17ebbad30df13511bdcb.png",
      title: "EMPOWERING WOMEN THROUGH SELF HELP GROUPS",
      subtitle: "Building Stronger Communities Together"
    },
    {
      image: "https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/e2c4f996230f15d8af5e6767fa545bb42054d293.jpg",
      title: "TRANSFORMING LIVES ACROSS ETHIOPIA",
      subtitle: "Over 29,000 Self Help Groups and Growing"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative">
      <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0047AB]/90 via-[#0047AB]/70 to-transparent" />
          </div>
        ))}
        
        <div className="absolute inset-0 flex items-center">
          <div className="w-full section-padding">
            <div className="max-w-2xl text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-6">{slides[currentSlide].subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="px-6 py-3 bg-white text-[#0047AB] font-medium rounded-full hover:bg-gray-100 transition-colors">
                  Learn More
                </Link>
                <Link to="/contact" className="px-6 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-[#0047AB] transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() }
    }, { threshold: 0.2 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="w-full section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <img src="https://kimi-web-img.moonshot.cn/img/res.cloudinary.com/4f7d1e626c538fbe2bf069af359b3743e1acdd2b.jpg" 
              alt="Ethiopian women self help group" className="w-full rounded-2xl shadow-lg" />
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h2 className="text-[#0047AB] font-semibold mb-2">ABOUT US</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              CoSAP is a consortium of organizations working across Ethiopia to promote the Self Help Group (SHG) approach. 
              Through coordination, capacity building, and partnerships, it strengthens communities to achieve sustainable 
              economic empowerment and social justice.
            </p>
            <Link to="/about" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0047AB] text-white font-medium rounded-full hover:bg-[#003380] transition-colors">
              Read More <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// Thematic Areas Section
function ThematicAreasSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const areas = [
    { icon: Users, title: "Self Help Group Approach Promotion", desc: "Promoting SHG methodology across Ethiopia" },
    { icon: Network, title: "Coordination", desc: "Coordinating member organizations and stakeholders" },
    { icon: Target, title: "Evidence Based Advocacy", desc: "Advocating for policy change with research" },
    { icon: BookOpen, title: "Capacity Building", desc: "Building skills and knowledge of communities" },
    { icon: Shield, title: "Safeguarding", desc: "Protecting vulnerable groups and ensuring safety" },
    { icon: TrendingUp, title: "Resource Mobilization", desc: "Securing funding and resources for programs" },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="w-full section-padding">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-[#0047AB] font-semibold mb-2">THEMATIC AREAS</h2>
          <p className="text-gray-600 text-lg">Here are our main areas of work</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <div key={index}
              className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="w-14 h-14 bg-[#0047AB]/10 rounded-xl flex items-center justify-center mb-4">
                <area.icon size={28} className="text-[#0047AB]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{area.title}</h3>
              <p className="text-gray-600">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Latest News Section
function LatestNewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const newsItems = [
    {
      date: "June 2026",
      title: "CoSAP Celebrates Ethiopian Women's Day with SHG Women Across the Country",
      excerpt: "CoSAP joined women from Self Help Groups across Ethiopia to celebrate Ethiopian Women's Day, honoring the resilience and leadership of SHG women...",
      image: "/news-womens-day.jpg",
      tag: "Celebration"
    },
    {
      date: "May 2026",
      title: "CoSAP Marks Civil Society Week with National Exhibition and Panel Discussion",
      excerpt: "As part of the annual Civil Society Week, CoSAP organized an exhibition and high-level panel discussion showcasing the contribution of the SHG approach...",
      image: "/news-civil-society-week.jpg",
      tag: "Event"
    },
    {
      date: "April 2026",
      title: "SHG Platform Supports Recovery and Resilience Efforts in Tigray Region",
      excerpt: "CoSAP and its member organizations are supporting recovery and resilience building in the Tigray region through community-based savings groups...",
      image: "/news-tigray-recovery.jpg",
      tag: "Recovery"
    },
    {
      date: "May 2026",
      title: "CoSAP Strengthening Civil Society-Government Partnership Under the CSF+ Program",
      excerpt: "As part of the EU CSF+ Program, CoSAP organized a high-level Forum on May 8, 2025 in Hilton Addis Ababa, hosted by the Office of the Prime Minister...",
      image: "/news-latest-1.png",
      tag: "Partnership"
    },
    {
      date: "April 2026",
      title: "EU Delegation and Partners Strengthen Field Engagement with Local Subgrantees in Oromia",
      excerpt: "Delegates from the European Union Delegation (EUD) to Ethiopia, WHH, and CoSAP conducted field visits to sub-grantee organizations in the Oromia region...",
      image: "/news-latest-2.png",
      tag: "Field Visit"
    },
    {
      date: "March 2026",
      title: "CEHRO Strengthens Advocacy Capacity of SHG Federations Across Ethiopia",
      excerpt: "Women leaders from Self-Help Group (SHG) Federations across Ethiopia are strengthening their voice and influence in community and national spaces...",
      image: "/news-latest-3.png",
      tag: "Advocacy"
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="w-full section-padding">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-[#0047AB] font-semibold mb-2">LATEST NEWS</h2>
          <p className="text-gray-600 text-lg">Stay updated with our latest activities and achievements</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {newsItems.map((item, index) => (
            <div key={index}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group flex flex-col ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: `${index * 150}ms` }}>
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-[#0047AB] text-white text-xs font-medium rounded-full shadow-md">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar size={14} className="text-[#0047AB]" />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#0047AB] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{item.excerpt}</p>
                <Link to="/stories-news" 
                  className="inline-flex items-center gap-2 text-[#0047AB] text-sm font-medium hover:underline mt-auto">
                  Read More <ArrowRightCircle size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={`text-center mt-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link to="/stories-news" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0047AB] text-white font-medium rounded-full hover:bg-[#003380] transition-colors">
            View All News <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// Stats Section
function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState<Record<string, number>>({})

  const stats = [
    { id: 'members', value: 52, suffix: '', label: 'Member Organizations' },
    { id: 'regions', value: 9, suffix: '', label: 'Regional States & 2 City Administrations' },
    { id: 'shgs', value: 29, suffix: 'K+', label: 'Self Help Groups' },
    { id: 'clas', value: 1384, suffix: '+', label: 'Cluster Level Associations' },
    { id: 'federations', value: 30, suffix: '', label: 'Federations' },
  ]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const duration = 2000, steps = 60, interval = duration / steps
    const targetValues = stats.map(s => s.value)
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const newCounts: Record<string, number> = {}
      stats.forEach((stat, i) => {
        newCounts[stat.id] = Math.round(targetValues[i] * easeOut)
      })
      setCounts(newCounts)
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-16 bg-[#0047AB]">
      <div className="w-full section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center text-white">
              <div className="text-3xl sm:text-4xl font-bold mb-2">{counts[stat.id] ?? 0}{stat.suffix}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Team Section
function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const team = [
    { name: "Mr. Yosef Akalu", role: "Director of CoSAP", image: "/new_team_mr_yosef_akalu.jpg" },
    { name: "Mrs. Liyou Alene", role: "Admin & Finance Coordinator", image: "/new_team_mrs_liyou_alene.jpg" },
    { name: "Mr. Darek Yibeltal", role: "Resource Mobilization & PMEAL Unit Head", image: "/new_team_mr_darek_yibeltal.jpg" },
    { name: "Mr. Atenatyos Mezmur", role: "Resource Mobilization & MEAL", image: "/new_team_mr_atenatyos_mezmur.jpg" },
    { name: "Mrs. Betemariyam Gashaw", role: "Program Officer", image: "/new_team_mrs_betemariyam_gashaw.jpg" },
    { name: "Mrs. Hana Eshete", role: "Program Officer", image: "/new_team_mrs_hana_eshete.jpg" },
    { name: "Mrs. Selam Girma", role: "Finance Officer", image: "/new_team_mrs_selam_girma.jpg" },
    { name: "Mr. Tsegaye Milikyas", role: "Regional Capacity Building Advisor", image: "/new_team_mr_tsegaye_milikyas.jpg" },
    { name: "Dr. Yirgalem Abebaw", role: "MEAL Officer", image: "/new_team_dr_yirgalem_abebaw.jpg" },
    { name: "Ms. Kalkidan Buzayew", role: "Program Assistant", image: "/new_team_ms_kalkidan_buzayew.jpg" },
    { name: "Mr. Natnael Solomon", role: "Program Assistant", image: "/new_team_mr_natnael_solomon.jpg" },
    { name: "Ms. Kalkidan Yared", role: "Program Assistant", image: "/new_team_ms_kalkidan_yared.jpg" },
    { name: "Mr. Yoseph Arage", role: "Driver/Purchaser", image: "/new_team_mr_yoseph_arage.jpg" },
    { name: "Mrs. Meseret Tsegaye", role: "Store Manager", image: "/new_team_mrs_meseret_tsegaye.jpg" },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="w-full section-padding">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold text-[#0047AB] mb-2">OUR TEAM</h2>
          <p className="text-gray-600 text-lg">Meet the people behind our mission</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
          {team.map((member, index) => (
            <div key={index}
              className={`text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 80}ms` }}>
              <div className="w-[150px] h-[200px] mx-auto mb-3 rounded-xl overflow-hidden shadow-md border-2 border-[#0047AB]/10">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">{member.name}</h3>
              <p className="text-[#0047AB] text-xs mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Partners Section
function PartnersSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const partners = [
    { name: "Irish Aid", image: "/partners/irish-aid.png" },
    { name: "UN Women", image: "/partners/unwomen.png" },
    { name: "WHH", image: "/partners/whh.png" },
    { name: "Mastercard Foundation", image: "/partners/mastercard.png" },
    { name: "European Union", image: "/partners/eu.png" },
    { name: "KNH", image: "/partners/knh.png" },
    { name: "GFC", image: "/partners/gfc.jpg" },
    { name: "Tearfund", image: "/partners/tearfund.jpg" },
    { name: "Wilde Gazen", image: "/partners/wilde-gazen.jpg" },
    { name: "Ministry of Foreign Affairs", image: "/partners/min-foreign-affairs.jpg" },
  ]
  const visiblePartners = 4
  const maxIndex = Math.max(0, partners.length - visiblePartners)

  const nextSlide = () => setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)
  const prevSlide = () => setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1)

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full section-padding">
        <h2 className="text-center text-[#0047AB] font-semibold mb-8">OUR PARTNERS</h2>
        {/* Mobile: static grid, Desktop: carousel */}
        <div className="md:hidden grid grid-cols-2 gap-4 max-w-lg mx-auto">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white rounded-xl p-4 h-24 flex items-center justify-center shadow-sm">
              <img src={partner.image} alt={partner.name} className="max-h-16 max-w-full object-contain" />
            </div>
          ))}
        </div>
        <div className="hidden md:block relative max-w-5xl mx-auto">
          <button onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#0047AB] hover:bg-[#0047AB] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#0047AB] hover:bg-[#0047AB] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visiblePartners)}%)` }}>
              {partners.map((partner, index) => (
                <div key={index} className="flex-shrink-0 w-1/4 px-3">
                  <div className="bg-white rounded-xl p-6 h-32 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                    <img src={partner.image} alt={partner.name} className="max-h-20 max-w-full object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button key={index} onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-[#0047AB]' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <AboutSection />
      <ThematicAreasSection />
      <LatestNewsSection />
      <StatsSection />
      <TeamSection />
      <PartnersSection />
    </div>
  )
}
