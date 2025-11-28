"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Sun, Zap, TrendingDown, Leaf, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EngagementPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <Badge variant="secondary" className="mb-2">
            <Users className="mr-2 h-3 w-3" />
            Public Portal
          </Badge>
          <h1 className="text-4xl font-bold md:text-5xl">Student Engagement Portal</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Live renewable generation, carbon savings, and environmental impact. Building awareness and social impact
            across campus.
          </p>
        </div>

        {/* Live Stats Hero */}
        <Card className="border-2 mb-8 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5">
          <CardContent className="p-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-2">
                  <Sun className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-primary">847 kWh</p>
                <p className="text-sm text-muted-foreground">Generated Today</p>
                <Badge variant="secondary" className="text-xs">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  +12% vs forecast
                </Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-2">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-primary">234 kW</p>
                <p className="text-sm text-muted-foreground">Current Usage</p>
                <Badge variant="secondary" className="text-xs">
                  Live
                </Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-2">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-primary">1.2 tons</p>
                <p className="text-sm text-muted-foreground">CO₂ Saved This Month</p>
                <Badge variant="secondary" className="text-xs">
                  = 54 trees
                </Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-2">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-primary">₹84,500</p>
                <p className="text-sm text-muted-foreground">Cost Savings</p>
                <Badge variant="secondary" className="text-xs">
                  This month
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="live">Live Data</TabsTrigger>
            <TabsTrigger value="impact">Our Impact</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="learn">Learn More</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Real-Time Generation</CardTitle>
                  <CardDescription>Solar power output by block</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blocks.map((block) => (
                    <div key={block.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{block.name}</span>
                        <span className="font-semibold">{block.current} kW</span>
                      </div>
                      <Progress value={(block.current / block.capacity) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Capacity: {block.capacity} kW • Efficiency: {block.efficiency}%
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Energy Mix</CardTitle>
                  <CardDescription>Current power sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-primary" />
                          <span className="font-medium">Solar</span>
                        </div>
                        <span className="font-semibold">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-accent" />
                          <span className="font-medium">Battery</span>
                        </div>
                        <span className="font-semibold">16%</span>
                      </div>
                      <Progress value={16} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-muted" />
                          <span className="font-medium">Grid</span>
                        </div>
                        <span className="font-semibold">12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground text-center">
                      <span className="font-semibold text-primary">88%</span> of our energy is renewable right now
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Today's Timeline</CardTitle>
                <CardDescription>Hour-by-hour energy generation and consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timeline.map((hour) => (
                    <div key={hour.time} className="flex items-center gap-4">
                      <span className="text-sm font-medium w-20 text-muted-foreground">{hour.time}</span>
                      <div className="flex-1 flex gap-2">
                        <div className="flex-1 bg-secondary rounded-full h-8 overflow-hidden flex">
                          <div
                            className="bg-primary flex items-center justify-end px-2"
                            style={{ width: `${hour.generation}%` }}
                          >
                            <span className="text-xs font-semibold text-primary-foreground">{hour.generation}%</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold w-16 text-right">{hour.kwh} kWh</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-base">This Year</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">12.4 tons</p>
                    <p className="text-sm text-muted-foreground">CO₂ emissions avoided</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">₹9.2L</p>
                    <p className="text-sm text-muted-foreground">Cost savings</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">558 MWh</p>
                    <p className="text-sm text-muted-foreground">Renewable energy generated</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-base">Environmental Equivalent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Trees planted</span>
                    <span className="font-semibold">558</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Cars off road (1 year)</span>
                    <span className="font-semibold">2.7</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Homes powered (1 day)</span>
                    <span className="font-semibold">42</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Smartphones charged</span>
                    <span className="font-semibold">67,440</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-base">Student Contribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every student on campus contributes to our sustainability goals. Your awareness and participation
                    make a difference.
                  </p>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">2,847</p>
                    <p className="text-sm text-muted-foreground">Active participants</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">94%</p>
                    <p className="text-sm text-muted-foreground">Awareness rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>Tracking our sustainability journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {monthlyStats.map((stat) => (
                    <div key={stat.month} className="space-y-3 p-4 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{stat.month}</h4>
                        <Badge variant="secondary">{stat.change}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Generated</p>
                          <p className="font-semibold">{stat.generated} MWh</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Saved</p>
                          <p className="font-semibold">₹{stat.saved}K</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">CO₂ Avoided</p>
                          <p className="font-semibold">{stat.co2} tons</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6 mt-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Campus Sustainability Goals</CardTitle>
                <CardDescription>Our targets for 2025</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.id} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${goal.color}`}>
                          <goal.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                        </div>
                      </div>
                      <Badge variant={goal.progress >= 100 ? "default" : "secondary"}>{goal.progress}%</Badge>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Target: {goal.target} • Current: {goal.current}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learn" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {learnCards.map((card) => (
                <Card key={card.id} className="border-2">
                  <CardHeader>
                    <div className={`inline-flex p-3 rounded-lg ${card.color} mb-2`}>
                      <card.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {card.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

const blocks = [
  { name: "Block A - Academic", current: 156, capacity: 200, efficiency: 94 },
  { name: "Block B - Hostels", current: 142, capacity: 180, efficiency: 92 },
  { name: "Block C - Labs", current: 98, capacity: 150, efficiency: 89 },
  { name: "Block D - Admin", current: 67, capacity: 100, efficiency: 91 },
]

const timeline = [
  { time: "6:00 AM", generation: 15, kwh: 23 },
  { time: "9:00 AM", generation: 65, kwh: 98 },
  { time: "12:00 PM", generation: 95, kwh: 156 },
  { time: "3:00 PM", generation: 85, kwh: 142 },
  { time: "6:00 PM", generation: 25, kwh: 45 },
  { time: "9:00 PM", generation: 0, kwh: 0 },
]

const monthlyStats = [
  { month: "January", generated: 48.2, saved: 78, co2: 1.1, change: "+8%" },
  { month: "February", generated: 52.1, saved: 84, co2: 1.2, change: "+12%" },
  { month: "March", generated: 56.8, saved: 92, co2: 1.3, change: "+15%" },
]

const goals = [
  {
    id: 1,
    title: "80% Renewable Energy",
    description: "Achieve 80% of campus energy from renewable sources",
    icon: Sun,
    color: "bg-primary/10 text-primary",
    progress: 72,
    current: "72%",
    target: "80%",
  },
  {
    id: 2,
    title: "Carbon Neutral Campus",
    description: "Reduce net carbon emissions to zero",
    icon: Leaf,
    color: "bg-green-500/10 text-green-500",
    progress: 58,
    current: "58%",
    target: "100%",
  },
  {
    id: 3,
    title: "Peak Demand Reduction",
    description: "Cut peak grid demand by 40%",
    icon: TrendingDown,
    color: "bg-blue-500/10 text-blue-500",
    progress: 31,
    current: "31%",
    target: "40%",
  },
  {
    id: 4,
    title: "Student Engagement",
    description: "95% student awareness and participation",
    icon: Users,
    color: "bg-purple-500/10 text-purple-500",
    progress: 94,
    current: "94%",
    target: "95%",
  },
]

const learnCards = [
  {
    id: 1,
    title: "How Solar Panels Work",
    description: "Understanding photovoltaic technology",
    icon: Sun,
    color: "bg-primary/10 text-primary",
    points: [
      "Solar cells convert sunlight directly into electricity",
      "Peak generation occurs between 11 AM - 2 PM",
      "Our campus has 500 kW total solar capacity",
      "Each panel generates ~300W under optimal conditions",
    ],
  },
  {
    id: 2,
    title: "Battery Storage Benefits",
    description: "Why energy storage matters",
    icon: Zap,
    color: "bg-accent/10 text-accent",
    points: [
      "Stores excess solar energy for nighttime use",
      "Reduces peak demand charges from the grid",
      "Provides backup power during outages",
      "Enables time-of-use optimization",
    ],
  },
  {
    id: 3,
    title: "Your Carbon Footprint",
    description: "Understanding environmental impact",
    icon: Leaf,
    color: "bg-green-500/10 text-green-500",
    points: [
      "Average student: ~2 tons CO₂ per year",
      "Renewable energy reduces this by 60-80%",
      "Small actions compound across 3,000 students",
      "Track your personal impact in the app",
    ],
  },
  {
    id: 4,
    title: "Get Involved",
    description: "How you can contribute",
    icon: Users,
    color: "bg-purple-500/10 text-purple-500",
    points: [
      "Join the Energy Awareness Club",
      "Participate in weekly challenges",
      "Share tips with your hostel block",
      "Volunteer for sustainability projects",
    ],
  },
]
