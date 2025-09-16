"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { filterCars } from "@/lib/mock-data"
import type { CarFilters } from "@/lib/types"
import { Search, Filter, Eye, Users, Settings, Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BuyCarsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<CarFilters>({})
  const [showFilters, setShowFilters] = useState(false)

  const filteredCars = filterCars({ ...filters, search: searchQuery })

  const handleFilterChange = (key: keyof CarFilters, value: string | number) => {
    setFilters({ ...filters, [key]: value === "all" ? undefined : value })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Buy Cars</h1>
          <p className="text-gray-600">
            Showing 1-{filteredCars.length} of {filteredCars.length} results
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={filters.yearFrom?.toString() || "all"}
            onValueChange={(value) =>
              handleFilterChange("yearFrom", value === "all" ? undefined : Number.parseInt(value))
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search cars by brand, model, or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {showFilters && (
          <Card className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <Select value={filters.brand || "all"} onValueChange={(value) => handleFilterChange("brand", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    <SelectItem value="Porsche">Porsche</SelectItem>
                    <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                    <SelectItem value="BMW">BMW</SelectItem>
                    <SelectItem value="Audi">Audi</SelectItem>
                    <SelectItem value="Toyota">Toyota</SelectItem>
                    <SelectItem value="Ford">Ford</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Condition</label>
                <Select
                  value={filters.condition || "all"}
                  onValueChange={(value) => handleFilterChange("condition", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Body Type</label>
                <Select
                  value={filters.bodyType || "all"}
                  onValueChange={(value) => handleFilterChange("bodyType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Coupe">Coupe</SelectItem>
                    <SelectItem value="Hatchback">Hatchback</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fuel Type</label>
                <Select
                  value={filters.fuelType || "all"}
                  onValueChange={(value) => handleFilterChange("fuelType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Transmission</label>
                <Select
                  value={filters.transmission || "all"}
                  onValueChange={(value) => handleFilterChange("transmission", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <Select
                  value={filters.priceFrom?.toString() || "all"}
                  onValueChange={(value) => {
                    if (value === "all") {
                      setFilters({ ...filters, priceFrom: undefined, priceTo: undefined })
                    } else {
                      const [from, to] = value.split("-").map(Number)
                      setFilters({ ...filters, priceFrom: from, priceTo: to })
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-25000">$0 - $25K</SelectItem>
                    <SelectItem value="25000-50000">$25K - $50K</SelectItem>
                    <SelectItem value="50000-100000">$50K - $100K</SelectItem>
                    <SelectItem value="100000-999999">$100K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Link key={car.id} href={`/dashboard/buy-cars/${car.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <div className="aspect-video relative">
                  <Image src={car.images[0] || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                </div>
                <div className="absolute top-2 left-2 flex gap-2">
                  {car.condition === "New" && <Badge className="bg-green-500">Great Price</Badge>}
                  {car.mileage < 1000 && <Badge className="bg-blue-500">Low Mileage</Badge>}
                </div>
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{car.title}</h3>
                  <p className="text-sm text-gray-600">
                    {car.year} • {car.mileage.toLocaleString()} miles • {car.fuelType} • {car.transmission}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {car.views > 1000 ? `${Math.floor(car.views / 1000)}K` : car.views} Miles
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {car.doors} Doors
                  </div>
                  <div className="flex items-center gap-1">
                    <Settings className="h-3 w-3" />
                    {car.transmission}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {car.originalPrice && car.originalPrice > car.price && (
                      <p className="text-sm text-gray-500 line-through">${car.originalPrice.toLocaleString()}</p>
                    )}
                    <p className="text-2xl font-bold">${car.price.toLocaleString()}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <Card className="p-8 text-center">
          <div className="space-y-4">
            <div className="text-4xl">🔍</div>
            <h3 className="text-lg font-semibold">No cars found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setFilters({})
              }}
            >
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
