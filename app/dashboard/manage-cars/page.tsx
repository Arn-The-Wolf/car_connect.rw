"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { getCarsBySeller } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import type { Car } from "@/lib/types"
import { Plus, Edit, Trash2, Eye, Heart, Upload, X } from "lucide-react"
import Image from "next/image"

export default function ManageCarsPage() {
  const { user } = useAuth()
  const [cars, setCars] = useState(getCarsBySeller(user?.id || "1"))
  const [isAddingCar, setIsAddingCar] = useState(false)
  const [editingCar, setEditingCar] = useState<Car | null>(null)

  const [newCar, setNewCar] = useState({
    title: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    originalPrice: 0,
    currency: "USD" as const,
    mileage: 0,
    fuelType: "Petrol" as const,
    transmission: "Manual" as const,
    bodyType: "Sedan" as const,
    condition: "New" as const,
    doors: 4,
    engineSize: "",
    color: "",
    description: "",
    features: [] as string[],
    location: "Kigali, Rwanda",
    images: [] as string[],
  })

  const handleAddCar = () => {
    const car: Car = {
      ...newCar,
      id: Date.now().toString(),
      sellerId: user?.id || "1",
      status: "available",
      views: 0,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setCars([...cars, car])
    setIsAddingCar(false)
    setNewCar({
      title: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      originalPrice: 0,
      currency: "USD",
      mileage: 0,
      fuelType: "Petrol",
      transmission: "Manual",
      bodyType: "Sedan",
      condition: "New",
      doors: 4,
      engineSize: "",
      color: "",
      description: "",
      features: [],
      location: "Kigali, Rwanda",
      images: [],
    })
  }

  const handleDeleteCar = (carId: string) => {
    setCars(cars.filter((car) => car.id !== carId))
  }

  const addFeature = (feature: string) => {
    if (feature && !newCar.features.includes(feature)) {
      setNewCar({ ...newCar, features: [...newCar.features, feature] })
    }
  }

  const removeFeature = (feature: string) => {
    setNewCar({ ...newCar, features: newCar.features.filter((f) => f !== feature) })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Cars</h1>
          <p className="text-gray-600">Add, edit, and manage your car listings</p>
        </div>
        <Dialog open={isAddingCar} onOpenChange={setIsAddingCar}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Car
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Car</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Car Title</Label>
                  <Input
                    id="title"
                    value={newCar.title}
                    onChange={(e) => setNewCar({ ...newCar, title: e.target.value })}
                    placeholder="e.g., Porsche 718 Cayman S"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select value={newCar.brand} onValueChange={(value) => setNewCar({ ...newCar, brand: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Porsche">Porsche</SelectItem>
                      <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                      <SelectItem value="BMW">BMW</SelectItem>
                      <SelectItem value="Audi">Audi</SelectItem>
                      <SelectItem value="Toyota">Toyota</SelectItem>
                      <SelectItem value="Ford">Ford</SelectItem>
                      <SelectItem value="Honda">Honda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={newCar.model}
                    onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                    placeholder="e.g., 718 Cayman S"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={newCar.year}
                    onChange={(e) => setNewCar({ ...newCar, year: Number.parseInt(e.target.value) })}
                    min="1990"
                    max={new Date().getFullYear() + 1}
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newCar.price}
                    onChange={(e) => setNewCar({ ...newCar, price: Number.parseInt(e.target.value) })}
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (Optional)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={newCar.originalPrice}
                    onChange={(e) => setNewCar({ ...newCar, originalPrice: Number.parseInt(e.target.value) })}
                    placeholder="60000"
                  />
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select
                    value={newCar.condition}
                    onValueChange={(value: any) => setNewCar({ ...newCar, condition: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Used">Used</SelectItem>
                      <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fuel Type</Label>
                  <Select
                    value={newCar.fuelType}
                    onValueChange={(value: any) => setNewCar({ ...newCar, fuelType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Transmission</Label>
                  <Select
                    value={newCar.transmission}
                    onValueChange={(value: any) => setNewCar({ ...newCar, transmission: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Body Type</Label>
                  <Select
                    value={newCar.bodyType}
                    onValueChange={(value: any) => setNewCar({ ...newCar, bodyType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                      <SelectItem value="Coupe">Coupe</SelectItem>
                      <SelectItem value="Convertible">Convertible</SelectItem>
                      <SelectItem value="Truck">Truck</SelectItem>
                      <SelectItem value="Van">Van</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={newCar.mileage}
                    onChange={(e) => setNewCar({ ...newCar, mileage: Number.parseInt(e.target.value) })}
                    placeholder="25000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doors">Doors</Label>
                  <Input
                    id="doors"
                    type="number"
                    value={newCar.doors}
                    onChange={(e) => setNewCar({ ...newCar, doors: Number.parseInt(e.target.value) })}
                    min="2"
                    max="5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="engineSize">Engine Size</Label>
                  <Input
                    id="engineSize"
                    value={newCar.engineSize}
                    onChange={(e) => setNewCar({ ...newCar, engineSize: e.target.value })}
                    placeholder="e.g., 2.0L, 3.5L"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={newCar.color}
                    onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
                    placeholder="e.g., Silver, Black"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCar.description}
                  onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
                  placeholder="Describe the car's condition, history, and unique features..."
                  rows={3}
                />
              </div>

              {/* Features */}
              <div className="space-y-2">
                <Label>Features</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newCar.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(feature)} />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addFeature(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      addFeature(input.value)
                      input.value = ""
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Image Upload Placeholder */}
              <div className="space-y-2">
                <Label>Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Upload up to 20 images</p>
                  <p className="text-xs text-gray-500">JPG, PNG, WebP (Max 5MB each)</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddCar} className="flex-1">
                  Add Car
                </Button>
                <Button variant="outline" onClick={() => setIsAddingCar(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cars.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cars.filter((car) => car.status === "available").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cars.reduce((sum, car) => sum + car.views, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cars.reduce((sum, car) => sum + car.likes, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Car Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card key={car.id} className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video relative">
                <Image src={car.images[0] || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
              </div>
              <Badge className="absolute top-2 left-2" variant={car.status === "available" ? "default" : "secondary"}>
                {car.status}
              </Badge>
            </div>

            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{car.title}</h3>
                <p className="text-sm text-gray-600">
                  {car.year} • {car.mileage.toLocaleString()} miles
                </p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {car.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {car.likes}
                  </div>
                </div>
                <div className="font-semibold text-lg">${car.price.toLocaleString()}</div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteCar(car.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {cars.length === 0 && (
        <Card className="p-8 text-center">
          <div className="space-y-4">
            <div className="text-4xl">🚗</div>
            <h3 className="text-lg font-semibold">No cars listed yet</h3>
            <p className="text-gray-600">Start by adding your first car listing</p>
            <Button onClick={() => setIsAddingCar(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Car
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
