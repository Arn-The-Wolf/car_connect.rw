"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookingModal } from "@/components/booking/booking-modal"
import { getCarById } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { ArrowLeft, Heart, Share2, Phone, MessageCircle, Eye, Calendar, MapPin } from "lucide-react"
import Image from "next/image"

export default function CarDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const car = getCarById(params.id as string)

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Car not found</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const handleBuyNow = () => {
    // In a real app, this would initiate purchase flow
    alert("Purchase initiated! You will be redirected to payment.")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{car.title}</h1>
          <p className="text-gray-600">{car.location}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video relative">
                <Image
                  src={car.images[currentImageIndex] || "/placeholder.svg"}
                  alt={car.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-green-600">Great Price</Badge>
                <Badge variant="secondary">Video</Badge>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {currentImageIndex + 1} / {car.images.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="p-4">
              <div className="flex gap-2 overflow-x-auto">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? "border-primary" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${car.title} ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Car Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Car Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Body</p>
                  <p className="font-semibold">{car.bodyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Condition</p>
                  <p className="font-semibold">{car.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mileage</p>
                  <p className="font-semibold">{car.mileage.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Engine Size</p>
                  <p className="font-semibold">{car.engineSize}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fuel Type</p>
                  <p className="font-semibold">{car.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Door</p>
                  <p className="font-semibold">{car.doors} Doors</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Year</p>
                  <p className="font-semibold">{car.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Transmission</p>
                  <p className="font-semibold">{car.transmission}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{car.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature) => (
                  <Badge key={feature} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {car.originalPrice && car.originalPrice > car.price && (
                  <div className="text-sm text-gray-500">
                    <span className="line-through">${car.originalPrice.toLocaleString()}</span>
                    <Badge className="ml-2 bg-red-500">Save ${(car.originalPrice - car.price).toLocaleString()}</Badge>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600">Our Price</p>
                  <p className="text-3xl font-bold">${car.price.toLocaleString()}</p>
                  {car.originalPrice && (
                    <p className="text-sm text-green-600">
                      Instant Saving: ${(car.originalPrice - car.price).toLocaleString()}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full" size="lg" onClick={handleBuyNow}>
                    Buy Now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                    onClick={() => setShowBookingModal(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Test Drive
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Talk to us (+250 788 123 456)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-semibold">{car.views.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Views</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-semibold">{car.likes}</p>
                  <p className="text-sm text-gray-600">Likes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-semibold">{car.location}</p>
                  <p className="text-sm text-gray-600">Location</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Seller */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Seller</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Call Seller
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        car={car}
        onBookingComplete={() => {
          // Handle booking completion
          console.log("[v0] Booking completed for car:", car.id)
        }}
      />
    </div>
  )
}
