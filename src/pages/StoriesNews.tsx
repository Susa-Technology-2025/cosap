import { useState } from 'react'
import { Calendar, User, ArrowRight, X, Send } from 'lucide-react'

export default function StoriesNews() {
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null)

  const stories = [
    {
      title: "Peer-Led Change for Women Workers",
      excerpt: "In Asella town, many female factory workers faced challenges due to limited awareness of their labor rights and lack of safe spaces to speak up. NBCDC introduced a peer-led approach under the EU CSF+ program.",
      image: "/success-peer-led.jpg",
      date: "April 15, 2025",
      author: "NBCDC",
      category: "Success Story",
      fullContent: `In Asella town, many female factory workers faced challenges due to limited awareness of their labor rights and lack of safe spaces to speak up. To address this, New Bright Community Development Center (NBCDC) introduced a peer-led approach under the EU CSF+ program.

Instead of relying only on external trainings, selected female workers were trained as peer educators. They shared knowledge on labor rights, facilitated discussions, and connected colleagues to support systems such as safe spaces and labor unions.

This approach reached hundreds of women and encouraged many to actively engage in workplace discussions, report concerns, and participate in unions. Safe spaces became important platforms for sharing experiences and seeking support.

"This project showed us that when women are given the tools and the space to lead, they don't just improve their own lives—they transform their workplaces."
— NBCDC Project Coordinator`
    },
    {
      title: "Burka Galana CoP - School Project Success",
      excerpt: "Burka Harbu Elementary School struggled with inadequate sanitation facilities, forcing boys and girls to share latrines. The Burka Galana Community of Practice raised this concern and secured a matching fund of 300,000 ETB from DEC.",
      image: "/burka-school.jpg",
      date: "February 28, 2025",
      author: "CoSAP Team",
      category: "Success Story",
      fullContent: `Burka Harbu Elementary School struggled with inadequate sanitation facilities, forcing boys and girls to share latrines. The Burka Galana Community of Practice raised this concern and secured a matching fund of 300,000 ETB from DEC.

In just three months, they constructed a new separate latrine with six stalls for female students and renovated four classrooms. Female students now use safe facilities without fear, improving their attendance and overall school experience.`
    },
    {
      title: "Burka Galana Bakery Business Launch",
      excerpt: "In 2025, the Burka Galana CoP secured 1,033,000 ETB from DEC to launch a bakery business in Birbirsa Siiba kebele. The bakery now produces 1,350 pieces of bread daily, sold at 10 ETB each.",
      image: "/burka-bakery.jpg",
      date: "January 20, 2025",
      author: "CoSAP Team",
      category: "Success Story",
      fullContent: `In 2025, to support the long-term sustainability of the Burka Galana Community of Practice (CoP), members successfully secured 1,033,000 Ethiopian birr (one million and thirty-three thousand) in funding from the Development Expertise Center (DEC) to launch a small-scale bakery business in their area. With this support, they constructed a bakery in Birbirsa Siiba kebele, purchased baking machinery, and acquired all necessary accessories. However, the lack of electricity access—which persisted for over two months—became a major obstacle, delaying the start of operations in Holeta town. CoP members made repeated appeals to the Holeta electricity utility office, urging them to resolve the issue and supply power. Despite their persistent lobbying, the utility office failed to respond in a timely manner. In response, the CoP formally reported the matter to the Holeta Mayor's office, which promptly intervened. The Mayor urged the head of the utility office to expedite the restoration of electricity to the Burka Galana Bakery. Following this escalation, electricity services were finally restored, and the CoP has now officially begun bread production, providing essential services to the local population.

According to Mr. Milkessa Abdo, leader of the Burka Galana CoP, the bakery is not intended for personal or organizational profit. Instead, it is a voluntary initiative aimed at providing the community with affordable, high-quality bread. The bakery now produces 1,350 pieces of bread per day, each weighing 110 grams, using one quintal (100 kg) of flour daily. Each piece of the bread is sold at a reasonable price of 10 ETB, making it accessible to all, especially low-income households.

Additionally, the bakery has created employment opportunities for four CoP members and one professional baker from the community, contributing to local job creation. The residents of Birbirsa Siiba kebele have expressed their appreciation, noting that no bakery previously existed in the area. For many, especially those from economically disadvantaged backgrounds, access to nutritious, affordable bread has been a transformative improvement in their daily lives.

In closing, Mr. Milkessa extended heartfelt thanks to DEC and CoSAP for their generous support and for enabling the CoP to continue its mission of community empowerment and sustainable development.`
    },
    {
      title: "Mrs. Sukare Shanko - From Poverty to Prosperity",
      excerpt: "Mrs. Sukare is a 30-year-old woman with four children from Wollega, Hababo Guduru Woreda. Her livelihood was based on farming over her small plot of land. After joining the SHG called 'Kena', she transformed her life through savings and access to credit.",
      image: "",
      date: "March 15, 2025",
      author: "CoSAP Team",
      category: "Success Story",
      fullContent: `Mrs. Sukare is a 30-year-old woman with four children from Wollega, Hababo Guduru Woreda. Her livelihood was based on farming over her small plot of land. Due to the small income, she was unable to meet all her family needs. After joining the SHG called 'Kena' established by Gurmuu's support, she transformed her life through savings and access to credit. Today, she runs a successful small business and has become a beacon of hope in her community.`
    },
    {
      title: "From Borrowing Flour to Building a Better Future",
      excerpt: "When Haimanot Woldie lost her husband, she was left alone to raise two young children with no stable income. She began baking and selling injera, even borrowing her first bag of teff flour just to get started. Her life reached a turning point when she joined a Self-Help Group.",
      image: "/success-haimanot.jpg",
      date: "June 1, 2025",
      author: "CoSAP Team",
      category: "Success Story",
      fullContent: `When Haimanot Woldie lost her husband, she was left alone to raise two young children with no stable income. To survive, she began baking and selling injera, even borrowing her very first bag of teff flour from a local mill just to get started. Her life reached a turning point when she joined a local Self-Help Group (SHG). As the first member to take out an SHG loan, Haimanot injected much-needed capital into her injera business.

Through the group's financial support and various capacity-building trainings, her income grew, her confidence surged, and she later expanded her livelihood by launching a successful tent rental business. Today, Haimanot is a thriving entrepreneur who has successfully raised her children and stepped into a powerful new role as a community advocate for women's rights.

"The SHG did not only give me loans; it gave me confidence, knowledge, and courage to stand and speak. I learned that empowerment begins when a woman starts believing that her voice has value." — Haimanot Woldie`
    },
    {
      title: "The Voice That Rose from Silence",
      excerpt: "For years, Meseret lived quietly, gripped by shyness and lacking confidence. When she joined her Self-Help Group in 2009, her journey began with a weekly saving of just 5 Birr. Today, she serves as Secretary and Board Member of the Yitawok Federation.",
      image: "/success-meseret.jpg",
      date: "June 1, 2025",
      author: "CoSAP Team",
      category: "Success Story",
      fullContent: `For years, Meseret lived quietly, gripped by shyness and lacking the confidence to speak in public or participate in community discussions. When she joined her Self-Help Group (SHG) in 2009, her journey began with a weekly saving of just 5 Birr. Through regular SHG meetings, financial literacy, and leadership training, Meseret experienced both an economic and social transformation.

She secured loans to launch a poultry business, building financial independence for her family. More importantly, the woman who once struggled to speak out blossomed into a powerful community leader. Today, Meseret serves as the Secretary and Board Member of the Yitawok Federation. No longer on the sidelines, she has set her sights on a bigger dream: running for parliament to ensure grassroots women's voices are represented at the highest level of policy-making.

"I started with silence and 5 birr in savings. But step by step, the SHG taught me that progress starts with believing in yourself. Today, I stand with confidence, leadership, and a dream to represent women whose voices are still unheard." — Meseret Asefa`
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-[#0047AB] py-20">
        <div className="w-full section-padding text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Stories & News</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Success stories and latest updates from our work
          </p>
        </div>
      </div>

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="w-full section-padding">
          <h2 className="text-3xl font-bold text-[#0047AB] mb-8">Success Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                {story.image && (
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                {!story.image && (
                  <div className="h-56 bg-gradient-to-br from-[#0047AB] to-[#003380] flex items-center justify-center">
                    <span className="text-white text-lg font-medium">Success Story</span>
                  </div>
                )}
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-[#0047AB]/10 text-[#0047AB] text-sm font-medium rounded-full mb-3">
                    {story.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-[#0047AB] transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{story.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {story.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {story.author}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedStory(story)}
                    className="inline-flex items-center gap-2 text-[#0047AB] font-medium hover:gap-3 transition-all"
                  >
                    Read Full Story <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Telegram Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full section-padding text-center">
          <h2 className="text-3xl font-bold text-[#0047AB] mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join our Telegram channel for the latest news, updates, and announcements from CoSAP.
          </p>
          <a 
            href="http://t.me/cosap2023"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#0088cc] text-white font-medium rounded-full hover:bg-[#0077b3] transition-colors text-lg"
          >
            <Send size={24} />
            Join Our Telegram Channel
          </a>
        </div>
      </section>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-3xl max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">{selectedStory.title}</h3>
              <button 
                onClick={() => setSelectedStory(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {selectedStory.image ? (
                <img 
                  src={selectedStory.image} 
                  alt={selectedStory.title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-[#0047AB] to-[#003380] rounded-xl mb-6 flex items-center justify-center">
                  <span className="text-white text-xl font-medium">Success Story</span>
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {selectedStory.date}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {selectedStory.author}
                </span>
              </div>
              <div className="prose prose-lg max-w-none">
                {selectedStory.fullContent.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
