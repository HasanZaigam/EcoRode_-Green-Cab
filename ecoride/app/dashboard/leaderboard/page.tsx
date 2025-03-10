"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Leaf, Medal, Search, Trophy, Users } from "lucide-react"

// Mock data for leaderboard
const leaderboardData = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=40&width=40",
    greenCoins: 1250,
    carbonSaved: 312.5,
    treesPlanted: 25,
    isCurrentUser: false,
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "/placeholder.svg?height=40&width=40",
    greenCoins: 980,
    carbonSaved: 245.0,
    treesPlanted: 19,
    isCurrentUser: false,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    image: "/placeholder.svg?height=40&width=40",
    greenCoins: 875,
    carbonSaved: 218.8,
    treesPlanted: 17,
    isCurrentUser: false,
  },
  {
    id: 4,
    name: "David Kim",
    image: "/placeholder.svg?height=40&width=40",
    greenCoins: 720,
    carbonSaved: 180.0,
    treesPlanted: 14,
    isCurrentUser: false,
  },
  {
    id: 5,
    name: "Olivia Patel",
    image: "/placeholder.svg?height=40&width=40",
    greenCoins: 650,
    carbonSaved: 162.5,
    treesPlanted: 13,
    isCurrentUser: false,
  },
  {
    id: 42,
    name: "Demo User",
    image: "/placeholder.svg?height=40&width=40",
    greenCoins: 120,
    carbonSaved: 45.2,
    treesPlanted: 2,
    isCurrentUser: true,
  },
]

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = leaderboardData.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">See how you rank among other eco-friendly travelers</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">This Week</Button>
        <Button variant="outline">This Month</Button>
        <Button variant="outline">All Time</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Eco-Friendly Travelers</CardTitle>
          <CardDescription>Users ranked by their eco-friendly contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="coins">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="coins">Green Coins</TabsTrigger>
              <TabsTrigger value="carbon">Carbon Saved</TabsTrigger>
              <TabsTrigger value="trees">Trees Planted</TabsTrigger>
            </TabsList>
            <TabsContent value="coins" className="mt-6">
              <div className="space-y-4">
                {filteredUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between rounded-lg border p-4 ${
                      user.isCurrentUser ? "bg-primary/5 border-primary/20" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {index < 3 ? (
                          <Trophy
                            className={`h-4 w-4 ${
                              index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : "text-amber-600"
                            }`}
                          />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <Avatar>
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.name}</span>
                          {user.isCurrentUser && (
                            <Badge variant="outline" className="text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.carbonSaved} kg CO₂ saved</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-primary" />
                      <span className="text-xl font-bold">{user.greenCoins}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="carbon" className="mt-6">
              <div className="space-y-4">
                {filteredUsers
                  .sort((a, b) => b.carbonSaved - a.carbonSaved)
                  .map((user, index) => (
                    <div
                      key={user.id}
                      className={`flex items-center justify-between rounded-lg border p-4 ${
                        user.isCurrentUser ? "bg-primary/5 border-primary/20" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {index < 3 ? (
                            <Trophy
                              className={`h-4 w-4 ${
                                index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : "text-amber-600"
                              }`}
                            />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <Avatar>
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user.name}</span>
                            {user.isCurrentUser && (
                              <Badge variant="outline" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.greenCoins} Green Coins</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">{user.carbonSaved} kg</span>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="trees" className="mt-6">
              <div className="space-y-4">
                {filteredUsers
                  .sort((a, b) => b.treesPlanted - a.treesPlanted)
                  .map((user, index) => (
                    <div
                      key={user.id}
                      className={`flex items-center justify-between rounded-lg border p-4 ${
                        user.isCurrentUser ? "bg-primary/5 border-primary/20" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {index < 3 ? (
                            <Trophy
                              className={`h-4 w-4 ${
                                index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : "text-amber-600"
                              }`}
                            />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <Avatar>
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user.name}</span>
                            {user.isCurrentUser && (
                              <Badge variant="outline" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.greenCoins} Green Coins</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">{user.treesPlanted}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Your Rank</CardTitle>
            <CardDescription>Current position on the leaderboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold">#42</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Top 15% of all users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Points to Next Rank</CardTitle>
            <CardDescription>Coins needed to move up</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold">35</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Keep riding to earn more Green Coins!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Friends on EcoRide</CardTitle>
            <CardDescription>Connect with eco-friendly friends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold">8</span>
            </div>
            <Button variant="link" className="mt-1 h-auto p-0 text-xs">
              Invite friends
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

