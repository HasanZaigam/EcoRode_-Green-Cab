"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Leaf, Car, TreePine, Cloud, Droplets, Zap, ArrowRight, Users, Bike } from "lucide-react"
import Link from "next/link"

export default function ImpactPage() {
  const { user } = useAuth()

  if (!user) return null

  // Calculate impact metrics
  const co2Saved = user.carbonSaved // kg
  const treesPlanted = user.treesPlanted
  const treesEquivalent = Math.round(co2Saved / 21) // 1 tree absorbs ~21kg CO2 per year
  const waterSaved = Math.round(co2Saved * 1.5) // liters (approximate correlation)
  const energySaved = Math.round(co2Saved * 3.2) // kWh (approximate correlation)

  // Calculate progress to next tree
  const coinsForNextTree = 50
  const progress = ((user.greenCoins % coinsForNextTree) / coinsForNextTree) * 100
  const coinsNeeded = coinsForNextTree - (user.greenCoins % coinsForNextTree)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Green Impact</h1>
        <p className="text-muted-foreground">
          Track your environmental contributions and see the difference you're making
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="eco-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
            <Cloud className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{co2Saved.toFixed(1)} kg</div>
            <p className="text-xs text-muted-foreground">
              Equivalent to {Math.round(co2Saved / 2.3)} liters of gasoline
            </p>
          </CardContent>
        </Card>
        <Card className="eco-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Trees Planted</CardTitle>
            <TreePine className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{treesPlanted}</div>
            <p className="text-xs text-muted-foreground">Absorbing {treesPlanted * 21} kg CO₂ per year</p>
          </CardContent>
        </Card>
        <Card className="eco-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Water Saved</CardTitle>
            <Droplets className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waterSaved} L</div>
            <p className="text-xs text-muted-foreground">Enough for {Math.round(waterSaved / 150)} showers</p>
          </CardContent>
        </Card>
        <Card className="eco-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Energy Saved</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{energySaved} kWh</div>
            <p className="text-xs text-muted-foreground">Powers a home for {Math.round(energySaved / 30)} days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1 border-primary/20">
          <CardHeader>
            <CardTitle>Tree Planting Progress</CardTitle>
            <CardDescription>Plant a tree with every 50 Green Coins</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TreePine className="h-5 w-5 text-primary" />
                <span className="font-medium">Next Tree</span>
              </div>
              <span className="text-sm">{coinsNeeded} coins needed</span>
            </div>
            <Progress
              value={progress}
              className="h-2"
              indicatorClassName="bg-gradient-to-r from-primary to-secondary"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{user.greenCoins % coinsForNextTree} coins</span>
              <span>{coinsForNextTree} coins</span>
            </div>
            <div className="rounded-lg border border-primary/20 p-4 bg-primary/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/20">
                  <TreePine className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Trees Planted</h3>
                  <p className="text-sm text-muted-foreground">You've planted {treesPlanted} trees so far</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-md flex items-center justify-center ${
                      i < treesPlanted % 5 ? "bg-primary/20" : "bg-muted"
                    }`}
                  >
                    {i < treesPlanted % 5 && <TreePine className="h-5 w-5 text-primary" />}
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-4 gradient-green text-white hover:opacity-90"
                disabled={user.greenCoins < coinsForNextTree}
              >
                Plant a Tree ({coinsForNextTree} coins)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 border-primary/20">
          <CardHeader>
            <CardTitle>Carbon Footprint Reduction</CardTitle>
            <CardDescription>Your contribution to fighting climate change</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-primary/20 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  <span className="font-medium">Car Trips Avoided</span>
                </div>
                <span className="text-lg font-bold">{Math.round(co2Saved / 2.3)}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Gas car emissions avoided</span>
                  <span className="font-medium">{co2Saved.toFixed(1)} kg CO₂</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Equivalent to trees for</span>
                  <span className="font-medium">{treesEquivalent} years</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Gasoline saved</span>
                  <span className="font-medium">{Math.round(co2Saved / 2.3)} liters</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-primary/20 p-4 bg-primary/5">
              <h3 className="font-medium mb-2">Your Impact Visualized</h3>
              <div className="grid grid-cols-10 gap-1 mb-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-6 rounded ${
                      i < Math.min(10, Math.floor(co2Saved / 5)) ? "bg-primary" : "bg-primary/20"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Each bar represents 5kg of CO₂ saved. You've filled {Math.min(10, Math.floor(co2Saved / 5))} out of 10
                bars.
              </p>
              <div className="mt-4">
                <Link href="/dashboard/book">
                  <Button className="w-full text-primary hover:bg-primary/10" variant="outline">
                    Book an Eco-Ride to Increase Impact <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Environmental Impact Comparison</CardTitle>
          <CardDescription>See how your eco-friendly choices compare to conventional options</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transportation">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transportation">Transportation</TabsTrigger>
              <TabsTrigger value="trees">Tree Benefits</TabsTrigger>
              <TabsTrigger value="resources">Resource Savings</TabsTrigger>
            </TabsList>
            <TabsContent value="transportation" className="pt-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-primary/20 p-4 eco-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Car className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Gas Car vs Electric</h3>
                  </div>
                  <div className="relative h-32 rounded-md overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1593941707882-a5bfcf637e24?q=80&w=640&auto=format&fit=crop"
                      alt="Electric vs Gas Car"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Electric vehicles produce 60-80% less carbon emissions than gas cars, even accounting for
                    electricity generation.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/20 p-4 eco-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Carpooling Benefits</h3>
                  </div>
                  <div className="relative h-32 rounded-md overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=640&auto=format&fit=crop"
                      alt="Carpooling"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sharing rides with just one other person cuts your carbon footprint in half for each trip.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/20 p-4 eco-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Bike className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Cycling Impact</h3>
                  </div>
                  <div className="relative h-32 rounded-md overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=640&auto=format&fit=crop"
                      alt="Cycling"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cycling produces virtually zero emissions and provides health benefits worth $0.42 per km cycled.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trees" className="pt-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-primary/20 p-4 eco-card">
                  <div className="flex items-center gap-2 mb-3">
                    <TreePine className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Carbon Absorption</h3>
                  </div>
                  <div className="relative h-32 rounded-md overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1513028738826-f000cded30a4?q=80&w=640&auto=format&fit=crop"
                      alt="Tree Carbon Absorption"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A single mature tree can absorb up to 21 kg of CO₂ per year and release enough oxygen for 2 people.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/20 p-4 eco-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Forest Conservation</h3>
                  </div>
                  <div className="relative h-32 rounded-md overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=640&auto=format&fit=crop"
                      alt="Forest Conservation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Protecting forests helps maintain biodiversity and ensures continued carbon absorption.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/20 p-4 eco-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Reforestation</h3>
                  </div>
                  <div className="relative h-32 rounded-md overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=640&auto=format&fit=crop"
                      alt="Reforestation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Planting new trees in deforested areas helps restore ecosystems and combat climate change.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="pt-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-primary/20 p-4 eco-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Energy Conservation</h3>
                  </div>
                  <div className="relative h-32 rounded-md overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=640&auto=format&fit=crop"
                      alt="Energy Conservation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Every kWh of energy saved prevents about 0.4 kg of CO₂ from entering the atmosphere.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/20 p-4 eco-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Cloud className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Plant Protection</h3>
                  </div>
                  <div className="relative h-32 rounded-md overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=640&auto=format&fit=crop"
                      alt="Plant Protection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Protecting plant life helps maintain biodiversity and ensures continued carbon absorption.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/20 p-4 eco-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Car className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Sustainable Transport</h3>
                  </div>
                  <div className="relative h-32 rounded-md overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1623177579213-7eaeb56c0e04?q=80&w=640&auto=format&fit=crop"
                      alt="Sustainable Transport"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Eco-friendly transportation reduces emissions and helps preserve natural resources for future
                    generations.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

