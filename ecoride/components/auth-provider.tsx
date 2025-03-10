"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  greenCoins: number
  carbonSaved: number
  treesPlanted: number
  walletConnected: boolean
  walletAddress: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (provider: string) => Promise<void>
  signOut: () => void
  connectWallet: () => Promise<void>
  updateUserData: (data: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ecoride_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("ecoride_user", JSON.stringify(user))
    }
  }, [user])

  const signIn = async (provider: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create mock user data
    const mockUser: User = {
      id: "user_" + Math.random().toString(36).substring(2, 9),
      name: "Eco Rider",
      email: "rider@ecoride.com",
      greenCoins: 75,
      carbonSaved: 28.5,
      treesPlanted: 1,
      walletConnected: false,
      walletAddress: "",
    }

    setUser(mockUser)
    setIsLoading(false)
  }

  const signOut = () => {
    localStorage.removeItem("ecoride_user")
    setUser(null)
  }

  const connectWallet = async () => {
    if (!user) return

    setIsLoading(true)

    try {
      // Simulate connecting to a Solana wallet
      console.log("Connecting to wallet...")

      // In a real app, we would use something like:
      // const { publicKey } = await window.solana.connect();

      // For demo purposes, generate a mock Solana address
      const mockAddress = "Solana" + Math.random().toString(36).substring(2, 10) + "..."

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user with wallet info
      setUser({
        ...user,
        walletConnected: true,
        walletAddress: mockAddress,
      })

      alert("Wallet connected successfully!")
    } catch (error) {
      console.error("Error connecting wallet:", error)
      alert("Failed to connect wallet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserData = (data: User) => {
    // Preserve wallet connection state if not explicitly set in the new data
    if (data.walletConnected === undefined && user) {
      data.walletConnected = user.walletConnected
    }

    // Preserve wallet address if not explicitly set in the new data
    if (data.walletAddress === undefined && user) {
      data.walletAddress = user.walletAddress
    }

    setUser(data)
    localStorage.setItem("ecoride_user", JSON.stringify(data))
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, connectWallet, updateUserData }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

