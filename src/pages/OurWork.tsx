import { useEffect, useRef, useState } from 'react'
import { Users, Network, Target, BookOpen, Shield, TrendingUp, CheckCircle } from 'lucide-react'

export default function OurWork() {
  const statsRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState([0, 0, 0, 0])

  const stats = [
    { value: 347, suffix: 'K+', label: 'Women Organized' },
    { value: 28.9, suffix: 'K+', label: 'Self Help Groups', isDecimal: true },
    { value: 439, suffix: 'M+', label: 'ETB Capital Raised' },
    { value: 500, suffix: 'K+', label: 'Children Benefiting' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      setCounts(stats.map(stat => {
        if (stat.isDecimal) {
          return Math.round(stat.value * easeOut * 10) / 10
        }
        return Math.round(stat.value * easeOut)
      }))

      if (step >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible])

  const thematicAreas = [
    {
      icon: Users,
      title: "Self Help Group Approach Promotion",
      description: "CoSAP promotes the Self Help Group (SHG) methodology across Ethiopia, empowering women at the grassroots level. We support the formation of SHGs comprising 15-20 women from similar socioeconomic backgrounds, enabling them to save together, access credit, and build sustainable livelihoods. Our approach has reached over 347,000 women organized in more than 28,900 SHGs.",
    },
    {
      icon: Network,
      title: "Coordination",
      description: "We coordinate member organizations and stakeholders working in the field of women's empowerment and community development. Through regular meetings, forums, and joint initiatives, we ensure alignment of efforts and maximize impact across all regions where we operate.",
    },
    {
      icon: Target,
      title: "Evidence Based Advocacy",
      description: "Our advocacy work is grounded in research and data. We conduct assessments, document best practices, and use evidence to influence policy change at local, regional, and national levels. We advocate for gender equality, children's rights, and women's economic and social empowerment.",
    },
    {
      icon: BookOpen,
      title: "Capacity Building",
      description: "We build the skills and knowledge of communities, CSOs, and SHG institutions through comprehensive training programs. Our capacity building initiatives cover leadership development, financial management, business skills, and organizational development.",
    },
    {
      icon: Shield,
      title: "Safeguarding",
      description: "Protecting vulnerable groups and ensuring safety is at the core of our work. We implement safeguarding policies and procedures to protect women, children, and marginalized communities from harm, exploitation, and abuse.",
    },
    {
      icon: TrendingUp,
      title: "Resource Mobilization",
      description: "We secure funding and resources for programs that transform lives. Through partnerships with international donors, government agencies, and private sector organizations, we mobilize resources to scale up our impact across Ethiopia.",
    },
  ]

  const achievements = [
    "Mobilized the capacity of organizations to collectively voice and lobby for Gender Equality, Children Rights, women's economic & social empowerment",
    "Made strategic alignments with all stakeholders working in line with the social, economic and political empowerment of destitute women, youth and children",
    "Conducted regular monitoring/project site visits to provide on-spot capacity building, document best practices and encourage learning",
    "Successfully raised over ETB 439 million in capital through SHG savings and credit programs",
    "Established 30 Federations (Timrets) serving as apex bodies for SHG networks",
    "Created employment opportunities for thousands of women through SHG-led enterprises",
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-[#0047AB] py-20">
        <div className="w-full section-padding text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Transforming communities through the Self Help Group approach
          </p>
        </div>
      </div>

      {/* Thematic Areas Section */}
      <section className="py-20">
        <div className="w-full section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0047AB] mb-4">THEMATIC AREAS</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our work is organized around six key thematic areas that guide our efforts to empower women and transform communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {thematicAreas.map((area, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#0047AB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <area.icon size={28} className="text-[#0047AB]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{area.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{area.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements Section */}
      <section ref={statsRef} className="py-20 bg-[#0047AB]">
        <div className="w-full section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">KEY ACHIEVEMENTS</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Our impact in numbers
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl sm:text-5xl font-bold mb-2">
                  {stat.isDecimal ? counts[index].toFixed(1) : counts[index]}{stat.suffix}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements List Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-full section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0047AB] mb-4">OUR ACHIEVEMENTS</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Key milestones and accomplishments in our journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-6 rounded-xl shadow-sm">
                <CheckCircle size={24} className="text-[#0047AB] flex-shrink-0 mt-1" />
                <p className="text-gray-700">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gray-800">
        <div className="w-full section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">52</div>
              <div className="text-white/80">Member Organizations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">30</div>
              <div className="text-white/80">Federations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1,384+</div>
              <div className="text-white/80">Cluster Level Associations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">9</div>
              <div className="text-white/80">Regional States & 2 Cities</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
