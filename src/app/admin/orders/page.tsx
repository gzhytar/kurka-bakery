'use client'

import { useState, useEffect } from 'react'
import { Calendar, Search, Eye, CheckCircle, Clock, XCircle, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Order, OrderLineItem, Product, OrderStatus } from '@/types'

interface OrderWithItems extends Order {
  items: (OrderLineItem & { product: Product })[]
  totalAmount: number
}

// Mock data - in production this would come from API
const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'klasicky-kvasko',
    name: 'Klasický kvásko',
    description: 'Tradiční kváskový chléb',
    priceCents: 8500,
    imagePath: '/chleba.jpg',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '2', 
    slug: 'celozrnny-chleb',
    name: 'Celozrnný chléb',
    description: 'Zdravý celozrnný chléb',
    priceCents: 9500,
    imagePath: '/bread_1.jpg',
    isActive: true,
    createdAt: new Date()
  }
]

const mockOrders: OrderWithItems[] = [
  {
    id: '1',
    bakeDate: '2024-01-09',
    email: 'jan.novak@email.cz',
    phone: '+420 123 456 789',
    stripeId: 'pi_1234567890',
    status: 'PAID',
    createdAt: new Date('2024-01-08T10:30:00'),
    items: [
      {
        id: '1',
        orderId: '1',
        productId: '1',
        qty: 2,
        priceCents: 8500,
        product: mockProducts[0]
      }
    ],
    totalAmount: 17000
  },
  {
    id: '2',
    bakeDate: '2024-01-09',
    email: 'marie.svoboda@email.cz',
    phone: '+420 987 654 321',
    stripeId: 'pi_0987654321',
    status: 'FULFILLED',
    createdAt: new Date('2024-01-08T14:15:00'),
    items: [
      {
        id: '2',
        orderId: '2',
        productId: '1',
        qty: 1,
        priceCents: 8500,
        product: mockProducts[0]
      },
      {
        id: '3',
        orderId: '2',
        productId: '2',
        qty: 1,
        priceCents: 9500,
        product: mockProducts[1]
      }
    ],
    totalAmount: 18000
  },
  {
    id: '3',
    bakeDate: '2024-01-12',
    email: 'petr.dvorak@email.cz',
    phone: '+420 555 123 456',
    stripeId: 'pi_5555123456',
    status: 'PENDING',
    createdAt: new Date('2024-01-11T09:45:00'),
    items: [
      {
        id: '4',
        orderId: '3',
        productId: '2',
        qty: 3,
        priceCents: 9500,
        product: mockProducts[1]
      }
    ],
    totalAmount: 28500
  }
]

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

const formatPrice = (priceCents: number): string => {
  return `${(priceCents / 100).toFixed(0)} Kč`
}

const formatDateTime = (date: Date): string => {
  return date.toLocaleString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case 'PENDING':
      return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Čeká na platbu</Badge>
    case 'PAID':
      return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Zaplaceno</Badge>
    case 'FULFILLED':
      return <Badge variant="default" className="bg-green-600 hover:bg-green-700"><Package className="h-3 w-3 mr-1" />Vyzvednuto</Badge>
    case 'CANCELLED':
      return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Zrušeno</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getNextBakeDays = (count: number = 10): string[] => {
  const days: string[] = []
  const today = new Date()
  let current = new Date(today)
  current.setDate(current.getDate() - 7) // Start from a week ago
  
  while (days.length < count) {
    const dayOfWeek = current.getDay()
    if (dayOfWeek === 2 || dayOfWeek === 5) { // Tuesday = 2, Friday = 5
      days.push(current.toISOString().split('T')[0])
    }
    current.setDate(current.getDate() + 1)
  }
  
  return days
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [filteredOrders, setFilteredOrders] = useState<OrderWithItems[]>([])
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL')
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const bakeDays = getNextBakeDays(10)

  useEffect(() => {
    // Initialize with today's date or next bake day
    const today = new Date().toISOString().split('T')[0]
    const nextBakeDay = bakeDays.find(day => day >= today) || bakeDays[bakeDays.length - 1]
    setSelectedDate(nextBakeDay)
    
    // Load mock data
    setOrders(mockOrders)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = orders

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(order => order.bakeDate === selectedDate)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(order => 
        order.email.toLowerCase().includes(query) ||
        order.phone.includes(query) ||
        order.id.toLowerCase().includes(query)
      )
    }

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, selectedDate, searchQuery, statusFilter])

  const handleMarkFulfilled = async (orderId: string) => {
    try {
      // Mock API call - in production this would call /api/admin/orders
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: 'FULFILLED' as OrderStatus }
          : order
      ))
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getOrderStats = () => {
    const dateOrders = orders.filter(order => order.bakeDate === selectedDate)
    const totalOrders = dateOrders.length
    const totalRevenue = dateOrders.reduce((sum, order) => sum + order.totalAmount, 0)
    const paidOrders = dateOrders.filter(order => order.status === 'PAID' || order.status === 'FULFILLED').length
    const fulfilledOrders = dateOrders.filter(order => order.status === 'FULFILLED').length

    return { totalOrders, totalRevenue, paidOrders, fulfilledOrders }
  }

  const stats = getOrderStats()

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
        <h1 className="text-3xl font-bold text-gray-900">Správa objednávek</h1>
        <p className="mt-2 text-gray-600">
          Přehled a správa objednávek pro jednotlivé pečicí dny
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pečicí den
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Všechny dny</option>
                {bakeDays.map(date => (
                  <option key={date} value={date}>
                    {formatDate(date)} ({date})
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stav objednávky
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'ALL')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="ALL">Všechny stavy</option>
                <option value="PENDING">Čeká na platbu</option>
                <option value="PAID">Zaplaceno</option>
                <option value="FULFILLED">Vyzvednuto</option>
                <option value="CANCELLED">Zrušeno</option>
              </select>
            </div>

            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vyhledat
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Email, telefon nebo ID objednávky..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      {selectedDate && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}</div>
              <div className="text-sm text-gray-500">Celkem objednávek</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">{formatPrice(stats.totalRevenue)}</div>
              <div className="text-sm text-gray-500">Celkový obrat</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{stats.paidOrders}</div>
              <div className="text-sm text-gray-500">Zaplacené objednávky</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">{stats.fulfilledOrders}</div>
              <div className="text-sm text-gray-500">Vyzvednuté objednávky</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Žádné objednávky</h3>
              <p className="text-gray-500">
                Pro vybrané kritéria nebyly nalezeny žádné objednávky.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Objednávka #{order.id.slice(0, 8)}
                    </CardTitle>
                    <CardDescription>
                      {formatDateTime(order.createdAt)} • {formatDate(order.bakeDate)}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedOrder(
                        expandedOrder === order.id ? null : order.id
                      )}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Email</div>
                    <div className="text-sm text-gray-900">{order.email}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Telefon</div>
                    <div className="text-sm text-gray-900">{order.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Celková částka</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {formatPrice(order.totalAmount)}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                {expandedOrder === order.id && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Objednané položky</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md">
                          <div>
                            <div className="font-medium">{item.product.name}</div>
                            <div className="text-sm text-gray-500">
                              {item.qty}× {formatPrice(item.priceCents)}
                            </div>
                          </div>
                          <div className="font-semibold">
                            {formatPrice(item.qty * item.priceCents)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {order.status === 'PAID' && (
                  <div className="border-t pt-4">
                    <Button
                      onClick={() => handleMarkFulfilled(order.id)}
                      className="w-full md:w-auto"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Označit jako vyzvednuto
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 