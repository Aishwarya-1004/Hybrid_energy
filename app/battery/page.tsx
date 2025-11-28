'use client'

import { useState, useEffect } from 'react'
import { 
  Menu, X, Zap, Thermometer, Gauge, AlertCircle, Cpu, Wifi, Shield, 
  TrendingUp, Download, RefreshCw, Battery, BatteryCharging, Activity,
  Clock, Server, BarChart3, LineChart as LineChartIcon, Settings,
  AlertTriangle, CheckCircle, Info, ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Scatter, ScatterChart, ZAxis
} from 'recharts'

interface BatteryData {
  stateOfCharge: number
  packVoltage: number
  chargeCurrent: number
  cellTemperature: number
  cycleCount: number
  healthStatus: string
  timestamp: string
}

interface CellData {
  id: number
  voltage: number
  temperature: number
  resistance: number
  capacity: number
}

interface PredictiveData {
  timeToFull: string
  timeToEmpty: string
  estimatedLifespan: number
  degradationRate: number
}

export default function BatteryPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [batteryData, setBatteryData] = useState<BatteryData | null>(null)
  const [historyData, setHistoryData] = useState<BatteryData[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch real-time battery data
  useEffect(() => {
    const fetchBatteryData = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/battery')
        const data = await response.json()
        if (data.success) {
          setBatteryData(data.current)
          setHistoryData(data.history)
        }
      } catch (error) {
        console.error('Error fetching battery data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBatteryData()
    const interval = setInterval(fetchBatteryData, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hamburger Menu */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Energy Monitor</h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Menu Dropdown */}
        {menuOpen && (
          <div className="border-t border-slate-700 bg-slate-800/50 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <Button
                className="w-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <Zap className="w-4 h-4" />
                Battery Monitor
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="pt-24 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Real-Time Battery Monitoring System</h2>
            <p className="text-slate-300 text-lg">
              Comprehensive battery data collection, analysis, and state estimation
            </p>
          </div>

          {/* Real-Time Status & Controls */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${batteryData ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-slate-300 text-sm">
                {batteryData ? 'Live Data Connected' : 'Loading data...'}
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

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Cycle Count</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyan-400">{batteryData ? batteryData.cycleCount : '245'}</p>
                <p className="text-slate-400 text-sm mt-2">Total charge/discharge cycles</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Health Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-400">{batteryData ? batteryData.healthStatus : 'Good'}</p>
                <p className="text-slate-400 text-sm mt-2">Overall battery health</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Energy Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-400">48.5 kWh</p>
                <p className="text-slate-400 text-sm mt-2">Total usable capacity</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* SoC & Voltage Trend */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">State of Charge & Voltage Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="timestamp" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="stateOfCharge" 
                      stroke="#f59e0b" 
                      name="SoC (%)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="packVoltage" 
                      stroke="#3b82f6" 
                      name="Voltage (V)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Current & Temperature Trend */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Current & Temperature Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="timestamp" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="chargeCurrent" 
                      stroke="#10b981" 
                      name="Current (A)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cellTemperature" 
                      stroke="#ef4444" 
                      name="Temp (°C)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Voltage Distribution */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Voltage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'Min', value: 47.2 },
                    { name: 'Current', value: batteryData?.packVoltage || 48.5 },
                    { name: 'Max', value: 50.0 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Temperature Range */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Temperature Range</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'Min', value: 28 },
                    { name: 'Current', value: batteryData?.cellTemperature || 32 },
                    { name: 'Max', value: 45 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Bar dataKey="value" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Hardware & Sensors Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Sensors & Measurement Hardware</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-amber-500" />
                    Current Measurement
                  </CardTitle>
                  <CardDescription className="text-slate-400">Shunt Resistor / Hall-Effect Sensor</CardDescription>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p>• Tracks charge/discharge current flow</p>
                  <p>• Precision shunt resistor for accuracy</p>
                  <p>• Hall-effect sensors as alternative</p>
                  <p>• Real-time monitoring capability</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                    Voltage Measurement
                  </CardTitle>
                  <CardDescription className="text-slate-400">Pack & Cell Voltage Monitoring</CardDescription>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p>• Measures total pack voltage</p>
                  <p>• Individual cell voltage monitoring</p>
                  <p>• High-precision ADC conversion</p>
                  <p>• Voltage divider circuits</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-red-500" />
                    Temperature Monitoring
                  </CardTitle>
                  <CardDescription className="text-slate-400">Thermal Management</CardDescription>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p>• Thermistor-based cell temperature</p>
                  <p>• Multi-point thermal sensing</p>
                  <p>• BMS thermal protection</p>
                  <p>• Overheat prevention</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-purple-500" />
                    Microcontroller & Logger
                  </CardTitle>
                  <CardDescription className="text-slate-400">Data Acquisition & Processing</CardDescription>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p>• ESP32 / Raspberry Pi based</p>
                  <p>• Real-time sensor data collection</p>
                  <p>• Local data logging capability</p>
                  <p>• Multi-sensor integration</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* State of Charge Estimation */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">State of Charge (SoC) Estimation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Coulomb Counting</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-3">
                  <p className="text-sm">• Integrates current over time</p>
                  <p className="text-sm">• Simple and direct method</p>
                  <p className="text-sm">• Prone to drift over time</p>
                  <p className="text-sm">• Requires calibration</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Kalman Filter</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-3">
                  <p className="text-sm">• Extended Kalman Filter (EKF)</p>
                  <p className="text-sm">• Better accuracy than Coulomb</p>
                  <p className="text-sm">• Reduces drift errors</p>
                  <p className="text-sm">• Computationally intensive</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Equivalent Circuit Models</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-3">
                  <p className="text-sm">• For large battery systems</p>
                  <p className="text-sm">• BMS internal state estimation</p>
                  <p className="text-sm">• High accuracy potential</p>
                  <p className="text-sm">• Requires model calibration</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Communication & Telemetry */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Communication & Telemetry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-cyan-500" />
                    Communication Interfaces
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p>• Wi-Fi for local/cloud connectivity</p>
                  <p>• LoRa for long-range communication</p>
                  <p>• Bluetooth/BLE for mobile devices</p>
                  <p>• RS-485 for industrial systems</p>
                  <p>• 4G/LTE for remote monitoring</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Cloud Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p>• ThingSpeak for IoT data visualization</p>
                  <p>• Microsoft Azure cloud integration</p>
                  <p>• Custom server solutions</p>
                  <p>• Real-time dashboard access</p>
                  <p>• Historical data storage</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Battery Management System */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Battery Management System (BMS)</h3>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-amber-500" />
                      Core Functions
                    </h4>
                    <ul className="text-slate-300 space-y-2">
                      <li>✓ Cell monitoring and balancing</li>
                      <li>✓ Over/under voltage protection</li>
                      <li>✓ Temperature management</li>
                      <li>✓ Current limiting</li>
                      <li>✓ State of Health (SoH) tracking</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      Real-Time Metrics
                    </h4>
                    <ul className="text-slate-300 space-y-2">
                      <li>✓ Pack voltage monitoring</li>
                      <li>✓ Charge/discharge current</li>
                      <li>✓ Cell temperature data</li>
                      <li>✓ Cycle count tracking</li>
                      <li>✓ Health metrics reporting</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Commercial Solutions */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Ready-Made Commercial Solutions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">Fleetel IoT</CardTitle>
                  <CardDescription className="text-slate-400">Enterprise BMS Solution</CardDescription>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p className="text-sm">• Real-time data collection</p>
                  <p className="text-sm">• Pack voltage monitoring</p>
                  <p className="text-sm">• Charge/discharge current</p>
                  <p className="text-sm">• Temperature tracking</p>
                  <p className="text-sm">• Cycle count analytics</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">Kemsys</CardTitle>
                  <CardDescription className="text-slate-400">Cloud-Integrated BMS</CardDescription>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p className="text-sm">• SPI/I2C interface support</p>
                  <p className="text-sm">• Azure cloud integration</p>
                  <p className="text-sm">• Real-time monitoring</p>
                  <p className="text-sm">• Advanced analytics</p>
                  <p className="text-sm">• Predictive maintenance</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">Jimi IoT BMS</CardTitle>
                  <CardDescription className="text-slate-400">Multi-Protocol Solution</CardDescription>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p className="text-sm">• RS-485 interface</p>
                  <p className="text-sm">• Bluetooth/BLE support</p>
                  <p className="text-sm">• 4G connectivity</p>
                  <p className="text-sm">• Real-time tracking</p>
                  <p className="text-sm">• Multiple data interfaces</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Challenges & Considerations */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Challenges & Considerations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-red-900/20 border-red-700/50">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Technical Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p>• SoC accuracy: Coulomb counting drift</p>
                  <p>• Sensor precision requirements</p>
                  <p>• Communication reliability</p>
                  <p>• Power consumption overhead</p>
                  <p>• Temperature compensation</p>
                </CardContent>
              </Card>

              <Card className="bg-amber-900/20 border-amber-700/50">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Safety Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p>• Overcurrent protection</p>
                  <p>• Overvoltage safeguards</p>
                  <p>• Cell balancing requirements</p>
                  <p>• Thermal runaway prevention</p>
                  <p>• High-power pack handling</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Recommendations by Use Case</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700/50">
                <CardHeader>
                  <CardTitle className="text-green-400">DIY / Prototyping</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-3">
                  <p className="font-semibold">Recommended Stack:</p>
                  <ul className="space-y-2">
                    <li>• ESP32 microcontroller</li>
                    <li>• INA219 current sensor</li>
                    <li>• Voltage divider circuits</li>
                    <li>• ThingSpeak cloud platform</li>
                    <li>• Custom server option</li>
                  </ul>
                  <p className="text-sm text-slate-400 mt-4">Flexible, cost-effective, and suitable for learning and experimentation.</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-blue-400">Production / Enterprise</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-3">
                  <p className="font-semibold">Recommended Solutions:</p>
                  <ul className="space-y-2">
                    <li>• Commercial BMS (Fleetel/Jimi)</li>
                    <li>• Robust protection logic</li>
                    <li>• Multiple data interfaces</li>
                    <li>• Cloud integration</li>
                    <li>• Reliability & support</li>
                  </ul>
                  <p className="text-sm text-slate-400 mt-4">Enterprise-grade solutions with proven reliability, safety, and comprehensive support.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
