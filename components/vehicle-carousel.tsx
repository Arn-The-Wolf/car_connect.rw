"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockCars } from "@/lib/mock-data"
import { ChevronLeft, ChevronRight, Eye, Heart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface VehicleCarouselProps {
  title?: string
  showControls?: boolean
  autoPlay?: boolean
  interval?: number
}

export function VehicleCarousel({
  title = "Explore All Vehicles",
  showControls = true,
  autoPlay = true,
  interval = 5000,
}: VehicleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  const cars = mockCars.slice(0, 6) // Show first 6 cars

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isAutoPlaying, cars.length, interval])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  if (cars.length === 0) return null

  return (
    <div className="space-y-6">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          {showControls && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={goToPrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cars.map((car) => (
            <div key={car.id} className="w-full flex-shrink-0">
              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="aspect-[16/9] relative">
                    <Image src={car.images[0] || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                  </div>

                  {/* Overlay with car info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-600">Featured</Badge>
                        {car.condition === "New" && <Badge className="bg-blue-600">New</Badge>}
                      </div>

                      <h3 className="text-2xl font-bold">{car.title}</h3>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {car.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {car.views.toLocaleString()} views
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {car.likes} likes
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold">${car.price.toLocaleString()}</p>
                          {car.originalPrice && car.originalPrice > car.price && (
                            <p className="text-sm line-through opacity-75">${car.originalPrice.toLocaleString()}</p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="secondary">
                            <Heart className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Link href={`/dashboard/buy-cars/${car.id}`}>
                            <Button>View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2">
        {cars.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Auto-play toggle */}
      <div className="flex justify-center">
        <Button variant="ghost" size="sm" onClick={() => setIsAutoPlaying(!isAutoPlaying)}>
          {isAutoPlaying ? "Pause" : "Play"} Slideshow
        </Button>
      </div>
    </div>
  )
}
