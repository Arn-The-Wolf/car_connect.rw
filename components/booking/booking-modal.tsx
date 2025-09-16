"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import type { Car } from "@/lib/types"
import { CalendarIcon, Clock, MapPin, Phone, User } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import CarIcon from "@/components/icons/car-icon" // Declare the Car variable

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  car: Car
  onBookingComplete?: () => void
}

export function BookingModal({ isOpen, onClose, car, onBookingComplete }: BookingModalProps) {
  const { user } = useAuth()
  const [step, setStep] = useState<"details" | "confirmation">("details")
  const [loading, setLoading] = useState(false)

  const [bookingData, setBookingData] = useState({
    testDriveDate: undefined as Date | undefined,
    timeSlot: "",
    contactName: user?.name || "",
    contactPhone: user?.phone || "",
    contactEmail: user?.email || "",
    message: "",
    bookingType: "test-drive" as "test-drive" | "inspection" | "purchase",
  })

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ]

  const handleSubmitBooking = async () => {
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would create a booking in the database
      console.log("[v0] Creating booking:", {
        carId: car.id,
        buyerId: user?.id,
        sellerId: car.sellerId,
        ...bookingData,
      })

      setStep("confirmation")
      onBookingComplete?.()
    } catch (error) {
      console.error("Booking failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep("details")
    setBookingData({
      testDriveDate: undefined,
      timeSlot: "",
      contactName: user?.name || "",
      contactPhone: user?.phone || "",
      contactEmail: user?.email || "",
      message: "",
      bookingType: "test-drive",
    })
  }

  const handleClose = () => {
    onClose()
    setTimeout(resetForm, 300) // Reset after modal closes
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {step === "details" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Book {car.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Car Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <CarIcon className="h-8 w-8 text-gray-400" /> {/* Use the declared Car variable */}
                  </div>
                  <div>
                    <h3 className="font-semibold">{car.title}</h3>
                    <p className="text-sm text-gray-600">
                      {car.year} • ${car.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      {car.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Type */}
              <div className="space-y-2">
                <Label>Booking Type</Label>
                <Select
                  value={bookingData.bookingType}
                  onValueChange={(value: any) => setBookingData({ ...bookingData, bookingType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="test-drive">Test Drive</SelectItem>
                    <SelectItem value="inspection">Vehicle Inspection</SelectItem>
                    <SelectItem value="purchase">Purchase Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !bookingData.testDriveDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {bookingData.testDriveDate ? format(bookingData.testDriveDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={bookingData.testDriveDate}
                      onSelect={(date) => setBookingData({ ...bookingData, testDriveDate: date })}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <Label>Preferred Time</Label>
                <Select
                  value={bookingData.timeSlot}
                  onValueChange={(value) => setBookingData({ ...bookingData, timeSlot: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <Label>Contact Information</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="contactName"
                        value={bookingData.contactName}
                        onChange={(e) => setBookingData({ ...bookingData, contactName: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="contactPhone"
                        value={bookingData.contactPhone}
                        onChange={(e) => setBookingData({ ...bookingData, contactPhone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Address</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={bookingData.contactEmail}
                    onChange={(e) => setBookingData({ ...bookingData, contactEmail: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Additional Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={bookingData.message}
                  onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                  placeholder="Any specific questions or requirements..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitBooking}
                  disabled={
                    !bookingData.testDriveDate ||
                    !bookingData.timeSlot ||
                    !bookingData.contactName ||
                    !bookingData.contactPhone ||
                    loading
                  }
                  className="flex-1"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">Booking Confirmed!</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CalendarIcon className="h-8 w-8 text-green-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Your booking has been confirmed!</h3>
                <p className="text-gray-600">
                  We've sent the details to the seller. You'll receive a confirmation email shortly.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                <h4 className="font-semibold">Booking Details:</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Car:</strong> {car.title}
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    {bookingData.bookingType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {bookingData.testDriveDate ? format(bookingData.testDriveDate, "PPP") : "N/A"}
                  </p>
                  <p>
                    <strong>Time:</strong> {bookingData.timeSlot}
                  </p>
                  <p>
                    <strong>Location:</strong> {car.location}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  The seller will contact you at {bookingData.contactPhone} to confirm the meeting details.
                </p>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                    Close
                  </Button>
                  <Button onClick={handleClose} className="flex-1">
                    View My Bookings
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
