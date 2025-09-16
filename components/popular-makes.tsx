"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye, Calendar, Fuel, Settings } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function PopularMakes() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const vehicles = [
    {
      id: 1,
      name: "Audi A - 2022",
      description: "2.0 TFSI Quattro Premium Plus",
      price: "$45,000",
      image: "/audi-a4-sedan-silver-2022.jpg",
      badge: "Featured",
      badgeColor: "bg-purple-500",
      specs: { year: "2022", fuel: "Petrol", transmission: "Automatic" },
    },
    {
      id: 2,
      name: "Audi A4 - 2022",
      description: "2.0 TFSI Quattro Premium Plus",
      price: "$52,000",
      image: "/audi-a4-blue-sedan-2022.jpg",
      badge: "Best Seller",
      badgeColor: "bg-green-500",
      specs: { year: "2022", fuel: "Petrol", transmission: "Automatic" },
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between mb-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold text-foreground">Popular Makes</h2>
          <a href="#" className="text-accent hover:underline">
            View All →
          </a>
        </div>

        <div
          className={`flex gap-4 mb-8 transform transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Button variant="default" className="bg-primary">
            Audi
          </Button>
          <Button variant="outline">Ford</Button>
          <Button variant="outline">Mercedes-Benz</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.map((vehicle, index) => (
            <Card
              key={vehicle.id}
              className={`group hover:shadow-lg transition-all duration-500 hover:-translate-y-1 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="relative">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-t-lg"
                />
                <Badge className={`absolute top-3 left-3 ${vehicle.badgeColor} text-white`}>{vehicle.badge}</Badge>
                <Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{vehicle.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{vehicle.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {vehicle.specs.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="w-3 h-3" />
                    {vehicle.specs.fuel}
                  </div>
                  <div className="flex items-center gap-1">
                    <Settings className="w-3 h-3" />
                    {vehicle.specs.transmission}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">{vehicle.price}</span>
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
