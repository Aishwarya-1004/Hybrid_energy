"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Send, Zap, TrendingUp, Battery, Sun } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ChatbotPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        role: "user",
        content: input,
        timestamp: "Just now",
      },
    ])

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          role: "assistant",
          content: getAIResponse(input),
          timestamp: "Just now",
        },
      ])
    }, 1000)

    setInput("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <Badge variant="secondary" className="mb-2">
            <Sparkles className="mr-2 h-3 w-3" />
            AI Assistant
          </Badge>
          <h1 className="text-4xl font-bold md:text-5xl">AI Chatbot Assistant</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Ask questions in natural language. Get instant answers about energy generation, consumption, and
            optimization strategies.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Quick Questions</CardTitle>
                <CardDescription>Try asking these</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((q) => (
                  <Button
                    key={q.id}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-4 bg-transparent"
                    onClick={() => setInput(q.question)}
                  >
                    <q.icon className="mr-2 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm">{q.question}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-base">AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground">Real-time energy data analysis</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground">Predictive maintenance alerts</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground">Optimization recommendations</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground">Historical trend analysis</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground">Natural language queries</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Today's Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">94.2%</p>
                  <p className="text-xs text-muted-foreground">Solar efficiency today</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">3.2 hrs</p>
                  <p className="text-xs text-muted-foreground">Peak generation window</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">₹8,450</p>
                  <p className="text-xs text-muted-foreground">Estimated savings</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="border-2 h-[700px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Sparkles className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Energy AI Assistant</CardTitle>
                    <CardDescription>Powered by GPT-4 • Always online</CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    <div className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
                    Active
                  </Badge>
                </div>
              </CardHeader>

              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                      <Avatar
                        className={`h-8 w-8 shrink-0 ${message.role === "assistant" ? "border-2 border-primary" : ""}`}
                      >
                        <AvatarFallback
                          className={
                            message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-secondary"
                          }
                        >
                          {message.role === "assistant" ? <Sparkles className="h-4 w-4" /> : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 space-y-1 ${message.role === "user" ? "flex flex-col items-end" : ""}`}>
                        <div
                          className={`inline-block rounded-lg px-4 py-3 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground px-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about energy generation, consumption, or optimization..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 px-1">
                  AI can make mistakes. Verify critical information.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

const quickQuestions = [
  { id: 1, question: "How much solar energy did we generate today?", icon: Sun },
  { id: 2, question: "When should I charge the batteries?", icon: Battery },
  { id: 3, question: "What's our current grid consumption?", icon: Zap },
  { id: 4, question: "Show me this week's efficiency trends", icon: TrendingUp },
]

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm your AI Energy Assistant. I can help you understand your campus energy data, provide optimization recommendations, and answer questions about solar generation, battery storage, and grid consumption. What would you like to know?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    role: "user",
    content: "What's our solar generation looking like today?",
    timestamp: "10:31 AM",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Today's solar generation is performing excellently! We've generated 847 kWh so far (as of 10:30 AM), which is 12% above the forecast. Peak generation occurred between 11 AM - 2 PM with an average of 156 kW. Current efficiency is at 94.2%, and weather conditions are optimal for the rest of the day. Would you like me to show you a detailed breakdown by block?",
    timestamp: "10:31 AM",
  },
]

function getAIResponse(question: string): string {
  const q = question.toLowerCase()

  if (q.includes("battery") || q.includes("charge")) {
    return "Based on current forecasts and tariff rates, I recommend charging batteries between 11 AM - 2 PM today when solar generation peaks. The batteries are currently at 67% capacity (335 kWh). Optimal discharge window will be 6-9 PM during peak demand hours, which could save approximately ₹2,400 in grid costs."
  }

  if (q.includes("grid") || q.includes("consumption")) {
    return "Current grid consumption is 234 kW, which is 18% lower than yesterday at this time. Peak grid draw today was 412 kW at 8:15 AM. We're on track to reduce grid dependency by 31% this month through optimized battery discharge and load shifting. Would you like recommendations for further reduction?"
  }

  if (q.includes("trend") || q.includes("week")) {
    return "This week shows excellent trends! Solar self-consumption increased by 8%, peak shaving efficiency improved to 89%, and we avoided ₹12,450 in grid costs. Monday and Wednesday had the best performance with 95%+ renewable usage. I've identified 3 optimization opportunities that could save an additional ₹3,200/week."
  }

  return "I can help you with that! Could you provide more specific details about what aspect of energy management you'd like to explore? I have access to real-time data on solar generation, battery status, grid consumption, forecasts, and optimization recommendations."
}
