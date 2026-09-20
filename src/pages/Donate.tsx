import { useState, useEffect } from 'react'
import { Check, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'

type DonationAmount = 10000 | 20000 | 50000 | 100000 | 'custom'

// API base URL - change this for production
const API_BASE = import.meta.env.VITE_API_URL || ''

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<DonationAmount | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'Ethiopia',
    phone: '',
    email: '',
    additionalInfo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle')
  const [paymentDetails, setPaymentDetails] = useState({ tx_ref: '', amount: '' })

  // Check URL params for payment return status
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const status = params.get('status')
    const tx_ref = params.get('tx_ref')
    const amount = params.get('amount')
    const message = params.get('message')

    if (status === 'success') {
      setPaymentStatus('success')
      if (tx_ref) setPaymentDetails(prev => ({ ...prev, tx_ref, amount: amount || '' }))
    } else if (status === 'failed') {
      setPaymentStatus('failed')
      if (message) setError(decodeURIComponent(message))
    }
  }, [])

  const amounts: { value: DonationAmount; label: string }[] = [
    { value: 10000, label: 'ETB 10,000' },
    { value: 20000, label: 'ETB 20,000' },
    { value: 50000, label: 'ETB 50,000' },
    { value: 100000, label: 'ETB 100,000' },
  ]

  const getFinalAmount = () => {
    if (selectedAmount === 'custom') return customAmount ? parseInt(customAmount) : 0
    return selectedAmount || 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const amount = getFinalAmount()

      // Call the backend API to initialize Chapa payment
      const response = await fetch(`${API_BASE}/api/chapa/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phone,
          customization: {
            title: 'Donation to CoSAP',
            description: formData.additionalInfo || `Donation of ETB ${amount.toLocaleString()} to support women empowerment in Ethiopia`,
          }
        })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Payment initialization failed')
      }

      // Redirect to Chapa checkout URL
      if (data.data?.checkout_url) {
        window.location.href = data.data.checkout_url
      } else {
        throw new Error('No checkout URL received')
      }

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      setIsSubmitting(false)
    }
  }

  // Payment Success State (returned from Chapa)
  if (paymentStatus === 'success') {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-[#0047AB] py-20">
          <div className="w-full section-padding text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Thank You!</h1>
            <p className="text-xl text-white/80">Your donation makes a real difference</p>
          </div>
        </div>
        <div className="w-full section-padding py-16">
          <div className="max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your donation of <strong>ETB {parseInt(paymentDetails.amount || '0').toLocaleString()}</strong> has been received.
            </p>
            <p className="text-gray-500 text-sm mb-2">
              Transaction Reference: <code className="bg-white px-2 py-1 rounded text-xs">{paymentDetails.tx_ref}</code>
            </p>
            <p className="text-gray-500 text-sm mb-6">
              A receipt has been sent to your email. Your contribution will help empower women across Ethiopia through the Self Help Group approach.
            </p>
            <button
              onClick={() => {
                setPaymentStatus('idle')
                window.history.replaceState({}, '', '/#/donate')
              }}
              className="px-8 py-3 bg-[#0047AB] text-white font-medium rounded-full hover:bg-[#003380] transition-colors mr-3"
            >
              Donate Again
            </button>
            <a
              href="/#/"
              className="inline-flex items-center gap-2 px-8 py-3 border border-[#0047AB] text-[#0047AB] font-medium rounded-full hover:bg-[#0047AB]/5 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Payment Failed State (returned from Chapa)
  if (paymentStatus === 'failed') {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-[#0047AB] py-20">
          <div className="w-full section-padding text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Donation</h1>
            <p className="text-xl text-white/80">Something went wrong</p>
          </div>
        </div>
        <div className="w-full section-padding py-16">
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">
              {error || 'We were unable to process your payment. Please try again.'}
            </p>
            <button
              onClick={() => {
                setPaymentStatus('idle')
                setError('')
                window.history.replaceState({}, '', '/#/donate')
              }}
              className="px-8 py-3 bg-[#0047AB] text-white font-medium rounded-full hover:bg-[#003380] transition-colors mr-3"
            >
              Try Again
            </button>
            <a
              href="/#/contact"
              className="inline-flex items-center gap-2 px-8 py-3 border border-[#0047AB] text-[#0047AB] font-medium rounded-full hover:bg-[#0047AB]/5 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    )
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
        <div className="max-w-3xl mx-auto">
          {/* Amount Selection */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Donation Amount</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {amounts.map((amt) => (
                <button
                  key={amt.value}
                  onClick={() => { setSelectedAmount(amt.value); setError('') }}
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
              onClick={() => { setSelectedAmount('custom'); setError('') }}
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

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium text-sm">Payment Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Donation Form */}
          {selectedAmount && (
            <div className="bg-gray-50 rounded-2xl p-8 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Your Information</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Country / Region <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB]"
                  >
                    <option>Ethiopia</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>Sweden</option>
                    <option>Norway</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Phone (optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB]"
                    placeholder="+251..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email address (optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Additional information</label>
                  <textarea
                    rows={3}
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0047AB] resize-none"
                  />
                </div>

                {/* Donation Summary */}
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Your Donation</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Donation Amount</span>
                      <span className="font-medium">ETB {getFinalAmount().toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-[#0047AB]">ETB {getFinalAmount().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Chapa Payment Info */}
                <div className="bg-[#0047AB]/5 p-4 rounded-xl border border-[#0047AB]/20">
                  <p className="text-sm text-gray-600">
                    <strong>Payment Method:</strong> Chapa Secure Checkout
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Pay using Telebirr, CBE Birr, ATM, Bank account, Mobile money, PayPal, Debit and Credit card. You will be redirected to Chapa's secure payment page.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || getFinalAmount() <= 0}
                  className="w-full py-4 bg-[#0047AB] text-white font-medium rounded-lg hover:bg-[#003380] transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Proceed to Pay ETB {getFinalAmount().toLocaleString()}</>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* How Donations Help */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">How Your Donation Helps</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { amount: 'ETB 1,000', impact: 'Provides training materials for 5 SHG members' },
                { amount: 'ETB 5,000', impact: 'Funds a community facilitator for one month' },
                { amount: 'ETB 10,000', impact: 'Supports a Cluster Level Association workshop' },
                { amount: 'ETB 50,000', impact: 'Enables a full federation capacity building program' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-gray-100">
                  <p className="font-semibold text-[#0047AB]">{item.amount}</p>
                  <p className="text-gray-600 text-sm">{item.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
