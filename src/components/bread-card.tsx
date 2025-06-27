'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';
import type { ProductWithStock } from '@/types';

interface BreadCardProps {
  product: ProductWithStock;
  selectedBakeDate: string;
}

export function BreadCard({ product, selectedBakeDate }: BreadCardProps) {
  const { addItem, removeItem, updateQty, items } = useCartStore();
  
  const cartItem = items.find(
    (item) => item.productId === product.id && item.bakeDate === selectedBakeDate
  );
  
  const isOutOfStock = product.remainingQty === 0;
  const isLowStock = product.remainingQty <= 3 && product.remainingQty > 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addItem(product.id, selectedBakeDate, 1);
    }
  };

  const handleUpdateQty = (newQty: number) => {
    if (newQty <= 0) {
      removeItem(product.id, selectedBakeDate);
    } else {
      updateQty(product.id, selectedBakeDate, newQty);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            className="object-cover"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm">
                Vyprodáno
              </Badge>
            </div>
          )}
          {isLowStock && !isOutOfStock && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Posledních {product.remainingQty}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">
            {formatPrice(product.priceCents)}
          </span>
          <span className="text-sm text-muted-foreground">
            Zbývá: {product.remainingQty}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {cartItem ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQty(cartItem.qty - 1)}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{cartItem.qty}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQty(cartItem.qty + 1)}
                disabled={cartItem.qty >= product.remainingQty}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(product.id, selectedBakeDate)}
            >
              Odebrat
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full"
          >
            {isOutOfStock ? 'Vyprodáno' : 'Přidat do košíku'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 