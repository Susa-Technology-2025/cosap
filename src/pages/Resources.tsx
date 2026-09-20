import { FileText, Download, BookOpen, Target, Shield, FolderOpen, Newspaper, FileSpreadsheet, ScrollText } from 'lucide-react'

export default function Resources() {
  const resourceCategories = [
    {
      title: "Organizational Documents",
      icon: FolderOpen,
      description: "Official documents including registration certificates, bylaws, and governance documents that establish CoSAP's legal framework and operational guidelines.",
      items: [
        { name: "CoSAP Registration Certificate", size: "2.5 MB", url: "#" },
        { name: "Organizational Bylaws", size: "1.8 MB", url: "#" },
        { name: "Code of Conduct", size: "850 KB", url: "#" },
        { name: "Board Members Profile", size: "1.2 MB", url: "#" },
      ]
    },
    {
      title: "Policy Briefs",
      icon: ScrollText,
      description: "Policy briefs and position papers produced by CoSAP on gender equality, gender-based violence prevention, legal protections, and women's participation in Ethiopia's national dialogue. Available in English and Amharic.",
      items: [
        { name: "Advancing Legal Protections for Female Domestic Workers (English)", size: "2.8 MB", url: "/policy-briefs/advancing-legal-protections-female-domestic-workers.pdf" },
        { name: "Evidence-Based Anti-GBV Advocacy Documentation (English)", size: "3.5 MB", url: "/policy-briefs/anti-gbv-evidence-based-advocacy-documentation.pdf" },
        { name: "Elevated Policy Brief 3 (English)", size: "1.6 MB", url: "/policy-briefs/elevated-policy-brief-3.pdf" },
        { name: "Gendered Legal & Policy Analysis Manual (English)", size: "2.9 MB", url: "/policy-briefs/gendered-legal-policy-analysis-manual-english.pdf" },
        { name: "Turning Evidence into Policy (Amharic)", size: "7.8 MB", url: "/policy-briefs/evidence-to-policy.pdf" },
        { name: "Gender-Responsive Legal & Policy Analysis Manual (Amharic)", size: "2.8 MB", url: "/policy-briefs/gender-legal-policy-analysis-manual.pdf" },
        { name: "Evidence-Based GBV Position Paper (Amharic)", size: "3.4 MB", url: "/policy-briefs/evidence-based-gbv-position-paper.pdf" },
        { name: "Women's Participation in Ethiopia's National Dialogue (Amharic)", size: "1.6 MB", url: "/policy-briefs/women-national-dialogue-participation.pdf" },
      ]
    },
    {
      title: "Annual Reports",
      icon: FileSpreadsheet,
      description: "Comprehensive annual reports documenting our activities, achievements, financial statements, and organizational growth over the years.",
      items: [
        { name: "Annual Report 2014 (2006 E.C)", size: "2.5 MB", url: "/reports/annual-report-2014.pdf" },
        { name: "Annual Report 2012 (2004 E.C)", size: "1.7 MB", url: "/reports/annual-report-2012.pdf" },
        { name: "Annual Report 2011 (2003 E.C)", size: "1.0 MB", url: "/reports/annual-report-2011.pdf" },
      ]
    },
    {
      title: "Publications",
      icon: Newspaper,
      description: "Research papers, assessment reports, newsletters, and publications on SHG approach and women's empowerment in Ethiopia.",
      items: [
        { name: "Ras Agez Newsletter - January to March 2025", size: "772 KB", url: "/reports/ras-agez-newsletter-jan-mar-2025.pdf" },
        { name: "Ras Agez Newsletter - Jan-Jun 2025", size: "4.2 MB", url: "/reports/ras-agez-newsletter-2025.pdf" },
        { name: "Newsletter - July to December 2024", size: "3.8 MB", url: "/reports/newsletter-july-dec-2024.pdf" },
        { name: "Impact Assessment Report 2024", size: "3.2 MB", url: "#" },
        { name: "Baseline Study Report", size: "2.8 MB", url: "#" },
        { name: "Gender Analysis Report", size: "1.5 MB", url: "#" },
      ]
    },
    {
      title: "Manuals & Training Materials",
      icon: Target,
      description: "Training manuals, guides, and educational resources for SHG facilitators, community workers, and member organizations. These materials are sourced from our official resource library.",
      items: [
        { name: "The Self Help Group Approach Manual", size: "PDF", url: "https://shgconsortiumeth.org/index.php/documents/training-materials/summary/6-training-material/19-the-self-help-group-approach-manual" },
        { name: "A Handbook on Forming Self-Help Groups (SHGs)", size: "PDF", url: "https://shgconsortiumeth.org/index.php/documents/training-materials/summary/6-training-material/20-a-handbook-on-forming-self-help-groups-shgs" },
        { name: "CLA Facilitator Manual - Training the CLAs", size: "PDF", url: "https://shgconsortiumeth.org/index.php/documents/training-materials/summary/6-training-material/21-a-manual-for-facilitators-on-children-s-groups-manual-1-training-the-clas" },
        { name: "CLA Training Manual", size: "PDF", url: "https://shgconsortiumeth.org/index.php/documents/training-materials/summary/6-training-material/22-cla-training-manual" },
      ]
    },
    {
      title: "Policies & Guidelines",
      icon: Shield,
      description: "Organizational policies and guidelines ensuring ethical operations, safeguarding, and compliance with international standards.",
      items: [
        { name: "Safeguarding Policy", size: "1.2 MB", url: "#" },
        { name: "Gender Policy", size: "980 KB", url: "#" },
        { name: "Child Protection Policy", size: "1.1 MB", url: "#" },
        { name: "Anti-Corruption Policy", size: "850 KB", url: "#" },
        { name: "Resource Mobilization Policy", size: "720 KB", url: "#" },
      ]
    },
    {
      title: "Membership Documents",
      icon: BookOpen,
      description: "Forms and information sheets for organizations interested in becoming members of CoSAP.",
      items: [
        { name: "CoSAP Membership Form (2026)", size: "450 KB", url: "/reports/cosap-membership-form-2026.docx" },
        { name: "SHG Approach Info Collection Sheet", size: "380 KB", url: "/reports/shg-approach-info-collection.doc" },
        { name: "Membership Guidelines", size: "650 KB", url: "#" },
      ]
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-[#0047AB] py-20">
        <div className="w-full section-padding text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentation & Resources</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Access our publications, reports, training materials, and organizational documents
          </p>
        </div>
      </div>

      {/* Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="w-full section-padding max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-lg">
            CoSAP produces a wide range of publications and resources to support the promotion of the Self Help Group approach, 
            share best practices, and provide guidance to member organizations and stakeholders. Browse our collection below 
            and download the resources you need.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="w-full section-padding">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {resourceCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-[#0047AB]/10 rounded-xl flex items-center justify-center">
                    <category.icon size={28} className="text-[#0047AB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{category.title}</h2>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i}>
                      <a 
                        href={item.url}
                        {...(item.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}
                        className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-[#0047AB]" />
                          <span className="text-gray-700 font-medium group-hover:text-[#0047AB] transition-colors text-sm">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">{item.size}</span>
                          <Download size={18} className="text-[#0047AB]" />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for More */}
      <section className="py-16 bg-gray-50">
        <div className="w-full section-padding text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Need More Information?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            If you need additional documents, have specific requests, or would like to request hard copies of any publication, 
            please don't hesitate to contact us.
          </p>
          <a 
            href="mailto:info@shgconsortiumeth.org"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0047AB] text-white font-medium rounded-full hover:bg-[#003380] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}
