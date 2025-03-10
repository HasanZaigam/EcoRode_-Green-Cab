"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Leaf, LogOut, Wallet, Bell } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, signOut, connectWallet } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading your eco-friendly dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b bg-background shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
            <div className="p-1.5 rounded-full bg-primary/10">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold">EcoRide</span>
          </Link>
          <div className="flex items-center gap-4">
            {!user.walletConnected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={connectWallet}
                className="border-primary/20 text-primary hover:bg-primary/10"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-sm bg-primary/10 px-3 py-1.5 rounded-full">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="font-medium">{user.walletAddress}</span>
              </div>
            )}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-white">
                3
              </Badge>
            </Button>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.greenCoins} Green Coins</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sign out</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[240px_1fr] md:gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4 md:py-8">{children}</main>
      </div>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 EcoRide. All rights reserved.</p>
      </footer>
    </div>
  )
}

