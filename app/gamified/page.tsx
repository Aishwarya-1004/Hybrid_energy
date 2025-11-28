"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Zap, Users, TrendingUp, Award, Star, Target, Flame } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function GamifiedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <Badge variant="secondary" className="mb-2">
            <Trophy className="mr-2 h-3 w-3" />
            Gamification Engine
          </Badge>
          <h1 className="text-4xl font-bold md:text-5xl">Gamified Energy Dashboard</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Motivate staff and students with progress bars, levels, and challenges. Track energy savings as
            achievements.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* User Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">EC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Energy Champion</h3>
                    <p className="text-sm text-muted-foreground">Level 12 • Block A</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress to Level 13</span>
                    <span className="font-semibold">2,450 / 3,000 XP</span>
                  </div>
                  <Progress value={81.6} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-primary">847</p>
                    <p className="text-xs text-muted-foreground">Total Points</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-accent">23</p>
                    <p className="text-xs text-muted-foreground">Achievements</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Current Streak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-orange-500/10">
                    <Flame className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">14 Days</p>
                    <p className="text-sm text-muted-foreground">Keep it going!</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className={`h-8 flex-1 rounded ${i < 5 ? "bg-primary" : "bg-muted"}`} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Weekly Ranking</CardTitle>
                <CardDescription>Your position in Block A</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                      #3
                    </div>
                    <div>
                      <p className="font-semibold">3rd Place</p>
                      <p className="text-sm text-muted-foreground">Top 5%</p>
                    </div>
                  </div>
                  <Trophy className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Challenges */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Active Challenges</CardTitle>
                <CardDescription>Complete challenges to earn XP and rewards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 rounded-lg border-2 hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${challenge.color}`}>
                          <challenge.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{challenge.title}</h4>
                          <p className="text-sm text-muted-foreground">{challenge.description}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{challenge.xp} XP</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">
                          {challenge.current} / {challenge.target}
                        </span>
                      </div>
                      <Progress value={(challenge.current / challenge.target) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest unlocked badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className={`p-3 rounded-full ${achievement.color}`}>
                        <achievement.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* This Week's Impact */}
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle>This Week You Saved</CardTitle>
                <CardDescription>Equivalent environmental impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-primary">50</div>
                    <p className="text-sm text-muted-foreground">Hostel rooms powered</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-primary">127 kg</div>
                    <p className="text-sm text-muted-foreground">CO₂ emissions avoided</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-primary">8</div>
                    <p className="text-sm text-muted-foreground">Trees equivalent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Campus Leaderboard</CardTitle>
                <CardDescription>Top energy savers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${
                          index === 0
                            ? "bg-amber-500/20 text-amber-500"
                            : index === 1
                              ? "bg-gray-400/20 text-gray-400"
                              : index === 2
                                ? "bg-orange-600/20 text-orange-600"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {entry.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{entry.name}</p>
                        <p className="text-xs text-muted-foreground">{entry.block}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{entry.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

const challenges = [
  {
    id: 1,
    title: "Peak Hour Hero",
    description: "Reduce consumption during peak hours (6-9 PM) by 15%",
    icon: Zap,
    color: "bg-amber-500/10 text-amber-500",
    current: 12,
    target: 15,
    xp: 150,
  },
  {
    id: 2,
    title: "Solar Champion",
    description: "Use 80% renewable energy for 7 consecutive days",
    icon: Target,
    color: "bg-primary/10 text-primary",
    current: 5,
    target: 7,
    xp: 200,
  },
  {
    id: 3,
    title: "Team Player",
    description: "Help 5 colleagues improve their energy score",
    icon: Users,
    color: "bg-blue-500/10 text-blue-500",
    current: 3,
    target: 5,
    xp: 100,
  },
]

const achievements = [
  {
    id: 1,
    title: "Week Warrior",
    date: "Unlocked 2 days ago",
    icon: Trophy,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    id: 2,
    title: "Green Guardian",
    date: "Unlocked 5 days ago",
    icon: Award,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 3,
    title: "Rising Star",
    date: "Unlocked 1 week ago",
    icon: Star,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    id: 4,
    title: "Efficiency Expert",
    date: "Unlocked 2 weeks ago",
    icon: TrendingUp,
    color: "bg-blue-500/10 text-blue-500",
  },
]

const leaderboard = [
  { id: 1, name: "Rajesh Kumar", block: "Block A", points: 1247 },
  { id: 2, name: "Priya Sharma", block: "Block B", points: 1189 },
  { id: 3, name: "Amit Patel", block: "Block A", points: 1056 },
  { id: 4, name: "Sneha Gupta", block: "Block C", points: 982 },
  { id: 5, name: "Vikram Singh", block: "Block B", points: 847 },
]
