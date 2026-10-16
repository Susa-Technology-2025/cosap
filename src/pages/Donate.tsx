import { useState, useEffect } from 'react'
import { Check, Copy, Banknote, Building2, Globe, Mail, Phone, MapPin } from 'lucide-react'

type DonationAmount = 1000 | 5000 | 10000 | 50000 | 'custom'

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<DonationAmount | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  // Sync hash route so that ?status=success / ?status=failed from old Chapa links don't break
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('status')) {
      // Clean URL since we no longer use Chapa
      window.history.replaceState({}, '', '/#/donate')
    }
  }, [])

  const amounts: { value: DonationAmount; label: string }[] = [
    { value: 1000, label: 'ETB 1,000' },
    { value: 5000, label: 'ETB 5,000' },
    { value: 10000, label: 'ETB 10,000' },
    { value: 50000, label: 'ETB 50,000' },
  ]

  const impactLevels = [
    { amount: 'ETB 1,000', impact: 'Provides training materials for 5 SHG members' },
    { amount: 'ETB 5,000', impact: 'Funds a community facilitator for one month' },
    { amount: 'ETB 10,000', impact: 'Supports a Cluster Level Association workshop' },
    { amount: 'ETB 50,000', impact: 'Enables a full federation capacity building program' },
  ]

  const getFinalAmount = () => {
    if (selectedAmount === 'custom') return customAmount ? parseInt(customAmount) : 0
    return selectedAmount || 0
  }

  const bankAccounts = [
    {
      bank: 'Commercial Bank of Ethiopia',
      swift: 'CBETETAA',
      account: '1000190057376',
      currency: 'Ethiopian Birr (ETB)',
      logo: '🏦',
      color: 'bg-orange-50 border-orange-200',
      labelColor: 'text-orange-700'
    },
    {
      bank: 'Dashen Bank (ETB Account)',
      swift: 'DASHETAA',
      account: '5010664415011',
      currency: 'Ethiopian Birr (ETB)',
      logo: '🏦',
      color: 'bg-blue-50 border-blue-200',
      labelColor: 'text-blue-700'
    },
    {
      bank: 'Dashen Bank (USD Account)',
      swift: 'DASHETAA',
      account: '5010664415012',
      currency: 'USD ($)',
      logo: '🏦',
      color: 'bg-green-50 border-green-200',
      labelColor: 'text-green-700'
    },
    {
      bank: 'Awash Bank (ETB Account)',
      swift: 'AWINETAA',
      account: '01320188264100',
      currency: 'Ethiopian Birr (ETB)',
      logo: '🏦',
      color: 'bg-purple-50 border-purple-200',
      labelColor: 'text-purple-700'
    },
    {
      bank: 'Awash Bank (EUR Account)',
      swift: 'AWINETAA',
      account: '223090188264100',
      currency: 'EURO (€)',
      logo: '🏦',
      color: 'bg-indigo-50 border-indigo-200',
      labelColor: 'text-indigo-700'
    },
  ]

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(id)
      setTimeout(() => setCopiedAccount(null), 2000)
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedAccount(id)
      setTimeout(() => setCopiedAccount(null), 2000)
    })
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-[#0047AB] py-20">
        <div className="w-full section-padding text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Donate to CoSAP</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your contribution helps us empower women and transform communities across Ethiopia
          </p>
        </div>
      </div>

      <div className="w-full section-padding py-16">
        <div className="max-w-5xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-12">
            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
              CoSAP relies on the generosity of donors to continue empowering women and communities
              across Ethiopia through the Self Help Group (SHG) approach. Every contribution — large
              or small — directly supports training, capacity building, and sustainable livelihoods
              for thousands of women. Please use any of the bank accounts below to make your donation.
            </p>
          </div>

          {/* Amount Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Select Donation Amount</h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              Choose an amount to see how your donation helps CoSAP's mission
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {amounts.map((amt) => (
                <button
                  key={amt.value}
                  onClick={() => { setSelectedAmount(amt.value); setCustomAmount('') }}
                  className={`p-6 rounded-xl border-2 text-center font-semibold transition-all ${
                    selectedAmount === amt.value
                      ? 'border-[#0047AB] bg-[#0047AB]/5 text-[#0047AB]'
                      : 'border-gray-200 hover:border-[#0047AB]/30'
                  }`}
                >
                  <span className="text-lg">{amt.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedAmount('custom')}
              className={`w-full p-4 rounded-xl border-2 text-center transition-all ${
                selectedAmount === 'custom'
                  ? 'border-[#0047AB] bg-[#0047AB]/5 text-[#0047AB]'
                  : 'border-gray-200 hover:border-[#0047AB]/30'
              }`}
            >
              Custom Amount
            </button>
            {selectedAmount === 'custom' && (
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount in ETB"
                className="w-full mt-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB]"
              />
            )}
          </div>

          {/* Selected amount summary */}
          {selectedAmount && getFinalAmount() > 0 && (
            <div className="mb-12 bg-[#0047AB]/5 border border-[#0047AB]/20 rounded-2xl p-6 text-center animate-fade-in">
              <p className="text-gray-600 text-sm">You are donating</p>
              <p className="text-3xl font-bold text-[#0047AB] my-2">
                ETB {getFinalAmount().toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">to support women empowerment in Ethiopia</p>
            </div>
          )}

          {/* How Your Donation Helps — UNIFIED with selection */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">How Your Donation Helps</h3>
            <p className="text-gray-500 text-sm mb-6">
              The amounts below match the selection above — see the impact of each donation level
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {impactLevels.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedAmount === item.amount.replace(/\D/g, '').replace(/^0+/, '') as unknown as number * 1000
                      ? 'border-[#0047AB] bg-[#0047AB]/5'
                      : 'border-gray-200 bg-white hover:border-[#0047AB]/30'
                  }`}
                  onClick={() => {
                    const amt = parseInt(item.amount.replace(/\D/g, ''))
                    setSelectedAmount(amt as DonationAmount)
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-[#0047AB]">{item.amount}</p>
                    {selectedAmount === parseInt(item.amount.replace(/\D/g, '') as unknown as string) as unknown as DonationAmount && (
                      <Check size={18} className="text-[#0047AB]" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{item.impact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bank Account Information */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Bank Account Details</h2>
              <p className="text-gray-600">
                Please use any of the following bank accounts to make your donation to CoSAP Ethiopia.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                For international transfers, please include the SWIFT code and notify us at
                <a href="mailto:info@shgconsortiumeth.org" className="text-[#0047AB] hover:underline ml-1 font-medium">
                  info@shgconsortiumeth.org
                </a> after sending.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {bankAccounts.map((acct, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border-2 p-6 ${acct.color}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{acct.logo}</span>
                      <div>
                        <h3 className="font-bold text-gray-800 leading-tight">{acct.bank}</h3>
                        <p className={`text-xs font-semibold uppercase tracking-wide mt-1 ${acct.labelColor}`}>
                          {acct.currency}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Account Number</p>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                        <code className="text-gray-800 font-mono font-semibold tracking-wider">{acct.account}</code>
                        <button
                          onClick={() => copyToClipboard(acct.account, `acct-${index}`)}
                          className="text-[#0047AB] hover:bg-[#0047AB]/10 rounded-md p-1.5 transition-colors"
                          title="Copy account number"
                          aria-label="Copy account number"
                        >
                          {copiedAccount === `acct-${index}` ? (
                            <Check size={16} className="text-green-600" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">SWIFT Code</p>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                        <code className="text-gray-800 font-mono font-semibold tracking-wider">{acct.swift}</code>
                        <button
                          onClick={() => copyToClipboard(acct.swift, `swift-${index}`)}
                          className="text-[#0047AB] hover:bg-[#0047AB]/10 rounded-md p-1.5 transition-colors"
                          title="Copy SWIFT code"
                          aria-label="Copy SWIFT code"
                        >
                          {copiedAccount === `swift-${index}` ? (
                            <Check size={16} className="text-green-600" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Beneficiary Info */}
            <div className="mt-8 bg-[#0047AB] text-white rounded-2xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Building2 size={20} /> Beneficiary Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Account Name</p>
                  <p className="font-medium">Consortium of Self Help Group Approach Promoters (CoSAP)</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Registration Number</p>
                  <p className="font-medium">1590</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Country</p>
                  <p className="font-medium">Ethiopia</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Address</p>
                  <p className="font-medium">Bole, Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Instructions */}
          <div className="mb-12 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">How to Donate</h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-[#0047AB] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span className="pt-0.5">Choose your preferred bank account from the list above (based on the currency you wish to donate in).</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-[#0047AB] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span className="pt-0.5">Visit your bank (in person or via online banking) and initiate a transfer to CoSAP's account.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-[#0047AB] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span className="pt-0.5">For international transfers, please use the SWIFT code provided. Local Ethiopian transfers may only require the account number.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-[#0047AB] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <span className="pt-0.5">
                  After sending your donation, please notify us at
                  <a href="mailto:info@shgconsortiumeth.org" className="text-[#0047AB] hover:underline font-medium mx-1">
                    info@shgconsortiumeth.org
                  </a>
                  with the transfer receipt so we can acknowledge your contribution.
                </span>
              </li>
            </ol>
          </div>

          {/* Contact for Donations */}
          <div className="bg-[#0047AB] rounded-2xl p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-3">Questions About Donating?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Our team is happy to help with any questions about your donation, tax receipts, or
              partnership opportunities. Reach out to us using the contact details below.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm">
              <a href="mailto:info@shgconsortiumeth.org" className="bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-4 flex flex-col items-center gap-2">
                <Mail size={24} />
                <span className="font-medium">Email</span>
                <span className="text-white/70 text-xs break-all">info@shgconsortiumeth.org</span>
              </a>
              <a href="tel:+251980286565" className="bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-4 flex flex-col items-center gap-2">
                <Phone size={24} />
                <span className="font-medium">Phone</span>
                <span className="text-white/70 text-xs">+251 98 028 6565</span>
              </a>
              <div className="bg-white/10 rounded-xl p-4 flex flex-col items-center gap-2">
                <MapPin size={24} />
                <span className="font-medium">Office</span>
                <span className="text-white/70 text-xs">Bole, Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <Banknote size={16} />
              CoSAP is a registered Ethiopian NGO (Reg. No. 1590). All donations are used to support
              women's empowerment through the Self Help Group approach.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
