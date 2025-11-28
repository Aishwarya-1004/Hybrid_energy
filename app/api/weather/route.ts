import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const latitude = searchParams.get('latitude') || '40.71'
    const longitude = searchParams.get('longitude') || '-74.01'

    // Fetch weather data from Open-Meteo API
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    )

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const weatherData = await weatherResponse.json()

    // Extract current conditions (latest hourly data)
    const currentTemp = weatherData.hourly.temperature_2m[0]
    const currentHumidity = weatherData.hourly.relative_humidity_2m[0]
    const weatherCode = weatherData.hourly.weather_code[0]
    const maxTemp = weatherData.daily.temperature_2m_max[0]
    const minTemp = weatherData.daily.temperature_2m_min[0]

    // Map weather codes to descriptions
    const weatherDescriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail',
    }

    return NextResponse.json({
      success: true,
      current: {
        temperature: currentTemp,
        humidity: currentHumidity,
        weatherCode: weatherCode,
        weatherDescription: weatherDescriptions[weatherCode] || 'Unknown',
        maxTemp: maxTemp,
        minTemp: minTemp,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        timezone: weatherData.timezone,
      },
      hourly: weatherData.hourly,
      daily: weatherData.daily,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
