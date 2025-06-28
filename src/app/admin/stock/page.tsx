'use client'

import { useState, useEffect } from 'react'
import { Calendar, Save, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface StockDay {
  date: string
  totalQty: number
  remainingQty: number
  isEditing: boolean
  newTotalQty: number
}

// Mock data - in production this would come from API
const mockStockData: StockDay[] = [
  { date: '2024-01-09', totalQty: 50, remainingQty: 32, isEditing: false, newTotalQty: 50 },
  { date: '2024-01-12', totalQty: 45, remainingQty: 45, isEditing: false, newTotalQty: 45 },
  { date: '2024-01-16', totalQty: 0, remainingQty: 0, isEditing: false, newTotalQty: 0 },
  { date: '2024-01-19', totalQty: 0, remainingQty: 0, isEditing: false, newTotalQty: 0 },
]

// Helper function to get next bake days (Tuesday and Friday)
const getNextBakeDays = (count: number = 4): string[] => {
  const days: string[] = []
  const today = new Date()
  let current = new Date(today)
  
  while (days.length < count) {
    const dayOfWeek = current.getDay()
    if (dayOfWeek === 2 || dayOfWeek === 5) { // Tuesday = 2, Friday = 5
      days.push(current.toISOString().split('T')[0])
    }
    current.setDate(current.getDate() + 1)
  }
  
  return days
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const dayNames = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota']
  const monthNames = [
    'ledna', 'února', 'března', 'dubna', 'května', 'června',
    'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'
  ]
  
  const dayName = dayNames[date.getDay()]
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  
  return `${dayName} ${day}. ${month}`
}

export default function AdminStockPage() {
  const [stockData, setStockData] = useState<StockDay[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    // Initialize with next bake days
    const nextBakeDays = getNextBakeDays(4)
    const initialData = nextBakeDays.map(date => {
      const existing = mockStockData.find(d => d.date === date)
      return existing || {
        date,
        totalQty: 0,
        remainingQty: 0,
        isEditing: false,
        newTotalQty: 0
      }
    })
    
    setStockData(initialData)
    setLoading(false)
  }, [])

  const handleEdit = (date: string) => {
    setStockData(prev => prev.map(day => 
      day.date === date 
        ? { ...day, isEditing: true, newTotalQty: day.totalQty }
        : day
    ))
  }

  const handleCancel = (date: string) => {
    setStockData(prev => prev.map(day => 
      day.date === date 
        ? { ...day, isEditing: false, newTotalQty: day.totalQty }
        : day
    ))
  }

  const handleSave = async (date: string) => {
    const day = stockData.find(d => d.date === date)
    if (!day) return

    setSaving(date)
    
    try {
      // Mock API call - in production this would call /api/admin/stock
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Calculate new remaining quantity
      const soldQty = day.totalQty - day.remainingQty
      const newRemainingQty = Math.max(0, day.newTotalQty - soldQty)
      
      setStockData(prev => prev.map(d => 
        d.date === date 
          ? { 
              ...d, 
              totalQty: day.newTotalQty, 
              remainingQty: newRemainingQty,
              isEditing: false 
            }
          : d
      ))
      
      setMessage({ type: 'success', text: `Zásoby pro ${formatDate(date)} byly úspěšně aktualizovány` })
    } catch (error) {
      setMessage({ type: 'error', text: 'Chyba při ukládání zásob' })
    } finally {
      setSaving(null)
    }
  }

  const handleQtyChange = (date: string, newQty: string) => {
    const qty = parseInt(newQty) || 0
    setStockData(prev => prev.map(day => 
      day.date === date 
        ? { ...day, newTotalQty: qty }
        : day
    ))
  }

  const getStockStatus = (day: StockDay): { status: string, variant: 'default' | 'secondary' | 'destructive' } => {
    if (day.totalQty === 0) {
      return { status: 'Nenastaveno', variant: 'secondary' }
    }
    if (day.remainingQty === 0) {
      return { status: 'Vyprodáno', variant: 'destructive' }
    }
    if (day.remainingQty <= day.totalQty * 0.2) {
      return { status: 'Málo zásob', variant: 'destructive' }
    }
    return { status: 'Dostupné', variant: 'default' }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Správa zásob</h1>
        <p className="mt-2 text-gray-600">
          Nastavte počet chlebů dostupných pro nadcházející pečicí dny (úterý a pátek)
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className={`flex items-center gap-2 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          {message.text}
        </div>
      )}

      {/* Stock Days Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {stockData.map((day) => {
          const stockStatus = getStockStatus(day)
          const soldQty = day.totalQty - day.remainingQty
          
          return (
            <Card key={day.date} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <div>
                      <CardTitle className="text-lg">
                        {formatDate(day.date)}
                      </CardTitle>
                      <CardDescription>
                        {day.date}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={stockStatus.variant}>
                    {stockStatus.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stock Statistics */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {day.isEditing ? day.newTotalQty : day.totalQty}
                    </div>
                    <div className="text-sm text-gray-500">Celkem</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {soldQty}
                    </div>
                    <div className="text-sm text-gray-500">Prodáno</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {day.remainingQty}
                    </div>
                    <div className="text-sm text-gray-500">Zbývá</div>
                  </div>
                </div>

                {/* Edit Form */}
                {day.isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Celkový počet chlebů
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={day.newTotalQty}
                        onChange={(e) => handleQtyChange(day.date, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Zadejte počet chlebů"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSave(day.date)}
                        disabled={saving === day.date}
                        className="flex-1"
                      >
                        {saving === day.date ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Uložit
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleCancel(day.date)}
                        disabled={saving === day.date}
                      >
                        Zrušit
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(day.date)}
                    className="w-full"
                  >
                    Upravit zásoby
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Informace o správě zásob</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Zásoby se automaticky snižují při každé dokončené objednávce</li>
                <li>• Pokud zvýšíte celkový počet, zbývající množství se přepočítá</li>
                <li>• Pečicí dny jsou vždy v úterý a pátek</li>
                <li>• Zákazníci mohou objednávat pouze pokud jsou zásoby dostupné</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 