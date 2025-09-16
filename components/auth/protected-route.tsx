"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { LoginModal } from "./login-modal"
import { useState, useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    if (!loading && requireAuth && !isAuthenticated) {
      setShowLogin(true)
    }
  }, [loading, requireAuth, isAuthenticated])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-muted/50">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Authentication Required</h2>
            <p className="text-muted-foreground">Please sign in to access this feature</p>
          </div>
        </div>
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </>
    )
  }

  return <>{children}</>
}
