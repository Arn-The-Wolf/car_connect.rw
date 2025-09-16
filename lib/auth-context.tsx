"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "./types"
import { mockUsers } from "./mock-data"

interface AuthContextType {
  user: User | null
  login: (email: string, otp: string) => Promise<boolean>
  logout: () => void
  sendOTP: (email: string) => Promise<boolean>
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const sendOTP = async (email: string): Promise<boolean> => {
    // Mock OTP sending - in real app, this would call an API
    console.log(`[v0] Sending OTP to ${email}`)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    return true
  }

  const login = async (email: string, otp: string): Promise<boolean> => {
    // Mock authentication - in real app, this would verify OTP with backend
    console.log(`[v0] Verifying OTP ${otp} for ${email}`)

    if (otp === "123456") {
      // Mock OTP
      const foundUser = mockUsers.find((u) => u.email === email)
      if (foundUser) {
        setUser(foundUser)
        localStorage.setItem("user", JSON.stringify(foundUser))
        return true
      }
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        sendOTP,
        isAuthenticated: !!user,
        loading,
      }}
    >
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
