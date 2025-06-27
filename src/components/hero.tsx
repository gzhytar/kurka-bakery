import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/bread_1.jpg"
        alt="Čerstvý kváskový chléb"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block">Čerstvý</span>
            <span className="block text-orange-400">kváskový chléb</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Pečeme s láskou každé úterý a pátek. 
            Tradiční řemeslo, přírodní suroviny.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto">
                Prohlédnout obchod
              </Button>
            </Link>
            <Link href="/o-nas">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-gray-900">
                Náš příběh
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 