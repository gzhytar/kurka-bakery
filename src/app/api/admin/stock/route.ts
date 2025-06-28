import { NextRequest, NextResponse } from 'next/server'

// In production, this would use a real database
// For now, we'll simulate the API response structure

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, totalQty } = body

    // Validate input
    if (!date || typeof totalQty !== 'number' || totalQty < 0) {
      return NextResponse.json(
        { error: 'Invalid date or quantity' },
        { status: 400 }
      )
    }

    // TODO: In production, this would:
    // 1. Verify admin authentication
    // 2. Update the stock_days table in database
    // 3. Calculate new remaining quantity based on existing orders
    
    // Mock response
    const mockResponse = {
      success: true,
      data: {
        date,
        totalQty,
        remainingQty: totalQty, // In reality, this would be calculated
        updatedAt: new Date().toISOString()
      }
    }

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error('Error updating stock:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // TODO: In production, this would:
    // 1. Verify admin authentication
    // 2. Query stock_days table with date range
    // 3. Return actual stock data

    // Mock response with next 4 bake days
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

    const bakeDays = getNextBakeDays()
    const mockStockData = bakeDays.map(date => ({
      date,
      totalQty: Math.floor(Math.random() * 50) + 20, // Random stock 20-70
      remainingQty: Math.floor(Math.random() * 30) + 10, // Random remaining 10-40
      updatedAt: new Date().toISOString()
    }))

    return NextResponse.json({
      success: true,
      data: mockStockData
    })
  } catch (error) {
    console.error('Error fetching stock:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 