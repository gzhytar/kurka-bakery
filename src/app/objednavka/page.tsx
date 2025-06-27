'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DateRadioGroup } from '@/components/date-radio-group'
import { useCartStore } from '@/store/cart'
import { formatPrice, formatBakeDate, getNextBakeDays } from '@/lib/utils'
import type { ProductWithStock } from '@/types'

// Mock products for display purposes
const mockProducts: Record<string, ProductWithStock> = {
  '1': {
    id: '1',
    slug: 'chleb-psenicno-zitny',
    name: 'Chléb pšenično-žitný',
    description: 'Klasický chléb z pšeničné a žitné mouky na žitném kvasu.',
    priceCents: 8500,
    imagePath: '/chleba.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 12
  },
  '2': {
    id: '2',
    slug: 'chleb-zitny',
    name: 'Chléb žitný',
    description: '100% žitný chléb na žitném kvasu.',
    priceCents: 9000,
    imagePath: '/bread_2.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 8
  },
  '3': {
    id: '3',
    slug: 'chleb-vicezemny',
    name: 'Chléb vícezrnný',
    description: 'Chléb obohacený o směs semínek.',
    priceCents: 9500,
    imagePath: '/bread_3.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 6
  },
  '4': {
    id: '4',
    slug: 'chleb-bezlepkovy',
    name: 'Chléb bezlepkový',
    description: 'Speciální bezlepkový chléb z rýžové a pohankové mouky.',
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

export default function CartPage() {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'payment'>('cart')
  const [customerDetails, setCustomerDetails] = useState({
    email: '',
    phone: '',
    notes: ''
  })
  const [isHydrated, setIsHydrated] = useState(false)

  const {
    items,
    selectedBakeDate,
    updateQty,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice,
    setSelectedBakeDate
  } = useCartStore()

  // Get cart data only after hydration to prevent mismatch
  const totalItems = isHydrated ? getTotalItems() : 0
  const totalPrice = isHydrated ? getTotalPrice(Object.values(mockProducts)) : 0

  // Ensure hydration before accessing cart state
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    // Set default bake date if none selected (only after hydration)
    if (isHydrated && !selectedBakeDate) {
      const nextDays = getNextBakeDays()
      if (nextDays.length > 0) {
        setSelectedBakeDate(nextDays[0])
      }
    }
  }, [isHydrated, selectedBakeDate, setSelectedBakeDate])

  // Group items by bake date (only after hydration)
  const itemsByDate = isHydrated ? items.reduce((acc, item) => {
    if (!acc[item.bakeDate]) {
      acc[item.bakeDate] = []
    }
    acc[item.bakeDate].push(item)
    return acc
  }, {} as Record<string, typeof items>) : {}

  const handleCheckout = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('details')
    } else if (checkoutStep === 'details') {
      // Validate customer details
      if (!customerDetails.email || !customerDetails.phone) {
        alert('Prosím vyplňte všechny povinné údaje')
        return
      }
      setCheckoutStep('payment')
      // In production, this would redirect to Stripe Checkout
      alert('V produkci by zde proběhlo přesměrování na Stripe platbu')
    }
  }

  // Show loading state during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <CardContent>
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Váš košík je prázdný
              </h1>
              <p className="text-gray-600 mb-6">
                Přidejte si nějaké produkty do košíku a vraťte se sem pro dokončení objednávky.
              </p>
              <Link href="/shop">
                <Button size="lg">
                  Pokračovat v nakupování
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/shop">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zpět do obchodu
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {checkoutStep === 'cart' && 'Košík'}
              {checkoutStep === 'details' && 'Kontaktní údaje'}
              {checkoutStep === 'payment' && 'Platba'}
            </h1>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              checkoutStep === 'cart' ? 'bg-orange-600 text-white' : 'bg-green-600 text-white'
            }`}>
              1
            </div>
            <div className={`w-16 h-0.5 ${
              ['details', 'payment'].includes(checkoutStep) ? 'bg-green-600' : 'bg-gray-300'
            }`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              checkoutStep === 'details' ? 'bg-orange-600 text-white' : 
              checkoutStep === 'payment' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
            <div className={`w-16 h-0.5 ${
              checkoutStep === 'payment' ? 'bg-green-600' : 'bg-gray-300'
            }`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              checkoutStep === 'payment' ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {checkoutStep === 'cart' && (
              <>
                {/* Bake date selector */}
                <Card>
                  <CardHeader>
                    <CardTitle>Vyberte nebo změňte den pečení</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DateRadioGroup
                      selectedDate={selectedBakeDate}
                      onDateChange={setSelectedBakeDate}
                      stockData={mockStockData}
                    />
                  </CardContent>
                </Card>

                {/* Cart items by date */}
                {Object.entries(itemsByDate).map(([date, dateItems]) => (
                  <Card key={date}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Objednávka na {formatBakeDate(date)}</span>
                        <Badge variant="outline">{date}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {dateItems.map((item) => {
                        const product = mockProducts[item.productId]
                        if (!product) return null

                        return (
                          <div key={`${item.productId}-${item.bakeDate}`} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <Image
                              src={product.imagePath}
                              alt={product.name}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                            />
                            
                            <div className="flex-1">
                              <h3 className="font-semibold">{product.name}</h3>
                              <p className="text-sm text-gray-600">{product.description}</p>
                              <p className="text-lg font-bold text-orange-600 mt-1">
                                {formatPrice(product.priceCents)}
                              </p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQty(item.productId, item.bakeDate, item.qty - 1)}
                                disabled={item.qty <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              
                              <span className="font-medium min-w-[2rem] text-center">
                                {item.qty}
                              </span>
                              
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQty(item.productId, item.bakeDate, item.qty + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.productId, item.bakeDate)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                ))}
              </>
            )}

            {checkoutStep === 'details' && (
              <Card>
                <CardHeader>
                  <CardTitle>Kontaktní údaje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Poznámky k objednávce
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={customerDetails.notes}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                      placeholder="Případné speciální požadavky..."
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {checkoutStep === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle>Platba</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Platba kartou</h3>
                      <p className="text-gray-600 mb-4">
                        Budete přesměrováni na bezpečnou platební bránu Stripe.
                      </p>
                    </div>
                    
                    <Button size="lg" className="w-full">
                      Zaplatit {formatPrice(totalPrice)}
                    </Button>
                    
                    <p className="text-xs text-gray-500 mt-4">
                      Platba je zabezpečena pomocí SSL šifrování
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Order summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Souhrn objednávky</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Počet položek:</span>
                  <span>{totalItems} ks</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Způsob dopravy:</span>
                  <span>Osobní odběr</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Místo odběru:</span>
                  <span className="text-right">
                    Kopretinová 17<br />
                    Brno-Jundrov
                  </span>
                </div>
                
                <hr />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Celkem:</span>
                  <span className="text-orange-600">{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="space-y-2">
                  {checkoutStep === 'cart' && (
                    <Button onClick={handleCheckout} className="w-full" size="lg">
                      Pokračovat k údajům
                    </Button>
                  )}
                  
                  {checkoutStep === 'details' && (
                    <Button onClick={handleCheckout} className="w-full" size="lg">
                      Pokračovat k platbě
                    </Button>
                  )}
                  
                  {checkoutStep === 'payment' && (
                    <Button onClick={handleCheckout} className="w-full" size="lg">
                      Dokončit objednávku
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={clearCart}
                  >
                    Vyprázdnit košík
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 