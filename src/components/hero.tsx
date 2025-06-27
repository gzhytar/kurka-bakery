import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
      <Image
        src="/bread_1.jpg"
        alt="Čerstvý kváskový chléb"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="mb-6">
            <Image
              src="/logo.jpg"
              alt="Vypečená Kůrka Logo"
              width={80}
              height={80}
              className="rounded-full mb-4"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Vypečená Kůrka
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Tradiční kváskový chléb pečený s láskou v Brně
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Prohlédnout nabídku
              </Button>
            </Link>
            <Link href="/o-nas">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                Náš příběh
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 