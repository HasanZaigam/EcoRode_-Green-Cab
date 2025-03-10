"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Leaf, Car, CreditCard, Trophy, ArrowRight, Calendar, MapPin, Bike, Zap, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome Back, <span className="text-primary">{user.name}</span>
        </h1>
        <p className="text-muted-foreground">Here's an overview of your eco-friendly journey.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="eco-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Green Coins</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.greenCoins}</div>
            <p className="text-xs text-muted-foreground">+12 coins this week</p>
            <Progress className="mt-3" value={70} indicatorClassName="bg-gradient-to-r from-primary to-secondary" />
          </CardContent>
        </Card>
        <Card className="eco-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Carbon Saved</CardTitle>
            <Leaf className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.carbonSaved} kg</div>
            <p className="text-xs text-muted-foreground">+3.2 kg this week</p>
            <Progress className="mt-3" value={45} indicatorClassName="bg-gradient-to-r from-primary to-secondary" />
          </CardContent>
        </Card>
        <Card className="eco-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Trees Planted</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.treesPlanted}</div>
            <p className="text-xs text-muted-foreground">Next tree at 150 coins</p>
            <Progress
              className="mt-3"
              value={(user.greenCoins % 50) * 2}
              indicatorClassName="bg-gradient-to-r from-primary to-secondary"
            />
          </CardContent>
        </Card>
        <Card className="eco-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#42</div>
            <p className="text-xs text-muted-foreground">Top 15% of users</p>
            <Progress className="mt-3" value={85} indicatorClassName="bg-gradient-to-r from-primary to-secondary" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="col-span-6 md:col-span-4 border-primary/20">
          <CardHeader>
            <CardTitle>Book a Ride</CardTitle>
            <CardDescription>Choose your eco-friendly transportation option</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Button
                variant="outline"
                className="flex h-24 flex-col items-center justify-center gap-1 border-primary/20 hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <Link href="/dashboard/book">
                  <Bike className="h-8 w-8 text-primary" />
                  <span>Bike</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex h-24 flex-col items-center justify-center gap-1 border-primary/20 hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <Link href="/dashboard/book">
                  <Zap className="h-8 w-8 text-primary" />
                  <span>Electric</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex h-24 flex-col items-center justify-center gap-1 border-primary/20 hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <Link href="/dashboard/book">
                  <Users className="h-8 w-8 text-primary" />
                  <span>Carpool</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex h-24 flex-col items-center justify-center gap-1 border-primary/20 hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <Link href="/dashboard/book">
                  <Car className="h-8 w-8 text-primary" />
                  <span>Hybrid</span>
                </Link>
              </Button>
            </div>
            <div className="mt-4 flex justify-end">
              <Button asChild className="gradient-green text-white hover:opacity-90">
                <Link href="/dashboard/book">
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-6 md:col-span-2 border-primary/20">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest eco-friendly rides</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Bike className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Bike Ride</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span>2.5 km • +2.5 coins</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <Calendar className="mr-1 inline-block h-3 w-3" />
                  <span>Today</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Carpool</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span>8.3 km • +8.3 coins</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <Calendar className="mr-1 inline-block h-3 w-3" />
                  <span>Yesterday</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Electric Car</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span>12.1 km • +12.1 coins</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <Calendar className="mr-1 inline-block h-3 w-3" />
                  <span>3 days ago</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" asChild className="text-primary hover:bg-primary/10 hover:text-primary">
                <Link href="/dashboard/history">
                  View All <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Featured Eco-Friendly Vehicles</CardTitle>
          <CardDescription>Explore our most popular green transportation options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg overflow-hidden border border-primary/20 eco-card">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=640&auto=format&fit=crop"
                  alt="Electric Taxi"
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 right-2 bg-primary/80">Electric</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Electric Taxi</h3>
                <p className="text-sm text-muted-foreground mt-1">Zero emissions with comfortable rides</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-sm">
                    <Leaf className="h-4 w-4 text-primary mr-1" />
                    <span>100% Green</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                    Book
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-primary/20 eco-card">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1621976360623-004223992275?q=80&w=640&auto=format&fit=crop"
                  alt="Carpool Service"
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 right-2 bg-primary/80">Carpool</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Carpool Service</h3>
                <p className="text-sm text-muted-foreground mt-1">Share rides and reduce emissions</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-sm">
                    <Leaf className="h-4 w-4 text-primary mr-1" />
                    <span>75% Green</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                    Book
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-primary/20 eco-card">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=640&auto=format&fit=crop"
                  alt="E-Bike Rental"
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 right-2 bg-primary/80">E-Bike</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-medium">E-Bike Rental</h3>
                <p className="text-sm text-muted-foreground mt-1">Effortless cycling with electric assist</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-sm">
                    <Leaf className="h-4 w-4 text-primary mr-1" />
                    <span>95% Green</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                    Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

