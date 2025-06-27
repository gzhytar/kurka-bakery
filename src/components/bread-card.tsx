'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import type { ProductWithStock } from '@/types'

interface BreadCardProps {
  product: ProductWithStock
  selectedBakeDate: string
}

export function BreadCard({ product, selectedBakeDate }: BreadCardProps) {
  const [qty, setQty] = useState(1)
  const [isHydrated, setIsHydrated] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const items = useCartStore((state) => state.items)
  
  // Ensure hydration before accessing cart state
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  
  // Find existing quantity for this product and date (only after hydration)
  const existingItem = isHydrated ? items.find(
    item => item.productId === product.id && item.bakeDate === selectedBakeDate
  ) : null
  const existingQty = existingItem?.qty || 0

  const handleAddToCart = () => {
    addItem(product.id, selectedBakeDate, qty)
    setQty(1) // Reset quantity after adding
  }

  const isOutOfStock = product.remainingQty <= 0
  const isLowStock = product.remainingQty <= 3 && product.remainingQty > 0

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/shop/${product.slug}`}>
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Stock badges */}
        <div className="absolute top-3 right-3 space-y-2">
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

      <CardContent className="p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            {formatPrice(product.priceCents)}
          </span>
          <span className="text-sm text-gray-500">
            Zbývá: {product.remainingQty} ks
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {!isOutOfStock ? (
          <div className="w-full space-y-3">
            {/* Quantity selector */}
            <div className="flex items-center justify-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={qty <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="font-medium min-w-[2rem] text-center">
                {qty}
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

            {/* Add to cart button */}
            <Button 
              onClick={handleAddToCart}
              className="w-full"
              disabled={qty > product.remainingQty}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Přidat do košíku
            </Button>
          </div>
        ) : (
          <Button disabled className="w-full">
            Vyprodáno
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 