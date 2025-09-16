"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/lib/auth-context"
import {
  LayoutDashboard,
  Calendar,
  ShoppingCart,
  Search,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Booking", href: "/dashboard/booking", icon: Calendar },
  { name: "Buy Cars", href: "/dashboard/buy-cars", icon: ShoppingCart },
  { name: "Manage Cars", href: "/dashboard/manage-cars", icon: Settings, role: "seller" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const filteredNavigation = navigation.filter((item) => !item.role || item.role === user?.role)

  return (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen bg-gray-50">
          {/* Mobile sidebar */}
          <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
            <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
              <div className="flex h-16 items-center justify-between px-6">
                <h1 className="text-xl font-bold">carconnect.</h1>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="mt-8 px-4">
                {filteredNavigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
              <div className="absolute bottom-0 w-full p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <HelpCircle className="h-5 w-5" />
                  Support
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                  Log out
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 shadow-sm">
              <div className="flex h-16 shrink-0 items-center">
                <h1 className="text-xl font-bold">carconnect.</h1>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {filteredNavigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors",
                                isActive
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                              )}
                            >
                              <item.icon className="h-6 w-6 shrink-0" />
                              {item.name}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <div className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start gap-x-3">
                        <Settings className="h-6 w-6" />
                        Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-x-3">
                        <HelpCircle className="h-6 w-6" />
                        Support
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-x-3" onClick={logout}>
                        <LogOut className="h-6 w-6" />
                        Log out
                      </Button>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:pl-64">
            {/* Top navigation */}
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="relative flex flex-1 items-center">
                  <Search className="pointer-events-none absolute left-3 h-5 w-5 text-gray-400" />
                  <Input placeholder="Search or type" className="w-full pl-10 sm:text-sm" />
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <Button variant="ghost" size="sm">
                    <Bell className="h-6 w-6" />
                  </Button>

                  <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

                  <div className="flex items-center gap-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-semibold leading-6 text-gray-900 lg:block">
                      {user?.name || "User"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Page content */}
            <main className="py-8">
              <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
          </div>
        </div>
      </Suspense>
    </ProtectedRoute>
  )
}
