'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Brain, Users, TrendingUp, Shield, Sparkles, Battery, Menu, X, Thermometer, Gauge, AlertCircle, Cpu, Wifi, RefreshCw } from "lucide-react"

interface BatteryData {
  stateOfCharge: number
  packVoltage: number
  chargeCurrent: number
  cellTemperature: number
  cycleCount: number
  healthStatus: string
  timestamp: string
}

interface WeatherData {
  temperature: number
  humidity: number
  weatherCode: number
  weatherDescription: string
  maxTemp: number
  minTemp: number
  latitude: number
  longitude: number
  timezone: string
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showBatterySection, setShowBatterySection] = useState(false)
  const [batteryData, setBatteryData] = useState<BatteryData | null>(null)
  const [historyData, setHistoryData] = useState<BatteryData[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  // Fetch real-time battery data from Kaggle dataset
  useEffect(() => {
    const fetchBatteryData = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/battery')
        const data = await response.json()
        if (data.success) {
          setBatteryData(data.current)
          setHistoryData(data.history)
          setLastUpdated(new Date().toLocaleTimeString())
        }
      } catch (error) {
        console.error('Error fetching battery data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBatteryData()
    // Refresh data every 10 seconds
    const interval = setInterval(fetchBatteryData, 10000)
    return () => clearInterval(interval)
  }, [])

  // Fetch real-time weather data from Open-Meteo API
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/api/weather?latitude=40.71&longitude=-74.01')
        const data = await response.json()
        if (data.success) {
          setWeatherData(data.current)
        }
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchWeatherData()
    // Refresh weather data every 30 seconds
    const interval = setInterval(fetchWeatherData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex flex-col">
      {/* Hamburger Menu */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Energy Monitor</h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu Dropdown */}
        {menuOpen && (
          <div className="border-t border-border bg-secondary/50 backdrop-blur">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <Button
                className="w-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2"
                onClick={() => {
                  setShowBatterySection(!showBatterySection)
                  setMenuOpen(false)
                }}
              >
                <Zap className="w-4 h-4" />
                {showBatterySection ? 'Hide Battery Monitor' : 'Show Battery Monitor'}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:py-32 relative">
          <div className="flex flex-col items-center text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              AI-Powered Energy Orchestration
            </Badge>
            <h1 className="text-balance text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
              The fastest platform for{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                renewable energy
              </span>
            </h1>
            <p className="text-pretty text-lg text-muted-foreground max-w-2xl leading-relaxed md:text-xl">
              Build transformative energy experiences powered by AI forecasting, blockchain trading, and real-time
              orchestration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild className="text-base h-12 px-8">
                <Link href="/dashboard">
                  Open Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base h-12 px-8 bg-transparent">
                <Link href="/digital-twin">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="border-y bg-secondary/50">
        <div className="mx-auto w-full max-w-7xl px-6 py-12">
          <p className="text-center text-sm text-muted-foreground mb-8">Trusted by institutions across Rajasthan</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            {["IIT Jodhpur", "MNIT Jaipur", "RTU Kota", "BITS Pilani", "NIT Jaipur"].map((name) => (
              <div key={name} className="text-lg font-semibold">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Flagship Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools for energy management, prediction, and optimization
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <Card className="group h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                  {feature.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-secondary to-background">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-2">
                <CardContent className="p-8 text-center space-y-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground/70">{stat.detail}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to optimize your energy?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join leading institutions using AI to reduce costs and carbon emissions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/engagement">View Demo</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Battery Monitoring Section - Conditional */}
      {showBatterySection && (
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Real-Time Battery Monitoring System</h2>
              <p className="text-slate-300 text-lg">
                Comprehensive battery data collection, analysis, and state estimation
              </p>
            </div>

            {/* Weather Data Section - Open-Meteo API */}
            {weatherData && (
              <div className="mb-12 p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Current Temperature</p>
                    <p className="text-3xl font-bold text-blue-400">{weatherData.temperature.toFixed(1)}°C</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Weather Condition</p>
                    <p className="text-lg font-semibold text-cyan-400">{weatherData.weatherDescription}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Humidity</p>
                    <p className="text-3xl font-bold text-green-400">{weatherData.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Daily Range</p>
                    <p className="text-lg font-semibold text-orange-400">
                      {weatherData.maxTemp.toFixed(1)}° / {weatherData.minTemp.toFixed(1)}°
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4">📍 Location: {weatherData.latitude}, {weatherData.longitude} | Timezone: {weatherData.timezone}</p>
              </div>
            )}

            {/* Real-Time Data Status */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${batteryData ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-slate-300 text-sm">
                  {batteryData ? `Last updated: ${lastUpdated}` : 'Loading data...'}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setLoading(true)
                  fetch('/api/battery')
                    .then(r => r.json())
                    .then(d => {
                      if (d.success) {
                        setBatteryData(d.current)
                        setHistoryData(d.history)
                        setLastUpdated(new Date().toLocaleTimeString())
                      }
                    })
                    .finally(() => setLoading(false))
                }}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            {/* Key Metrics Grid - Real-Time Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Gauge className="w-8 h-8 text-amber-500" />
                    <span className="text-2xl font-bold text-white">{batteryData ? batteryData.stateOfCharge.toFixed(1) : '85'}%</span>
                  </div>
                  <p className="text-slate-400 text-sm">State of Charge (SoC)</p>
                  <p className="text-slate-500 text-xs mt-2">Coulomb counting method</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="w-8 h-8 text-blue-500" />
                    <span className="text-2xl font-bold text-white">{batteryData ? batteryData.packVoltage.toFixed(1) : '48.5'}V</span>
                  </div>
                  <p className="text-slate-400 text-sm">Pack Voltage</p>
                  <p className="text-slate-500 text-xs mt-2">Real-time measurement</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                    <span className="text-2xl font-bold text-white">{batteryData ? batteryData.chargeCurrent.toFixed(1) : '12.3'}A</span>
                  </div>
                  <p className="text-slate-400 text-sm">Charge/Discharge Current</p>
                  <p className="text-slate-500 text-xs mt-2">Via shunt resistor</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-red-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Thermometer className="w-8 h-8 text-red-500" />
                    <span className="text-2xl font-bold text-white">{batteryData ? batteryData.cellTemperature.toFixed(1) : '32'}°C</span>
                  </div>
                  <p className="text-slate-400 text-sm">Cell Temperature</p>
                  <p className="text-slate-500 text-xs mt-2">Thermistor measurement</p>
                </CardContent>
              </Card>
            </div>

            {/* Data History Table */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">Real-Time Data History (Kaggle Dataset)</h3>
              <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-700/50 border-b border-slate-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-slate-300 font-semibold">Timestamp</th>
                          <th className="px-6 py-3 text-left text-slate-300 font-semibold">SoC (%)</th>
                          <th className="px-6 py-3 text-left text-slate-300 font-semibold">Voltage (V)</th>
                          <th className="px-6 py-3 text-left text-slate-300 font-semibold">Current (A)</th>
                          <th className="px-6 py-3 text-left text-slate-300 font-semibold">Temp (°C)</th>
                          <th className="px-6 py-3 text-left text-slate-300 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        {historyData.slice(-5).reverse().map((data, idx) => (
                          <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                            <td className="px-6 py-3 text-slate-300">{new Date(data.timestamp).toLocaleTimeString()}</td>
                            <td className="px-6 py-3 text-amber-400 font-semibold">{data.stateOfCharge.toFixed(1)}</td>
                            <td className="px-6 py-3 text-blue-400 font-semibold">{data.packVoltage.toFixed(1)}</td>
                            <td className="px-6 py-3 text-green-400 font-semibold">{data.chargeCurrent.toFixed(1)}</td>
                            <td className="px-6 py-3 text-red-400 font-semibold">{data.cellTemperature.toFixed(1)}</td>
                            <td className="px-6 py-3">
                              <Badge className="bg-green-900/50 text-green-300 border-green-700">
                                {data.healthStatus}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hardware & Sensors Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">Sensors & Measurement Hardware</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-amber-500" />
                      Current Measurement
                    </h4>
                    <p className="text-slate-400 text-sm mb-3">Shunt Resistor / Hall-Effect Sensor</p>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• Tracks charge/discharge current flow</li>
                      <li>• Precision shunt resistor for accuracy</li>
                      <li>• Hall-effect sensors as alternative</li>
                      <li>• Real-time monitoring capability</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-500" />
                      Voltage Measurement
                    </h4>
                    <p className="text-slate-400 text-sm mb-3">Pack & Cell Voltage Monitoring</p>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• Measures total pack voltage</li>
                      <li>• Individual cell voltage monitoring</li>
                      <li>• High-precision ADC conversion</li>
                      <li>• Voltage divider circuits</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-red-500" />
                      Temperature Monitoring
                    </h4>
                    <p className="text-slate-400 text-sm mb-3">Thermal Management</p>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• Thermistor-based cell temperature</li>
                      <li>• Multi-point thermal sensing</li>
                      <li>• BMS thermal protection</li>
                      <li>• Overheat prevention</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-purple-500" />
                      Microcontroller & Logger
                    </h4>
                    <p className="text-slate-400 text-sm mb-3">Data Acquisition & Processing</p>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• ESP32 / Raspberry Pi based</li>
                      <li>• Real-time sensor data collection</li>
                      <li>• Local data logging capability</li>
                      <li>• Multi-sensor integration</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* State of Charge Estimation */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">State of Charge (SoC) Estimation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3">Coulomb Counting</h4>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• Integrates current over time</li>
                      <li>• Simple and direct method</li>
                      <li>• Prone to drift over time</li>
                      <li>• Requires calibration</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3">Kalman Filter</h4>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• Extended Kalman Filter (EKF)</li>
                      <li>• Better accuracy than Coulomb</li>
                      <li>• Reduces drift errors</li>
                      <li>• Computationally intensive</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3">Equivalent Circuit Models</h4>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• For large battery systems</li>
                      <li>• BMS internal state estimation</li>
                      <li>• High accuracy potential</li>
                      <li>• Requires model calibration</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Communication & Telemetry */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">Communication & Telemetry</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-cyan-500" />
                      Communication Interfaces
                    </h4>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• Wi-Fi for local/cloud connectivity</li>
                      <li>• LoRa for long-range communication</li>
                      <li>• Bluetooth/BLE for mobile devices</li>
                      <li>• RS-485 for industrial systems</li>
                      <li>• 4G/LTE for remote monitoring</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      Cloud Platforms
                    </h4>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• ThingSpeak for IoT data visualization</li>
                      <li>• Microsoft Azure cloud integration</li>
                      <li>• Custom server solutions</li>
                      <li>• Real-time dashboard access</li>
                      <li>• Historical data storage</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Recommendations by Use Case</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700/50">
                  <CardContent className="p-6">
                    <h4 className="text-green-400 font-semibold mb-3">DIY / Prototyping</h4>
                    <p className="text-slate-300 font-semibold text-sm mb-3">Recommended Stack:</p>
                    <ul className="text-slate-300 space-y-2 text-sm mb-4">
                      <li>• ESP32 microcontroller</li>
                      <li>• INA219 current sensor</li>
                      <li>• Voltage divider circuits</li>
                      <li>• ThingSpeak cloud platform</li>
                      <li>• Custom server option</li>
                    </ul>
                    <p className="text-slate-400 text-xs">Flexible, cost-effective, and suitable for learning and experimentation.</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700/50">
                  <CardContent className="p-6">
                    <h4 className="text-blue-400 font-semibold mb-3">Production / Enterprise</h4>
                    <p className="text-slate-300 font-semibold text-sm mb-3">Recommended Solutions:</p>
                    <ul className="text-slate-300 space-y-2 text-sm mb-4">
                      <li>• Commercial BMS (Fleetel/Jimi)</li>
                      <li>• Robust protection logic</li>
                      <li>• Multiple data interfaces</li>
                      <li>• Cloud integration</li>
                      <li>• Reliability & support</li>
                    </ul>
                    <p className="text-slate-400 text-xs">Enterprise-grade solutions with proven reliability, safety, and comprehensive support.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

const features = [
  {
    title: "AI Digital Twin",
    description:
      "Simulate what-if scenarios before making investment decisions. Test solar panel additions and battery configurations virtually.",
    icon: Brain,
    href: "/digital-twin",
    badge: "Simulation",
  },
  {
    title: "Gamified Dashboard",
    description:
      "Motivate staff and students with progress bars, levels, and challenges. Track energy savings in real-time.",
    icon: TrendingUp,
    href: "/gamified",
    badge: "Engagement",
  },
  {
    title: "AI Chatbot Assistant",
    description:
      "Ask questions in natural language. Get instant answers about energy generation, consumption, and optimization.",
    icon: Sparkles,
    href: "/chatbot",
    badge: "AI Powered",
  },
  {
    title: "Energy Trading",
    description:
      "Peer-to-peer renewable energy sharing via blockchain. Trade surplus energy with transparency and fairness.",
    icon: Zap,
    href: "/trading",
    badge: "Blockchain",
  },
  {
    title: "Student Portal",
    description: "Public-facing engagement portal showing live generation, carbon savings, and environmental impact.",
    icon: Users,
    href: "/engagement",
    badge: "Public",
  },
  {
    title: "Predictive Analytics",
    description:
      "AI-powered anomaly detection, battery health monitoring, and dynamic load scheduling with tariff awareness.",
    icon: Shield,
    href: "/dashboard",
    badge: "Analytics",
  },
  {
    title: "Real-Time Battery Monitoring",
    description:
      "Comprehensive battery data collection with SoC estimation, voltage/current measurement, and thermal monitoring via IoT sensors.",
    icon: Battery,
    href: "/battery",
    badge: "IoT",
  },
]

const stats = [
  { value: "≤8%", label: "Forecast Accuracy", detail: "Mean Absolute Percentage Error" },
  { value: "+22%", label: "Self-Consumption", detail: "Increased renewable usage" },
  { value: "-31%", label: "Peak Grid Draw", detail: "Reduced grid dependency" },
]
