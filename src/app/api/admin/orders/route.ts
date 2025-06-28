import { NextRequest, NextResponse } from 'next/server'

// In production, this would use a real database
// For now, we'll simulate the API response structure

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // TODO: In production, this would:
    // 1. Verify admin authentication
    // 2. Query orders table with joins to order_line_items and products
    // 3. Apply filters for date, status, and search
    // 4. Return paginated results

    // Mock orders data
    const mockOrders = [
      {
        id: '1',
        bakeDate: '2024-01-09',
        email: 'jan.novak@email.cz',
        phone: '+420 123 456 789',
        userId: null,
        stripeSessionId: 'cs_1234567890',
        status: 'PAID',
        createdAt: '2024-01-08T10:30:00.000Z',
        items: [
          {
            id: '1',
            productId: '1',
            qty: 2,
            priceCents: 8500,
            product: {
              id: '1',
              name: 'Klasický kvásko',
              slug: 'klasicky-kvasko'
            }
          }
        ],
        totalAmount: 17000
      },
      {
        id: '2',
        bakeDate: '2024-01-09',
        email: 'marie.svoboda@email.cz',
        phone: '+420 987 654 321',
        userId: null,
        stripeSessionId: 'cs_0987654321',
        status: 'FULFILLED',
        createdAt: '2024-01-08T14:15:00.000Z',
        items: [
          {
            id: '2',
            productId: '1',
            qty: 1,
            priceCents: 8500,
            product: {
              id: '1',
              name: 'Klasický kvásko',
              slug: 'klasicky-kvasko'
            }
          },
          {
            id: '3',
            productId: '2',
            qty: 1,
            priceCents: 9500,
            product: {
              id: '2',
              name: 'Celozrnný chléb',
              slug: 'celozrnny-chleb'
            }
          }
        ],
        totalAmount: 18000
      }
    ]

    // Apply filters (mock implementation)
    let filteredOrders = mockOrders

    if (date) {
      filteredOrders = filteredOrders.filter(order => order.bakeDate === date)
    }

    if (status && status !== 'ALL') {
      filteredOrders = filteredOrders.filter(order => order.status === status)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredOrders = filteredOrders.filter(order =>
        order.email.toLowerCase().includes(searchLower) ||
        order.phone.includes(searchLower) ||
        order.id.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredOrders,
      pagination: {
        total: filteredOrders.length,
        page: 1,
        limit: 50
      }
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, status } = body

    // Validate input
    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      )
    }

    const validStatuses = ['PENDING', 'PAID', 'FULFILLED', 'CANCELLED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // TODO: In production, this would:
    // 1. Verify admin authentication
    // 2. Update the order status in database
    // 3. Send confirmation email to customer if needed
    // 4. Update stock if order is cancelled

    // Mock response
    const mockResponse = {
      success: true,
      data: {
        orderId,
        status,
        updatedAt: new Date().toISOString()
      }
    }

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 