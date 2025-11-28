"use client"

import { useMemo, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area, BarChart, Bar } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartTooltip,
  ChartLegend,
} from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

const kpis = [
  { k: "Self-Consumption", v: "68%" },
  { k: "Peak Grid Draw", v: "−31%" },
  { k: "Forecast Error", v: "7.9% MAPE" },
  { k: "CO₂ Avoided", v: "1.4t / mo" },
]

const seed = [
  { t: "06", solar: 2, wind: 18, load: 30 },
  { t: "08", solar: 14, wind: 16, load: 42 },
  { t: "10", solar: 28, wind: 14, load: 50 },
  { t: "12", solar: 40, wind: 12, load: 55 },
  { t: "14", solar: 36, wind: 14, load: 53 },
  { t: "16", solar: 20, wind: 18, load: 49 },
  { t: "18", solar: 4, wind: 24, load: 46 },
  { t: "20", solar: 0, wind: 22, load: 44 },
]

const seedSoc = [
  { h: "0", soc: 52 },
  { h: "4", soc: 49 },
  { h: "8", soc: 58 },
  { h: "12", soc: 66 },
  { h: "16", soc: 73 },
  { h: "20", soc: 63 },
  { h: "24", soc: 60 },
]

type GenPoint = { t: string; solar: number; wind: number; load: number; grid: number }

function toCSV(rows: Record<string, string | number>[]) {
  if (!rows.length) return ""
  const headers = Object.keys(rows[0])
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h] ?? "")).join(","))].join("\n")
}

export default function DashboardPage() {
  const chartConfig = useMemo(
    () => ({
      solar: { label: "Solar (kW)", color: "var(--color-chart-1)" },
      wind: { label: "Wind (kW)", color: "var(--color-chart-2)" },
      load: { label: "Load (kW)", color: "var(--color-chart-3)" },
      grid: { label: "Grid (kW)", color: "var(--color-chart-5)" },
      soc: { label: "Battery SoC (%)", color: "var(--color-chart-4)" },
    }),
    [],
  )

  const [optimizeBattery, setOptimizeBattery] = useState(true)
  const [targetSoc, setTargetSoc] = useState(70)
  const [live, setLive] = useState(true)

  const [generation, setGeneration] = useState<GenPoint[]>(
    seed.map((d) => ({ ...d, grid: Math.max(d.load - (d.solar + d.wind), 0) })),
  )
  const [socData, setSocData] = useState(seedSoc)

  useEffect(() => {
    if (!live) return
    const id = setInterval(() => {
      setGeneration((prev) =>
        prev.map((p) => {
          const jitter = (v: number, pct: number) => Math.max(0, +(v * (1 + (Math.random() - 0.5) * pct)).toFixed(1))
          const solar = jitter(p.solar, 0.08)
          const wind = jitter(p.wind, 0.08)
          let load = jitter(p.load, 0.05)
          if (optimizeBattery && Number(targetSoc) >= 65) {
            load = Math.max(0, +(load * 0.96).toFixed(1))
          }
          const grid = Math.max(0, +(load - (solar + wind)).toFixed(1))
          return { ...p, solar, wind, load, grid }
        }),
      )
      setSocData((prev) =>
        prev.map((p, i) => {
          const last = prev[i]?.soc ?? 60
          const delta = optimizeBattery ? (i >= 2 && i <= 4 ? +2 : i >= 5 ? -3 : -1) : -1
          const drifted = Math.max(10, Math.min(95, last + delta))
          return { ...p, soc: drifted }
        }),
      )
    }, 1800)
    return () => clearInterval(id)
  }, [live, optimizeBattery, targetSoc])

  const alerts = useMemo(() => {
    const highGrid = generation.some((g) => g.grid > 18)
    const lowSoc = socData.some((s) => s.soc < 35)
    const msgs: string[] = []
    if (highGrid) msgs.push("High grid import detected. Consider shifting non-critical loads.")
    if (lowSoc) msgs.push("Battery SoC trending low. Raise target or enable optimization.")
    if (!msgs.length) msgs.push("All systems nominal.")
    return msgs
  }, [generation, socData])

  const exportCSV = () => {
    const rows = generation.map((g) => ({ time: g.t, solar: g.solar, wind: g.wind, load: g.load, grid: g.grid }))
    const csv = toCSV(rows)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "generation.csv"
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    toast({ title: "Report exported", description: "Saved generation.csv", duration: 2500 })
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Live Dashboard</h1>
        <p className="text-muted-foreground">Virtual power plant overview—Rajasthan campus pilot</p>
      </header>

      <section className="grid gap-6 md:grid-cols-4">
        {kpis.map((m) => (
          <Card key={m.k}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{m.k}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-semibold">{m.v}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <section className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Generation vs Load</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <ChartContainer config={chartConfig} className="rounded-lg border border-border bg-background p-3">
                  <LineChart data={generation}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="t" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="solar" stroke="var(--color-solar)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="wind" stroke="var(--color-wind)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="load" stroke="var(--color-load)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="grid" stroke="var(--color-grid)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Battery State of Charge</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <ChartContainer config={chartConfig} className="rounded-lg border border-border bg-background p-3">
                  <AreaChart data={socData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="h" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="soc"
                      stroke="var(--color-soc)"
                      fill="var(--color-soc)"
                      fillOpacity={0.15}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </section>

          <section className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Load Shifting Impact (Today)</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <ChartContainer config={chartConfig} className="rounded-lg border border-border bg-background p-3">
                  <BarChart
                    data={[
                      { block: "Morning", shifted: 6, baseline: 12 },
                      { block: "Midday", shifted: 18, baseline: 24 },
                      { block: "Evening", shifted: 10, baseline: 14 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="block" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="baseline" name="Baseline (kWh)" fill="var(--color-chart-3)" />
                    <Bar dataKey="shifted" name="After Shift (kWh)" fill="var(--color-chart-1)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="controls" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Controls</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Battery Optimization</p>
                  <p className="text-muted-foreground text-sm">Enable smart charge/discharge recommendations</p>
                </div>
                <Switch
                  checked={optimizeBattery}
                  onCheckedChange={setOptimizeBattery}
                  aria-label="Toggle battery optimization"
                />
              </div>

              <div className="rounded-lg border p-4">
                <p className="font-medium">Target SoC</p>
                <p className="text-muted-foreground text-sm mb-3">Preferred battery target for daytime</p>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[targetSoc]}
                    onValueChange={(v) => setTargetSoc(v[0] ?? 70)}
                    min={20}
                    max={95}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-10 text-right font-mono">{targetSoc}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Live Simulation</p>
                  <p className="text-muted-foreground text-sm">Animate data updates every ~2s</p>
                </div>
                <Switch checked={live} onCheckedChange={setLive} aria-label="Toggle live simulation" />
              </div>

              <div className="rounded-lg border p-4">
                <p className="font-medium">Actions</p>
                <p className="text-muted-foreground text-sm mb-3">Apply the above optimization preferences</p>
                <Button
                  className="bg-primary text-primary-foreground"
                  onClick={() =>
                    toast({ title: "Optimization applied", description: "Your preferences have been applied." })
                  }
                >
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((a, i) => (
                <div key={i} className="rounded-md border bg-secondary px-3 py-2 text-sm">
                  {a}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reporting & Export</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Download the current Generation vs Load dataset as CSV for further analysis.
              </p>
              <Button className="bg-primary text-primary-foreground" onClick={exportCSV}>
                Export CSV
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
