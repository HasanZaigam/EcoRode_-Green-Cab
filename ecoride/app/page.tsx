import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Leaf, MapPin, Award, Trophy, Wallet, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <Leaf className="h-6 w-6 text-primary" />
            <span>EcoRide</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 leaf-pattern">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Ride Green, <span className="text-primary">Earn Rewards</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join EcoRide and earn rewards for choosing eco-friendly transportation. Reduce your carbon footprint
                    and make a positive impact on the environment.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="w-full gradient-green text-white hover:opacity-90">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/10"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Leaf className="mr-1 h-4 w-4 text-primary" />
                    <span>Eco-friendly</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-1 h-4 w-4 text-primary" />
                    <span>Earn rewards</span>
                  </div>
                  <div className="flex items-center">
                    <Wallet className="mr-1 h-4 w-4 text-primary" />
                    <span>Blockchain powered</span>
                  </div>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative aspect-video overflow-hidden rounded-xl">
                <img
                  alt="EcoRide Electric Taxi"
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1280&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-primary/80 hover:bg-primary/70">Electric</Badge>
                    <Badge className="bg-primary/80 hover:bg-primary/70">Zero Emissions</Badge>
                  </div>
                  <p className="text-sm font-medium">Electric taxis reduce CO₂ emissions by up to 70%</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  EcoRide makes it easy to reduce your carbon footprint while earning rewards.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center space-y-4 text-center eco-card bg-card p-6 rounded-xl border">
                <div className="p-4 bg-primary/10 rounded-full animate-pulse-green">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Book Eco-Friendly Rides</h3>
                <p className="text-muted-foreground">
                  Choose from a variety of eco-friendly transportation options for your daily commute.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center eco-card bg-card p-6 rounded-xl border">
                <div className="p-4 bg-primary/10 rounded-full animate-pulse-green">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Earn Green Coins</h3>
                <p className="text-muted-foreground">
                  Get 1 Green Coin for every kilometer traveled using eco-friendly transportation.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center eco-card bg-card p-6 rounded-xl border">
                <div className="p-4 bg-primary/10 rounded-full animate-pulse-green">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Redeem Rewards</h3>
                <p className="text-muted-foreground">
                  Use your Green Coins to plant trees, get discounts, or trade on the marketplace.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mx-auto lg:mx-0 relative aspect-video overflow-hidden rounded-xl order-2 lg:order-1">
                <img
                  alt="EcoRide Carpool"
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1621976360623-004223992275?q=80&w=1280&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-primary/80 hover:bg-primary/70">Carpool</Badge>
                    <Badge className="bg-primary/80 hover:bg-primary/70">Reduced Emissions</Badge>
                  </div>
                  <p className="text-sm font-medium">Carpooling can reduce your carbon footprint by up to 50%</p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Eco Impact</div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Make a Real Difference</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Every ride with EcoRide contributes to a healthier planet. Track your impact and see the difference
                    you're making.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Reduce your carbon footprint with every ride</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Plant trees with your earned Green Coins</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Track your environmental impact in real-time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Compete with friends on the eco leaderboard</span>
                  </li>
                </ul>
                <div>
                  <Link href="/login">
                    <Button className="gradient-green text-white hover:opacity-90">Join EcoRide Today</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Environmental Impact</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how EcoRide is helping to create a greener future
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center space-y-4 text-center eco-card bg-card p-6 rounded-xl border">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    alt="Tree Planting Initiative"
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1513028738826-f000cded30a4?q=80&w=640&auto=format&fit=crop"
                  />
                </div>
                <h3 className="text-xl font-bold">Tree Planting Initiative</h3>
                <p className="text-muted-foreground">
                  We've planted over 10,000 trees through our Green Coin redemption program.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center eco-card bg-card p-6 rounded-xl border">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    alt="Forest Conservation"
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=640&auto=format&fit=crop"
                  />
                </div>
                <h3 className="text-xl font-bold">Forest Conservation</h3>
                <p className="text-muted-foreground">
                  Our sustainability efforts help protect existing forests and biodiversity.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center eco-card bg-card p-6 rounded-xl border">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    alt="Green Future"
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=640&auto=format&fit=crop"
                  />
                </div>
                <h3 className="text-xl font-bold">Green Future</h3>
                <p className="text-muted-foreground">
                  Every ride contributes to a sustainable future for generations to come.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Leaf className="h-6 w-6 text-primary" />
              <span>EcoRide</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Eco-friendly ride-sharing platform that rewards users for choosing green transportation.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="text-sm font-medium">Company</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/about">About</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/cookies">Cookies</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

