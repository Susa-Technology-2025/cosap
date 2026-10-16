import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOConfig {
  title: string
  description: string
  keywords?: string
}

const SEO_BY_PATH: Record<string, SEOConfig> = {
  '/': {
    title: 'CoSAP Ethiopia | Consortium of Self Help Group Approach Promoters',
    description: "CoSAP Ethiopia is an umbrella NGO empowering communities through the Self Help Group (SHG) approach. We promote women's economic empowerment, gender equality, and sustainable livelihoods across Ethiopia. Donate or become a member today.",
    keywords: 'CoSAP, Self Help Group, SHG Ethiopia, women empowerment, NGO Ethiopia, community development, donate Ethiopia',
  },
  '/about': {
    title: 'About Us | CoSAP Ethiopia',
    description: "Learn about CoSAP Ethiopia — our mission, vision, values, governance, board of directors, federations, and the team behind the Consortium of Self Help Group Approach Promoters working to empower Ethiopian communities.",
    keywords: 'about CoSAP, CoSAP mission, CoSAP vision, CoSAP team, CoSAP governance, CoSAP board, CoSAP federations',
  },
  '/our-work': {
    title: 'Our Work | CoSAP Ethiopia',
    description: "Explore CoSAP Ethiopia's programs: Self Help Group (SHG) formation, Cluster Level Associations (CLAs), women's economic empowerment, gender equality, GBV prevention, and livelihoods support.",
    keywords: 'CoSAP programs, SHG programs, CLA, women empowerment programs, GBV prevention Ethiopia',
  },
  '/stories-news': {
    title: 'Stories & News | CoSAP Ethiopia',
    description: "Read the latest news, success stories, and impact reports from CoSAP Ethiopia's Self Help Group (SHG) programs empowering women and communities across Ethiopia.",
    keywords: 'CoSAP news, SHG success stories, Ethiopia women stories, CoSAP impact, CoSAP newsletter',
  },
  '/resources': {
    title: 'Documentation & Resources | CoSAP Ethiopia',
    description: "Download CoSAP's policy briefs, annual reports, training manuals, organizational documents, and research publications on the Self Help Group approach and women's empowerment in Ethiopia.",
    keywords: 'CoSAP resources, policy briefs, annual reports, SHG manual, training materials, CoSAP publications',
  },
  '/contact': {
    title: 'Contact Us | CoSAP Ethiopia',
    description: 'Contact CoSAP Ethiopia — Consortium of Self Help Group Approach Promoters. Reach us at info@shgconsortiumeth.org or +251 98 028 6565. Office in Addis Ababa, Ethiopia.',
    keywords: 'contact CoSAP, CoSAP email, CoSAP phone, CoSAP address, CoSAP Ethiopia contact',
  },
  '/donate': {
    title: 'Donate | CoSAP Ethiopia',
    description: "Support CoSAP Ethiopia's mission to empower women and communities through the Self Help Group (SHG) approach. Donate via bank transfer — every contribution transforms lives.",
    keywords: 'donate CoSAP, donate Ethiopia, support SHG, bank donation, women empowerment donate',
  },
}

const DEFAULT_SEO: SEOConfig = SEO_BY_PATH['/']

export function useSEO() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    const config = SEO_BY_PATH[path] || DEFAULT_SEO

    document.title = config.title

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', config.description)

    if (config.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', config.keywords)
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', config.title)
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', config.description)

    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', config.title)
    const twitterDesc = document.querySelector('meta[name="twitter:description"]')
    if (twitterDesc) twitterDesc.setAttribute('content', config.description)

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      const base = canonical.getAttribute('href')?.split('#')[0] || 'https://shgconsortiumeth.org/'
      canonical.setAttribute('href', path === '/' ? base : `${base}${path.substring(1)}`)
    }

    window.scrollTo(0, 0)
  }, [location.pathname])
}
