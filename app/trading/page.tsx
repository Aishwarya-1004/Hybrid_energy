"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, ArrowRightLeft, Shield, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function TradingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <Badge variant="secondary" className="mb-2">
            <Shield className="mr-2 h-3 w-3" />
            Blockchain Powered
          </Badge>
          <h1 className="text-4xl font-bold md:text-5xl">Peer-to-Peer Energy Trading</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Trade surplus renewable energy with other campuses via blockchain. Transparent, fair, and secure energy
            exchange.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Trading Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 bg-gradient-to-br from-primary/10 to-accent/10">
              <CardHeader>
                <CardTitle className="text-base">Your Energy Wallet</CardTitle>
                <CardDescription>Available for trading</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Surplus Energy</p>
                  <p className="text-3xl font-bold text-primary">127 kWh</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Energy Tokens</p>
                  <p className="text-3xl font-bold">1,847 ECT</p>
                  <p className="text-xs text-muted-foreground">1 ECT = 0.1 kWh</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Button className="w-full">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Sell
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <TrendingDown className="mr-2 h-4 w-4" />
                    Buy
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Market Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Price</span>
                  <span className="font-semibold">₹6.80/kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">24h Change</span>
                  <span className="font-semibold text-primary">+2.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Volume (24h)</span>
                  <span className="font-semibold">8,450 kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Traders</span>
                  <span className="font-semibold">47</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Carbon Credits</CardTitle>
                <CardDescription>Earned from trading</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">342 kg</p>
                  <p className="text-xs text-muted-foreground">CO₂ offset this month</p>
                </div>
                <Progress value={68} className="h-2" />
                <p className="text-xs text-muted-foreground">68% towards next milestone</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Trading Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="market" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="market">Market</TabsTrigger>
                <TabsTrigger value="orders">My Orders</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="market" className="space-y-6 mt-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Active Buy Orders</CardTitle>
                    <CardDescription>Campuses looking to purchase energy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {buyOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{order.campus}</p>
                              <Badge variant="secondary" className="text-xs">
                                {order.block}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Wants {order.amount} kWh</p>
                          </div>
                          <div className="text-right mr-4">
                            <p className="font-bold text-lg">₹{order.price}</p>
                            <p className="text-xs text-muted-foreground">per kWh</p>
                          </div>
                          <Button size="sm">
                            <ArrowRightLeft className="mr-2 h-3 w-3" />
                            Sell
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Active Sell Orders</CardTitle>
                    <CardDescription>Surplus energy available for purchase</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sellOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{order.campus}</p>
                              <Badge variant="secondary" className="text-xs">
                                {order.block}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Selling {order.amount} kWh</p>
                          </div>
                          <div className="text-right mr-4">
                            <p className="font-bold text-lg">₹{order.price}</p>
                            <p className="text-xs text-muted-foreground">per kWh</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <ArrowRightLeft className="mr-2 h-3 w-3" />
                            Buy
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6 mt-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Your Active Orders</CardTitle>
                    <CardDescription>Pending buy and sell orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {myOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${order.type === "sell" ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-500"}`}
                            >
                              {order.type === "sell" ? (
                                <TrendingUp className="h-4 w-4" />
                              ) : (
                                <TrendingDown className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold capitalize">
                                {order.type} {order.amount} kWh
                              </p>
                              <p className="text-sm text-muted-foreground">@ ₹{order.price}/kWh</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant={order.status === "pending" ? "secondary" : "default"}>{order.status}</Badge>
                            <Button size="sm" variant="outline">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6 mt-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Your completed trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tradeHistory.map((trade) => (
                        <div key={trade.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${trade.type === "sold" ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-500"}`}
                            >
                              <ArrowRightLeft className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-semibold capitalize">
                                {trade.type} {trade.amount} kWh
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {trade.date}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{trade.total}</p>
                            <p className="text-xs text-muted-foreground">@ ₹{trade.price}/kWh</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Blockchain Info */}
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-base">Blockchain Transparency</CardTitle>
                <CardDescription>All transactions are immutably recorded</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Total Transactions</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Network Nodes</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Avg. Settlement</p>
                    <p className="text-2xl font-bold">2.3s</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                  <Shield className="h-3 w-3" />
                  <span>Secured by Ethereum blockchain • Smart contract verified</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

const buyOrders = [
  { id: 1, campus: "MNIT Jaipur", block: "Block C", amount: 85, price: "6.90" },
  { id: 2, campus: "RTU Kota", block: "Block A", amount: 120, price: "6.85" },
  { id: 3, campus: "NIT Jaipur", block: "Block B", amount: 65, price: "6.80" },
]

const sellOrders = [
  { id: 1, campus: "IIT Jodhpur", block: "Block A", amount: 95, price: "6.75" },
  { id: 2, campus: "BITS Pilani", block: "Block D", amount: 140, price: "6.70" },
  { id: 3, campus: "MNIT Jaipur", block: "Block A", amount: 75, price: "6.65" },
]

const myOrders = [
  { id: 1, type: "sell", amount: 50, price: "6.80", status: "pending" },
  { id: 2, type: "buy", amount: 30, price: "6.75", status: "partial" },
]

const tradeHistory = [
  { id: 1, type: "sold", amount: 45, price: "6.85", total: "308.25", date: "2 hours ago" },
  { id: 2, type: "bought", amount: 60, price: "6.70", total: "402.00", date: "5 hours ago" },
  { id: 3, type: "sold", amount: 80, price: "6.90", total: "552.00", date: "Yesterday" },
  { id: 4, type: "bought", amount: 35, price: "6.75", total: "236.25", date: "2 days ago" },
]
