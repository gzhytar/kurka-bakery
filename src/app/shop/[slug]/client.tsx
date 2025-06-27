'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DateRadioGroup } from '@/components/date-radio-group'
import { useCartStore } from '@/store/cart'
import { formatPrice, getNextBakeDays } from '@/lib/utils'
import type { ProductWithStock } from '@/types'

// Mock product data
const mockProducts: Record<string, ProductWithStock> = {
  'chleb-psenicno-zitny': {
    id: '1',
    slug: 'chleb-psenicno-zitny',
    name: 'Chléb pšenično-žitný',
    description: 'Klasický chléb z pšeničné a žitné mouky na žitném kvasu. Křupavá kůrka, vláčná střída s výraznou chutí kvasu. Ideální pro každodenní konzumaci.',
    priceCents: 8500,
    imagePath: '/chleba.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 12
  },
  'chleb-zitny': {
    id: '2',
    slug: 'chleb-zitny',
    name: 'Chléb žitný',
    description: '100% žitný chléb na žitném kvasu. Tmavý, výrazný, s intenzivní chutí. Ideální ke slanému i sladkému. Bohatý na vlákninu a minerální látky.',
    priceCents: 9000,
    imagePath: '/bread_2.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 8
  },
  'chleb-vicezemny': {
    id: '3',
    slug: 'chleb-vicezemny',
    name: 'Chléb vícezrnný',
    description: 'Chléb obohacený o směs semínek - slunečnice, dýně, sezam. Bohatý na živiny a zdravé tuky. Výborný zdroj energie a minerálních látek.',
    priceCents: 9500,
    imagePath: '/bread_3.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 6
  },
  'chleb-bezlepkovy': {
    id: '4',
    slug: 'chleb-bezlepkovy',
    name: 'Chléb bezlepkový',
    description: 'Speciální bezlepkový chléb z rýžové a pohankové mouky. Určen pro osoby s celiakií a nesnášenlivostí lepku. Stejně chutný jako klasický chléb.',
    priceCents: 12000,
    imagePath: '/bread_1.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 4
  }
}

const mockStockData = {
  '2025-07-01': { remainingQty: 15, totalQty: 20 },
  '2025-07-04': { remainingQty: 18, totalQty: 20 },
  '2025-07-08': { remainingQty: 20, totalQty: 20 },
  '2025-07-11': { remainingQty: 20, totalQty: 20 }
}

export default function ProductDetailClient() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<ProductWithStock | null>(null)
  const [selectedBakeDate, setSelectedBakeDate] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [isHydrated, setIsHydrated] = useState(false)

  const addItem = useCartStore((state) => state.addItem)
  const items = useCartStore((state) => state.items)

  // Ensure hydration before accessing cart state
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    // Find product by slug
    const foundProduct = mockProducts[slug]
    if (foundProduct) {
      setProduct(foundProduct)
    }

    // Set default bake date
    const nextDays = getNextBakeDays()
    if (nextDays.length > 0) {
      setSelectedBakeDate(nextDays[0])
    }
  }, [slug])

  const handleAddToCart = () => {
    if (product && selectedBakeDate) {
      addItem(product.id, selectedBakeDate, qty)
      setQty(1) // Reset quantity after adding
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <CardContent>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Produkt nenalezen
              </h1>
              <p className="text-gray-600 mb-6">
                Požadovaný produkt neexistuje nebo byl odstraněn.
              </p>
              <Link href="/shop">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zpět do obchodu
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Find existing quantity for this product and date (only after hydration)
  const existingItem = isHydrated ? items.find(
    item => item.productId === product.id && item.bakeDate === selectedBakeDate
  ) : null
  const existingQty = existingItem?.qty || 0

  const isOutOfStock = product.remainingQty <= 0
  const isLowStock = product.remainingQty <= 3 && product.remainingQty > 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/shop">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zpět do obchodu
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
            <Image
              src={product.imagePath}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Stock badges */}
            <div className="absolute top-4 right-4 space-y-2">
              {isOutOfStock && (
                <Badge variant="destructive">Vyprodáno</Badge>
              )}
              {isLowStock && (
                <Badge variant="warning">Pouze {product.remainingQty} ks</Badge>
              )}
              {/* Always render cart badge but control visibility */}
              <Badge 
                variant="success"
                className={`transition-opacity ${
                  isHydrated && existingQty > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                V košíku: {isHydrated ? existingQty : 0}
              </Badge>
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-orange-600 mb-4">
                {formatPrice(product.priceCents)}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Date selector */}
            <div>
              <DateRadioGroup
                selectedDate={selectedBakeDate}
                onDateChange={setSelectedBakeDate}
                stockData={mockStockData}
              />
            </div>

            {/* Add to cart section */}
            {selectedBakeDate && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Přidat do košíku</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Zbývá: {product.remainingQty} ks
                    </span>
                    <span className="text-sm text-gray-600">
                      Den pečení: {selectedBakeDate}
                    </span>
                  </div>

                  {!isOutOfStock ? (
                    <>
                      {/* Quantity selector */}
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">Množství:</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQty(Math.max(1, qty - 1))}
                            disabled={qty <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <span className="font-medium min-w-[3rem] text-center">
                            {qty} ks
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQty(Math.min(product.remainingQty, qty + 1))}
                            disabled={qty >= product.remainingQty}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Add to cart button */}
                      <Button 
                        onClick={handleAddToCart}
                        className="w-full"
                        size="lg"
                        disabled={qty > product.remainingQty}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Přidat do košíku • {formatPrice(product.priceCents * qty)}
                      </Button>
                    </>
                  ) : (
                    <Button disabled className="w-full" size="lg">
                      Vyprodáno
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Product info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informace o produktu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Váha:</span>
                  <span>cca 750g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Skladování:</span>
                  <span>Při pokojové teplotě 3-5 dní</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alergeny:</span>
                  <span>Lepek (může obsahovat stopy mléka)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doba upečení:</span>
                  <span>60-75 minut</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 