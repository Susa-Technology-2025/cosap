import { useEffect, useState } from 'react'

export default function LogoIntro({ onComplete }: { onComplete: () => void }) {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
      setTimeout(onComplete, 500)
    }, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="text-center">
        <div className="relative">
          <img 
            src="/cosap-logo.jpg" 
            alt="CoSAP Logo" 
            className={`w-48 h-auto mx-auto transition-all duration-1000 ${isAnimating ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
          />
          <div className={`mt-6 transition-all duration-700 delay-500 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-2xl font-bold text-[#0047AB]">CoSAP</h1>
            <p className="text-sm text-gray-500 mt-1">Consortium of Self Help Group Approach Promoters</p>
          </div>
        </div>
        <div className={`mt-8 w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden transition-opacity duration-500 delay-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full bg-[#0047AB] rounded-full animate-progress" />
        </div>
      </div>
    </div>
  )
}
