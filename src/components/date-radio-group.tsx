'use client'

import { getNextBakeDays, formatBakeDate, getDayOfWeek } from '@/lib/utils'

interface DateRadioGroupProps {
  selectedDate: string | null
  onDateChange: (date: string) => void
  stockData?: Record<string, { remainingQty: number; totalQty: number }>
}

export function DateRadioGroup({ selectedDate, onDateChange, stockData }: DateRadioGroupProps) {
  const bakeDays = getNextBakeDays()

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">
        Vyberte den pečení
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {bakeDays.map((date) => {
          const stock = stockData?.[date]
          const isAvailable = !stock || stock.remainingQty > 0
          const isSelected = selectedDate === date
          const dayOfWeek = getDayOfWeek(date)
          const formattedDate = formatBakeDate(date)

          return (
            <label
              key={date}
              className={`
                relative flex cursor-pointer rounded-lg border p-4 focus:outline-none transition-all
                ${isSelected 
                  ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-600' 
                  : 'border-gray-300 bg-white hover:border-orange-300'
                }
                ${!isAvailable 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-orange-50'
                }
              `}
            >
              <input
                type="radio"
                name="bake-date"
                value={date}
                checked={isSelected}
                onChange={(e) => onDateChange(e.target.value)}
                disabled={!isAvailable}
                className="sr-only"
              />
              
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {dayOfWeek}
                  </span>
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-orange-600" />
                  )}
                </div>
                
                <span className="text-sm text-gray-600 mt-1">
                  {formattedDate}
                </span>
                
                {stock && (
                  <span className={`text-xs mt-2 ${
                    stock.remainingQty > 5 
                      ? 'text-green-600' 
                      : stock.remainingQty > 0 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                  }`}>
                    {stock.remainingQty > 0 
                      ? `Zbývá: ${stock.remainingQty} ks`
                      : 'Vyprodáno'
                    }
                  </span>
                )}
              </div>
            </label>
          )
        })}
      </div>
      
      {!selectedDate && (
        <p className="text-sm text-gray-500 mt-2">
          Prosím vyberte den pečení pro zobrazení dostupných produktů.
        </p>
      )}
    </div>
  )
} 