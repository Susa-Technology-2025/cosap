import { Facebook, Youtube, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-8 bg-gray-950 text-white border-t border-white/10">
      <div className="w-full section-padding">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/cosap-logo.jpg" alt="CoSAP Logo" className="h-10 w-auto" />
            <span className="text-gray-400">CoSAP Ethiopia</span>
          </div>

          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Consortium of Self Help Group Approach Promoters (CoSAP). All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://facebook.com/CoSAPEthiopia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://www.linkedin.com/company/cosapshg/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://x.com/CoSAPEthiopia1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@cosap-ethiopia735" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
            <a href="http://t.me/cosap2023" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
