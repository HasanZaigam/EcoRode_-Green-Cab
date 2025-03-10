"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Bike, Car, Leaf, MapPin, Users, Zap, Clock, DollarSign, ArrowRight, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"

// Utility function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km
  return distance
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}

// Geocoding function (simulated)
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  // In a real app, this would call a geocoding API like Google Maps
  // For demo purposes, we'll return random coordinates near a city center

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Generate random coordinates near a city center based on address keywords
  if (address.toLowerCase().includes("airport")) {
    return { lat: 40.6413 + (Math.random() * 0.02 - 0.01), lng: -73.7781 + (Math.random() * 0.02 - 0.01) }
  } else if (address.toLowerCase().includes("downtown") || address.toLowerCase().includes("city center")) {
    return { lat: 40.7128 + (Math.random() * 0.02 - 0.01), lng: -74.006 + (Math.random() * 0.02 - 0.01) }
  } else if (address.toLowerCase().includes("park")) {
    return { lat: 40.7812 + (Math.random() * 0.02 - 0.01), lng: -73.9665 + (Math.random() * 0.02 - 0.01) }
  } else if (address.toLowerCase().includes("mall") || address.toLowerCase().includes("shopping")) {
    return { lat: 40.7505 + (Math.random() * 0.02 - 0.01), lng: -73.9934 + (Math.random() * 0.02 - 0.01) }
  } else if (address.toLowerCase().includes("university") || address.toLowerCase().includes("college")) {
    return { lat: 40.7295 + (Math.random() * 0.02 - 0.01), lng: -73.9965 + (Math.random() * 0.02 - 0.01) }
  } else if (address.trim() === "") {
    return null
  } else {
    // Random coordinates in NYC area
    return { lat: 40.7 + (Math.random() * 0.1 - 0.05), lng: -74 + (Math.random() * 0.1 - 0.05) }
  }
}

// Calculate ride price based on distance and vehicle type
function calculatePrice(distance: number, vehicleType: string): number {
  const basePrices = {
    bike: 0, // Free for bikes
    electric: 2.5, // Base price per km for electric
    carpool: 1.8, // Base price per km for carpool
    hybrid: 2.0, // Base price per km for hybrid
  }

  const basePrice = basePrices[vehicleType as keyof typeof basePrices] || 2.0

  // Add base fare
  let price = vehicleType === "bike" ? 0 : 3.5

  // Add distance-based fare
  price += basePrice * distance

  // Add time-based component (estimated)
  const estimatedTimeMinutes = calculateTime(distance, vehicleType)
  const timeRate = vehicleType === "bike" ? 0 : 0.2 // $ per minute
  price += estimatedTimeMinutes * timeRate

  // Apply discounts for eco-friendly options
  if (vehicleType === "electric") {
    price *= 0.9 // 10% discount for electric
  } else if (vehicleType === "carpool") {
    price *= 0.85 // 15% discount for carpool
  }

  // Round to 2 decimal places
  return Math.round(price * 100) / 100
}

// Calculate estimated time based on distance and vehicle type
function calculateTime(distance: number, vehicleType: string): number {
  const speeds = {
    bike: 15, // km/h
    electric: 40, // km/h
    carpool: 35, // km/h
    hybrid: 38, // km/h
  }

  const speed = speeds[vehicleType as keyof typeof speeds] || 35

  // Calculate base time in minutes
  let timeMinutes = (distance / speed) * 60

  // Add traffic factor (random between 1.0 and 1.3)
  const trafficFactor = 1 + Math.random() * 0.3
  timeMinutes *= trafficFactor

  // Add pickup/dropoff time
  timeMinutes += vehicleType === "bike" ? 2 : 5

  // Round to nearest minute
  return Math.round(timeMinutes)
}

// Calculate carbon saved compared to a regular gas car
function calculateCarbonSaved(distance: number, vehicleType: string): number {
  // Average gas car emits ~192g CO2 per km
  const gasCar = 0.192 // kg CO2 per km

  const emissions = {
    bike: 0, // No emissions
    electric: 0.053, // kg CO2 per km (includes power generation)
    carpool: gasCar / 3, // Assumes 3 people sharing
    hybrid: 0.104, // kg CO2 per km
  }

  const vehicleEmission = emissions[vehicleType as keyof typeof emissions] || gasCar
  const saved = (gasCar - vehicleEmission) * distance

  // Round to 2 decimal places
  return Math.round(saved * 100) / 100
}

export default function BookRidePage() {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [vehicleType, setVehicleType] = useState("electric")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [destCoords, setDestCoords] = useState<{ lat: number; lng: number } | null>(null)
  const { user, updateUserData } = useAuth()

  const [rideDetails, setRideDetails] = useState<null | {
    distance: number
    price: number
    time: number
    carbonSaved: number
    coins: number
  }>(null)

  // Reset error when inputs change
  useEffect(() => {
    setError(null)
  }, [pickup, destination, vehicleType])

  const handleSearch = async () => {
    if (!pickup || !destination) {
      setError("Please enter both pickup and destination locations")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Geocode addresses to get coordinates
      const pickupLocation = await geocodeAddress(pickup)
      const destLocation = await geocodeAddress(destination)

      if (!pickupLocation || !destLocation) {
        throw new Error("Could not find location. Please try a different address.")
      }

      setPickupCoords(pickupLocation)
      setDestCoords(destLocation)

      // Calculate distance between coordinates
      const distance = calculateDistance(pickupLocation.lat, pickupLocation.lng, destLocation.lat, destLocation.lng)

      // Add some randomness to make it more realistic
      const adjustedDistance = distance * (0.9 + Math.random() * 0.2)
      const roundedDistance = Math.round(adjustedDistance * 10) / 10

      // Calculate other ride details
      const price = calculatePrice(roundedDistance, vehicleType)
      const time = calculateTime(roundedDistance, vehicleType)
      const carbonSaved = calculateCarbonSaved(roundedDistance, vehicleType)
      const coins = Math.round(roundedDistance * 10) / 10 // 1 coin per km

      // Set ride details
      setRideDetails({
        distance: roundedDistance,
        price,
        time,
        carbonSaved,
        coins,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while calculating your ride")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookRide = () => {
    if (!rideDetails) return

    setIsLoading(true)

    // Simulate booking process with server call
    setTimeout(() => {
      // Update user data with earned coins and carbon saved
      if (user && updateUserData) {
        const newGreenCoins = user.greenCoins + rideDetails.coins
        const newCarbonSaved = user.carbonSaved + rideDetails.carbonSaved
        const newTreesPlanted =
          newGreenCoins >= 50 * (user.treesPlanted + 1) ? user.treesPlanted + 1 : user.treesPlanted

        updateUserData({
          ...user,
          greenCoins: newGreenCoins,
          carbonSaved: newCarbonSaved,
          treesPlanted: newTreesPlanted,
        })
      }

      alert("Your ride has been booked successfully! You earned " + rideDetails.coins.toFixed(1) + " Green Coins.")
      setIsLoading(false)
      setRideDetails(null)
      setPickup("")
      setDestination("")
      setPickupCoords(null)
      setDestCoords(null)
    }, 1500)
  }

  const getVehicleImage = () => {
    switch (vehicleType) {
      case "bike":
        return "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=640&auto=format&fit=crop"
      case "electric":
        return "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=640&auto=format&fit=crop"
      case "carpool":
        return "https://images.unsplash.com/photo-1621976360623-004223992275?q=80&w=640&auto=format&fit=crop"
      case "hybrid":
        return "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=640&auto=format&fit=crop"
      default:
        return "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=640&auto=format&fit=crop"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Book a Ride</h1>
        <p className="text-muted-foreground">Choose your eco-friendly transportation option and earn Green Coins</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle>Ride Details</CardTitle>
            <CardDescription>Enter your pickup and destination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location</Label>
              <div className="flex gap-2">
                <div className="p-2 rounded-md bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <Input
                  id="pickup"
                  placeholder="Enter pickup location (e.g., Downtown, Airport)"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="border-primary/20 focus-visible:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <div className="flex gap-2">
                <div className="p-2 rounded-md bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <Input
                  id="destination"
                  placeholder="Enter destination (e.g., Mall, Park, University)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="border-primary/20 focus-visible:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Vehicle Type</Label>
              <RadioGroup
                defaultValue="electric"
                className="grid grid-cols-2 gap-4"
                value={vehicleType}
                onValueChange={setVehicleType}
              >
                <div>
                  <RadioGroupItem value="bike" id="bike" className="peer sr-only" />
                  <Label
                    htmlFor="bike"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Bike className="mb-3 h-6 w-6" />
                    Bike
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="electric" id="electric" className="peer sr-only" />
                  <Label
                    htmlFor="electric"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Zap className="mb-3 h-6 w-6" />
                    Electric
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="carpool" id="carpool" className="peer sr-only" />
                  <Label
                    htmlFor="carpool"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Users className="mb-3 h-6 w-6" />
                    Carpool
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="hybrid" id="hybrid" className="peer sr-only" />
                  <Label
                    htmlFor="hybrid"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Car className="mb-3 h-6 w-6" />
                    Hybrid
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full gradient-green text-white hover:opacity-90"
              onClick={handleSearch}
              disabled={!pickup || !destination || isLoading}
            >
              {isLoading ? "Calculating..." : "Search"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-1 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle>Ride Preview</CardTitle>
            <CardDescription>Your eco-friendly journey details</CardDescription>
          </CardHeader>
          <CardContent>
            {!rideDetails ? (
              <div className="flex h-[300px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-green">
                    <MapPin className="h-12 w-12 text-primary opacity-70" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Enter your pickup and destination to see ride details
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-lg border border-primary/20 bg-card p-4 overflow-hidden">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {vehicleType === "bike" ? (
                        <Bike className="h-5 w-5 text-primary" />
                      ) : vehicleType === "electric" ? (
                        <Zap className="h-5 w-5 text-primary" />
                      ) : vehicleType === "carpool" ? (
                        <Users className="h-5 w-5 text-primary" />
                      ) : (
                        <Car className="h-5 w-5 text-primary" />
                      )}
                      <span className="font-medium">
                        {vehicleType === "bike"
                          ? "Bike"
                          : vehicleType === "electric"
                            ? "Electric Car"
                            : vehicleType === "carpool"
                              ? "Carpool"
                              : "Hybrid Car"}
                      </span>
                      <Badge className="bg-primary/80 ml-2">{rideDetails.distance.toFixed(1)} km</Badge>
                    </div>
                  </div>
                  <div className="relative h-32 rounded-md overflow-hidden mb-4">
                    <img
                      src={getVehicleImage() || "/placeholder.svg"}
                      alt={`${vehicleType} vehicle`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                      Eco-friendly {vehicleType} transportation
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <p className="font-medium">{pickup}</p>
                        <p className="text-xs text-muted-foreground">Pickup location</p>
                      </div>
                    </div>
                    <div className="ml-1 h-6 w-0.5 bg-primary/20" />
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-destructive" />
                      <div>
                        <p className="font-medium">{destination}</p>
                        <p className="text-xs text-muted-foreground">Destination</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-primary/20 p-4 eco-card">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <p className="text-sm text-muted-foreground">Estimated Time</p>
                    </div>
                    <p className="text-2xl font-bold">{rideDetails.time} min</p>
                  </div>
                  <div className="rounded-lg border border-primary/20 p-4 eco-card">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <p className="text-sm text-muted-foreground">Price</p>
                    </div>
                    <p className="text-2xl font-bold">
                      {rideDetails.price === 0 ? "Free" : `$${rideDetails.price.toFixed(2)}`}
                    </p>
                  </div>
                  <div className="rounded-lg border border-primary/20 p-4 eco-card">
                    <div className="flex items-center gap-2 mb-1">
                      <Leaf className="h-4 w-4 text-primary" />
                      <p className="text-sm text-muted-foreground">Carbon Saved</p>
                    </div>
                    <p className="text-2xl font-bold">{rideDetails.carbonSaved.toFixed(2)} kg</p>
                  </div>
                  <div className="rounded-lg border border-primary/20 p-4 eco-card">
                    <div className="flex items-center gap-2 mb-1">
                      <Leaf className="h-4 w-4 text-primary" />
                      <p className="text-sm text-muted-foreground">Green Coins</p>
                    </div>
                    <p className="text-2xl font-bold">+{rideDetails.coins.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full gradient-green text-white hover:opacity-90"
              disabled={!rideDetails || isLoading}
              onClick={handleBookRide}
            >
              {isLoading ? "Booking..." : "Book Now"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Popular Routes</CardTitle>
          <CardDescription>Frequently traveled eco-friendly routes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary/20 p-4 eco-card">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">Downtown to Airport</h3>
                  <p className="text-sm text-muted-foreground">15.2 km • 25 min</p>
                </div>
                <Badge className="bg-primary/80">Popular</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm">Electric taxi recommended</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="w-full mt-3 text-primary hover:bg-primary/10"
                onClick={() => {
                  setPickup("Downtown")
                  setDestination("Airport")
                  setVehicleType("electric")
                  handleSearch()
                }}
              >
                Book This Route <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            <div className="rounded-lg border border-primary/20 p-4 eco-card">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">City Center to Mall</h3>
                  <p className="text-sm text-muted-foreground">8.7 km • 15 min</p>
                </div>
                <Badge className="bg-primary/80">Popular</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">Carpool available</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="w-full mt-3 text-primary hover:bg-primary/10"
                onClick={() => {
                  setPickup("City Center")
                  setDestination("Mall")
                  setVehicleType("carpool")
                  handleSearch()
                }}
              >
                Book This Route <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            <div className="rounded-lg border border-primary/20 p-4 eco-card">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">Park to University</h3>
                  <p className="text-sm text-muted-foreground">3.5 km • 10 min</p>
                </div>
                <Badge className="bg-primary/80">Popular</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Bike className="h-4 w-4 text-primary" />
                <span className="text-sm">Bike route available</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="w-full mt-3 text-primary hover:bg-primary/10"
                onClick={() => {
                  setPickup("Park")
                  setDestination("University")
                  setVehicleType("bike")
                  handleSearch()
                }}
              >
                Book This Route <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

