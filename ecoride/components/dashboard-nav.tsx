"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Leaf, Car, CreditCard, Trophy, Settings, History, Gamepad2 } from "lucide-react"

const items = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Book a Ride",
    href: "/dashboard/book",
    icon: Car,
  },
  {
    title: "Green Impact",
    href: "/dashboard/impact",
    icon: Leaf,
  },
  {
    title: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: Trophy,
  },
  {
    title: "Ride History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Green Coins",
    href: "/dashboard/coins",
    icon: CreditCard,
  },
  {
    title: "Games & Challenges",
    href: "/dashboard/games",
    icon: Gamepad2,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col py-6">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Manage your eco-friendly rides</p>
      </div>
      <nav className="grid items-start px-4 py-4 text-sm">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
              pathname === item.href
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-primary/5",
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
            {item.title === "Book a Ride" && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                New
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="mt-auto px-4 py-4">
        <div className="rounded-lg border border-primary/20 p-4 bg-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Eco Tip</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Did you know? Choosing an electric vehicle over a gas car for just one day can save up to 10kg of CO₂
            emissions.
          </p>
        </div>
      </div>
    </div>
  )
}

