"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockBookings, getCarById } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { Calendar, Clock, MapPin, Phone, MessageCircle, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

export default function BookingPage() {
  const { user } = useAuth()
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Mock bookings data - in real app, this would come from API
  const userBookings = mockBookings.filter((booking) =>
    user?.role === "buyer" ? booking.buyerId === user.id : booking.sellerId === user.id,
  )

  const filteredBookings =
    statusFilter === "all" ? userBookings : userBookings.filter((booking) => booking.status === statusFilter)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-gray-600">
            {user?.role === "buyer" ? "Manage your test drives and appointments" : "Manage customer bookings"}
          </p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBookings.filter((b) => b.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBookings.filter((b) => b.status === "confirmed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBookings.filter((b) => b.status === "completed").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="space-y-4">
              <div className="text-4xl">📅</div>
              <h3 className="text-lg font-semibold">No bookings found</h3>
              <p className="text-gray-600">
                {statusFilter === "all" ? "You don't have any bookings yet" : `No ${statusFilter} bookings found`}
              </p>
            </div>
          </Card>
        ) : (
          filteredBookings.map((booking) => {
            const car = getCarById(booking.carId)
            if (!car) return null

            return (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Car Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={car.images[0] || "/placeholder.svg"}
                        alt={car.title}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{car.title}</h3>
                          <p className="text-gray-600">${car.price.toLocaleString()}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </div>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium">Booking Date</p>
                            <p className="text-gray-600">{format(booking.bookingDate, "PPP")}</p>
                          </div>
                        </div>

                        {booking.testDriveDate && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="font-medium">Test Drive</p>
                              <p className="text-gray-600">{format(booking.testDriveDate, "PPP")}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium">Location</p>
                            <p className="text-gray-600">{car.location}</p>
                          </div>
                        </div>
                      </div>

                      {booking.message && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium mb-1">Message:</p>
                          <p className="text-sm text-gray-600">{booking.message}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {booking.status === "pending" && user?.role === "seller" && (
                          <>
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirm
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="h-4 w-4 mr-2" />
                              Decline
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
