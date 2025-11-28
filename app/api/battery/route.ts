import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch the battery data from the public JSON file
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/battery-data.json`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch battery data')
    }
    
    const data = await response.json()
    
    // Return the latest data point
    const latestData = data.batteryMetrics[data.batteryMetrics.length - 1]
    
    return NextResponse.json({
      success: true,
      current: latestData,
      history: data.batteryMetrics,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching battery data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch battery data' },
      { status: 500 }
    )
  }
}
