'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Hero } from '@/components/hero'
import { BreadCard } from '@/components/bread-card'
import { DateRadioGroup } from '@/components/date-radio-group'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Clock, Wheat, MapPin } from 'lucide-react'
import { formatPrice, getNextBakeDays } from '@/lib/utils'
import type { ProductWithStock } from '@/types'

// Mock data - this would come from the database in production
const mockProducts: ProductWithStock[] = [
  {
    id: '1',
    slug: 'chleb-psenicno-zitny',
    name: 'Chléb pšenično-žitný',
    description: 'Klasický chléb z pšeničné a žitné mouky na žitném kvasu. Křupavá kůrka, vláčná střída.',
    priceCents: 8500,
    imagePath: '/chleba.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 12
  },
  {
    id: '2',
    slug: 'chleb-zitny',
    name: 'Chléb žitný',
    description: '100% žitný chléb na žitném kvasu. Tmavý, výrazný, s intenzivní chutí.',
    priceCents: 9000,
    imagePath: '/bread_2.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 8
  },
  {
    id: '3',
    slug: 'chleb-vicezemny',
    name: 'Chléb vícezrnný',
    description: 'Chléb obohacený o směs semínek - slunečnice, dýně, sezam. Bohatý na živiny.',
    priceCents: 9500,
    imagePath: '/bread_3.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 6
  },
  {
    id: '4',
    slug: 'chleb-bezlepkovy',
    name: 'Chléb bezlepkový',
    description: 'Speciální bezlepkový chléb z rýžové a pohankové mouky. Pro celiaky.',
    priceCents: 12000,
    imagePath: '/bread_1.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 4
  }
]

const mockStockData = {
  '2025-07-01': { remainingQty: 15, totalQty: 20 },
  '2025-07-04': { remainingQty: 18, totalQty: 20 },
  '2025-07-08': { remainingQty: 20, totalQty: 20 },
  '2025-07-11': { remainingQty: 20, totalQty: 20 }
}

const uspItems = [
  {
    icon: Heart,
    title: 'S láskou pečeno',
    description: 'Každý bochánek pečeme s péčí a láskou podle tradičních receptur'
  },
  {
    icon: Clock,
    title: 'Úterý & Pátek',
    description: 'Čerstvé pečení dvakrát týdně pro zachování kvality a čerstvosti'
  },
  {
    icon: Wheat,
    title: 'Přírodní suroviny',
    description: 'Používáme pouze kvalitní mouky a přírodní ingredience bez chemie'
  },
  {
    icon: MapPin,
    title: 'Brno-Jundrov',
    description: 'Kopretinova 17 - vyzvedávání objednávek přímo v naší pekárně'
  }
]

export default function HomePage() {
  const [selectedBakeDate, setSelectedBakeDate] = useState<string | null>(null)
  const [featuredProducts, setFeaturedProducts] = useState<ProductWithStock[]>([])

  useEffect(() => {
    // Set default bake date to next available
    const nextDays = getNextBakeDays()
    if (nextDays.length > 0) {
      setSelectedBakeDate(nextDays[0])
    }
  }, [])

  useEffect(() => {
    // Update featured products based on selected date
    if (selectedBakeDate) {
      // In production, this would fetch from the database based on the date
      setFeaturedProducts(mockProducts.slice(0, 4))
    }
  }, [selectedBakeDate])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* USP Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Proč si vybrat Vypečenou Kůrku?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jsme tradiční pekárna, která kombinuje starověké techniky s moderní hygienou
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {uspItems.map((item, index) => (
              <Card key={index} className="text-center border-none shadow-sm bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Naše produkty
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Vyberte si den pečení a prohlédněte si naši nabídku čerstvých chlebů
            </p>

            {/* Date selector */}
            <div className="max-w-4xl mx-auto mb-8">
              <DateRadioGroup
                selectedDate={selectedBakeDate}
                onDateChange={setSelectedBakeDate}
                stockData={mockStockData}
              />
            </div>
          </div>

          {selectedBakeDate && featuredProducts.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {featuredProducts.map((product) => (
                  <BreadCard
                    key={product.id}
                    product={product}
                    selectedBakeDate={selectedBakeDate}
                  />
                ))}
              </div>

              <div className="text-center">
                <Link href="/shop">
                  <Button size="lg">
                    Zobrazit všechny produkty
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nezmeškejte novinky
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Přihlaste se k odběru novinek a dozvíte se jako první o nových produktech a speciálních akcích.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Váš e-mail"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              <Button>
                Přihlásit se
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Vaše údaje jsou v bezpečí. Spam neposíláme.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 