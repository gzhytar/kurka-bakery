'use client';

import { useState } from 'react';
import { formatDate, formatDateISO, getNextBakeDays } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DateRadioGroupProps {
  selectedDate: string | null;
  onDateChange: (date: string) => void;
  stockData?: Record<string, { remainingQty: number; totalQty: number }>;
}

export function DateRadioGroup({ 
  selectedDate, 
  onDateChange, 
  stockData = {} 
}: DateRadioGroupProps) {
  const bakeDays = getNextBakeDays(4);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Vyberte den pečení:</h3>
      <div className="grid gap-3">
        {bakeDays.map((date) => {
          const dateISO = formatDateISO(date);
          const stock = stockData[dateISO];
          const isSoldOut = stock?.remainingQty === 0;
          const isSelected = selectedDate === dateISO;
          
          return (
            <Card 
              key={dateISO}
              className={`cursor-pointer transition-colors ${
                isSelected 
                  ? 'ring-2 ring-orange-600 bg-orange-50' 
                  : 'hover:bg-gray-50'
              } ${isSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isSoldOut && onDateChange(dateISO)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="bakeDate"
                      value={dateISO}
                      checked={isSelected}
                      onChange={() => !isSoldOut && onDateChange(dateISO)}
                      disabled={isSoldOut}
                      className="text-orange-600 focus:ring-orange-600"
                    />
                    <div>
                      <div className="font-medium">
                        {formatDate(date)}
                      </div>
                      {stock && (
                        <div className="text-sm text-muted-foreground">
                          Zbývá: {stock.remainingQty} / {stock.totalQty}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isSoldOut && (
                    <Badge variant="destructive">Vyprodáno</Badge>
                  )}
                  
                  {stock && stock.remainingQty <= 3 && stock.remainingQty > 0 && (
                    <Badge variant="secondary">Posledních {stock.remainingQty}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 