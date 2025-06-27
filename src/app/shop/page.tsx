'use client'

import { useState, useEffect } from 'react'
import { BreadCard } from '@/components/bread-card'
import { DateRadioGroup } from '@/components/date-radio-group'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getNextBakeDays } from '@/lib/utils'
import type { ProductWithStock } from '@/types'

// Mock data - expanded product catalog
const mockProducts: ProductWithStock[] = [
  {
    id: '1',
    slug: 'chleb-psenicno-zitny',
    name: 'Chléb pšenično-žitný',
    description: 'Klasický chléb z pšeničné a žitné mouky na žitném kvasu. Křupavá kůrka, vláčná střída s výraznou chutí kvasu.',
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
    description: '100% žitný chléb na žitném kvasu. Tmavý, výrazný, s intenzivní chutí. Ideální ke slanému i sladkému.',
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
    description: 'Chléb obohacený o směs semínek - slunečnice, dýně, sezam. Bohatý na živiny a zdravé tuky.',
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
    description: 'Speciální bezlepkový chléb z rýžové a pohankové mouky. Určen pro osoby s celiakií a nesnášenlivostí lepku.',
    priceCents: 12000,
    imagePath: '/bread_1.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 4
  },
  {
    id: '5',
    slug: 'chleb-kminovy',
    name: 'Chléb kmínový',
    description: 'Tradiční žitný chléb s kmínem. Osvědčená kombinace chutí, která ladí ke všem pokrmům.',
    priceCents: 8800,
    imagePath: '/bread_2.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 10
  },
  {
    id: '6',
    slug: 'bageta-klasicka',
    name: 'Bageta klasická',
    description: 'Křupavá francouzská bageta s typickou štěrbinou. Perfektní k snídani nebo jako příloha.',
    priceCents: 4500,
    imagePath: '/bread_3.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 15
  }
]

const mockStockData = {
  '2025-07-01': { remainingQty: 15, totalQty: 20 },
  '2025-07-04': { remainingQty: 18, totalQty: 20 },
  '2025-07-08': { remainingQty: 20, totalQty: 20 },
  '2025-07-11': { remainingQty: 20, totalQty: 20 }
}

export default function ShopPage() {
  const [selectedBakeDate, setSelectedBakeDate] = useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<ProductWithStock[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  useEffect(() => {
    // Set default bake date to next available
    const nextDays = getNextBakeDays()
    if (nextDays.length > 0) {
      setSelectedBakeDate(nextDays[0])
    }
  }, [])

  useEffect(() => {
    // Filter products based on selected date and category
    if (selectedBakeDate) {
      let products = mockProducts

      if (categoryFilter !== 'all') {
        products = products.filter(product => {
          switch (categoryFilter) {
            case 'chleby':
              return product.name.toLowerCase().includes('chléb')
            case 'bagety':
              return product.name.toLowerCase().includes('bageta')
            case 'bezlepkove':
              return product.name.toLowerCase().includes('bezlepkový')
            default:
              return true
          }
        })
      }

      setFilteredProducts(products.filter(product => product.isActive))
    }
  }, [selectedBakeDate, categoryFilter])

  const categories = [
    { value: 'all', label: 'Všechny produkty' },
    { value: 'chleby', label: 'Chleby' },
    { value: 'bagety', label: 'Bagety' },
    { value: 'bezlepkove', label: 'Bezlepkové' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Náš obchod
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vyberte si den pečení a prohlédněte si kompletní nabídku našich čerstvých produktů
          </p>
        </div>

        {/* Date selector */}
        <div className="mb-8">
          <DateRadioGroup
            selectedDate={selectedBakeDate}
            onDateChange={setSelectedBakeDate}
            stockData={mockStockData}
          />
        </div>

        {selectedBakeDate && (
          <>
            {/* Category filters */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategorie</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={categoryFilter === category.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategoryFilter(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {filteredProducts.map((product) => (
                    <BreadCard
                      key={product.id}
                      product={product}
                      selectedBakeDate={selectedBakeDate}
                    />
                  ))}
                </div>

                {/* Summary info */}
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Informace o objednávce
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <strong>Vyzvedávání:</strong> Kopretinova 17, Brno-Jundrov
                        </div>
                        <div>
                          <strong>Doba vyzvedávání:</strong> 15:00 - 18:00
                        </div>
                        <div>
                          <strong>Platba:</strong> Online kartou nebo hotově
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Žádné produkty nenalezeny
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Pro vybranou kategoriju a den pečení nejsou dostupné žádné produkty.
                  </p>
                  <Button onClick={() => setCategoryFilter('all')}>
                    Zobrazit všechny produkty
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
} 