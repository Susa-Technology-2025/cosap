import { useState } from 'react'
import { MapPin, Phone, Mail, Send, Facebook, Youtube, Linkedin, CheckCircle, AlertCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    
    try {
      const response = await fetch(`/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setSubmitted(true)
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' })
      } else {
        setError(data.message || 'Failed to send message. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const phoneNumbers = [
    { label: "+251 98 028 6565", href: "tel:+251980286565" },
    { label: "+251 91 125 5456", href: "tel:+251911255456" },
    { label: "+251 91 125 5653", href: "tel:+251911255653" },
  ]

  return (
    <div className="bg-white">
      <div className="bg-[#0047AB] py-20">
        <div className="w-full section-padding text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Get in touch with us for partnerships, inquiries, or to learn more about our work
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="w-full section-padding">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Consortium of Self Help Group Approach Promoters (CoSAP) is a women-led 
                and women rights, non-profit, and board-led Indigenous National Civil Society Organization.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0047AB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-[#0047AB]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                    <p className="text-gray-600">Lideta Sub City, Woreda 10, African Union Area<br />Addis Ababa, Ethiopia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0047AB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-[#0047AB]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                    <div className="space-y-2">
                      {phoneNumbers.map((phone, index) => (
                        <a 
                          key={index}
                          href={phone.href}
                          className="block px-4 py-2 bg-[#0047AB]/5 rounded-lg text-[#0047AB] font-medium hover:bg-[#0047AB] hover:text-white transition-colors"
                        >
                          {phone.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0047AB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-[#0047AB]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <a href="mailto:info@shgconsortiumeth.org" className="text-gray-600 hover:text-[#0047AB] transition-colors block">info@shgconsortiumeth.org</a>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  <a href="https://facebook.com/CoSAPEthiopia" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[#0047AB]/10 rounded-xl flex items-center justify-center text-[#0047AB] hover:bg-[#0047AB] hover:text-white transition-colors"><Facebook size={20} /></a>
                  <a href="https://www.linkedin.com/company/cosapshg/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[#0047AB]/10 rounded-xl flex items-center justify-center text-[#0047AB] hover:bg-[#0047AB] hover:text-white transition-colors"><Linkedin size={20} /></a>
                  <a href="https://x.com/CoSAPEthiopia1" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[#0047AB]/10 rounded-xl flex items-center justify-center text-[#0047AB] hover:bg-[#0047AB] hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.youtube.com/@cosap-ethiopia735" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[#0047AB]/10 rounded-xl flex items-center justify-center text-[#0047AB] hover:bg-[#0047AB] hover:text-white transition-colors"><Youtube size={20} /></a>
                  <a href="http://t.me/cosap2023" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[#0047AB]/10 rounded-xl flex items-center justify-center text-[#0047AB] hover:bg-[#0047AB] hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Send us a Message</h3>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h4>
                  <p className="text-gray-600 mb-6">Thank you for reaching out. We will get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="px-6 py-2 bg-[#0047AB] text-white rounded-lg hover:bg-[#003380] transition-colors">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
                      <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB]" />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
                      <input type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB]" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
                    <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB]" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                    <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB] resize-none" />
                  </div>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full py-3 bg-[#0047AB] text-white font-medium rounded-lg hover:bg-[#003380] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="w-full section-padding">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Us</h2>
          <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31529.406!2d38.746!3d9.005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b1f0!2sLideta%2C+Addis+Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CoSAP Office Location"
            />
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">
            Lideta Sub City, Woreda 10, African Union Area, Addis Ababa, Ethiopia
          </p>
        </div>
      </section>
    </div>
  )
}
