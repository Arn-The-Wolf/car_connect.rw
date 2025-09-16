"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VehicleCarousel } from "@/components/vehicle-carousel"
import { mockDashboardStats, mockCars } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { Car, Calendar, DollarSign, TrendingUp, Star, Eye, Heart } from "lucide-react"
import Image from "next/image"

export default function DashboardPage() {
  const { user } = useAuth()
  const stats = mockDashboardStats
  const recommendedCars = mockCars.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0] || "User"}!</h1>
        <p className="text-gray-600">Here's what's happening with your car business today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCars}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">Monthly growth</p>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Carousel */}
      <VehicleCarousel title="Featured Vehicles" showControls={true} autoPlay={true} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Miles Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Miles Statistics</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Day
              </Button>
              <Button variant="ghost" size="sm">
                Week
              </Button>
              <Button variant="ghost" size="sm">
                Month
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold">256 Miles</div>
              <div className="h-32 bg-gray-100 rounded-lg flex items-end justify-center p-4">
                <div className="flex items-end gap-2 h-full">
                  <div className="bg-gray-300 w-8 h-4 rounded-t"></div>
                  <div className="bg-gray-300 w-8 h-8 rounded-t"></div>
                  <div className="bg-gray-300 w-8 h-6 rounded-t"></div>
                  <div className="bg-gray-900 w-8 h-full rounded-t relative">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                      1 PM
                      <br />
                      15%
                    </span>
                  </div>
                  <div className="bg-gray-300 w-8 h-10 rounded-t"></div>
                  <div className="bg-gray-300 w-8 h-6 rounded-t"></div>
                  <div className="bg-gray-300 w-8 h-4 rounded-t"></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 PM</span>
                <span>2 PM</span>
                <span>3 PM</span>
                <span>4 PM</span>
                <span>5 PM</span>
                <span>6 PM</span>
                <span>7 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Car Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Car Statistics</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Day
              </Button>
              <Button variant="ghost" size="sm">
                Week
              </Button>
              <Button variant="ghost" size="sm">
                Month
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-gray-600">20 February 2022</div>
              <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-full h-16 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded opacity-50"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>7 am</span>
                <span>9 am</span>
                <span>11 am</span>
                <span>1 pm</span>
                <span>3 pm</span>
                <span>5 pm</span>
                <span>7 pm</span>
                <span>9 pm</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Cars */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Cars</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {recommendedCars.map((car, index) => {
              const colors = ["bg-yellow-100", "bg-blue-100", "bg-red-100"]
              const recommendations = ["64% Recommend", "74% Recommend", "74% Recommend"]

              return (
                <div key={car.id} className={`${colors[index]} rounded-lg p-4 space-y-3`}>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{recommendations[index]}</span>
                  </div>

                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image src={car.images[0] || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">
                      {car.brand} {car.model}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {car.views > 1000 ? `${Math.floor(car.views / 1000)}K` : car.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {car.likes}
                      </div>
                      <div className="ml-auto font-semibold">
                        ${car.price > 1000 ? `${Math.floor(car.price / 1000)}K` : car.price}/h
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
