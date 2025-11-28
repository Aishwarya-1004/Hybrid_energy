"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, RotateCcw, TrendingUp, TrendingDown, Zap, Battery, Sun } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Brain } from "lucide-react" // Import the Brain component

export default function DigitalTwinPage() {
  const [solarPanels, setSolarPanels] = useState([100])
  const [batterySize, setBatterySize] = useState([500])
  const [isSimulating, setIsSimulating] = useState(false)

  const runSimulation = () => {
    setIsSimulating(true)
    setTimeout(() => setIsSimulating(false), 2000)
  }

  const solarIncrease = Math.round((solarPanels[0] - 100) * 0.8)
  const costSavings = Math.round(solarIncrease * 45 + (batterySize[0] - 500) * 12)
  const carbonReduction = Math.round(solarIncrease * 1.2 + (batterySize[0] - 500) * 0.3)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <Badge variant="secondary" className="mb-2">
            <Brain className="mr-2 h-3 w-3" />
            AI Simulation Engine
          </Badge>
          <h1 className="text-4xl font-bold md:text-5xl">AI Digital Twin Simulation</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Create a virtual model of your campus to simulate "what if" scenarios. Test investment decisions before
            spending money.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Simulation Controls</CardTitle>
                <CardDescription>Adjust parameters to test scenarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Sun className="h-4 w-4 text-primary" />
                      Solar Panels
                    </label>
                    <span className="text-sm font-semibold">{solarPanels[0]}%</span>
                  </div>
                  <Slider
                    value={solarPanels}
                    onValueChange={setSolarPanels}
                    min={50}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Current: 100% | Testing: {solarPanels[0]}%</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Battery className="h-4 w-4 text-primary" />
                      Battery Capacity
                    </label>
                    <span className="text-sm font-semibold">{batterySize[0]} kWh</span>
                  </div>
                  <Slider
                    value={batterySize}
                    onValueChange={setBatterySize}
                    min={250}
                    max={1000}
                    step={50}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Current: 500 kWh | Testing: {batterySize[0]} kWh</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={runSimulation} disabled={isSimulating} className="flex-1">
                    <Play className="mr-2 h-4 w-4" />
                    {isSimulating ? "Simulating..." : "Run Simulation"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSolarPanels([100])
                      setBatterySize([500])
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-base">Simulation Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Model Accuracy</span>
                  <span className="font-semibold">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Data Points</span>
                  <span className="font-semibold">1.2M</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-semibold">2 min ago</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="impact" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>

              <TabsContent value="impact" className="space-y-6 mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="border-2">
                    <CardContent className="p-6 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4" />
                        Energy Generation
                      </div>
                      <div className="text-3xl font-bold">
                        {solarIncrease >= 0 ? "+" : ""}
                        {solarIncrease}%
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {solarIncrease >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-primary" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        )}
                        <span className="text-muted-foreground">vs current setup</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardContent className="p-6 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrendingDown className="h-4 w-4" />
                        Cost Savings
                      </div>
                      <div className="text-3xl font-bold">₹{costSavings.toLocaleString()}</div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-muted-foreground">per month estimated</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardContent className="p-6 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sun className="h-4 w-4" />
                        Carbon Reduction
                      </div>
                      <div className="text-3xl font-bold">{carbonReduction} kg</div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-muted-foreground">CO₂ per month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Projected Annual Impact</CardTitle>
                    <CardDescription>Based on current simulation parameters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Self-Consumption Rate</span>
                          <span className="text-sm font-semibold">
                            {Math.min(95, 72 + solarIncrease * 0.3).toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={Math.min(95, 72 + solarIncrease * 0.3)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Grid Independence</span>
                          <span className="text-sm font-semibold">
                            {Math.min(85, 58 + solarIncrease * 0.4).toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={Math.min(85, 58 + solarIncrease * 0.4)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Peak Shaving Efficiency</span>
                          <span className="text-sm font-semibold">
                            {Math.min(90, 65 + (batterySize[0] - 500) * 0.04).toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={Math.min(90, 65 + (batterySize[0] - 500) * 0.04)} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financial" className="space-y-6 mt-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Investment Analysis</CardTitle>
                    <CardDescription>Cost-benefit breakdown for proposed changes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Initial Investment</p>
                        <p className="text-2xl font-bold">
                          ₹{((solarPanels[0] - 100) * 85000 + (batterySize[0] - 500) * 12000).toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Payback Period</p>
                        <p className="text-2xl font-bold">
                          {costSavings > 0
                            ? (
                                ((solarPanels[0] - 100) * 85000 + (batterySize[0] - 500) * 12000) /
                                (costSavings * 12)
                              ).toFixed(1)
                            : "N/A"}{" "}
                          years
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Annual Savings</p>
                        <p className="text-2xl font-bold">₹{(costSavings * 12).toLocaleString()}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">10-Year ROI</p>
                        <p className="text-2xl font-bold text-primary">
                          {costSavings > 0
                            ? (
                                ((costSavings * 120) /
                                  ((solarPanels[0] - 100) * 85000 + (batterySize[0] - 500) * 12000) -
                                  1) *
                                100
                              ).toFixed(0)
                            : "0"}
                          %
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technical" className="space-y-6 mt-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                    <CardDescription>System requirements and compatibility</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Total Solar Capacity</span>
                        <span className="font-semibold">{(solarPanels[0] * 5).toFixed(0)} kW</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Battery Storage</span>
                        <span className="font-semibold">{batterySize[0]} kWh</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Inverter Requirement</span>
                        <span className="font-semibold">{(solarPanels[0] * 4.5).toFixed(0)} kW</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Roof Space Needed</span>
                        <span className="font-semibold">{(solarPanels[0] * 35).toFixed(0)} m²</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Grid Connection</span>
                        <Badge variant="secondary">Compatible</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
