export interface User {
  id: string
  email: string
  phone: string
  name: string
  role: "buyer" | "seller" | "admin"
  verified: boolean
  createdAt: Date
}

export interface Car {
  id: string
  sellerId: string
  title: string
  brand: string
  model: string
  year: number
  price: number
  originalPrice?: number
  currency: "RWF" | "USD"
  mileage: number
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid"
  transmission: "Manual" | "Automatic"
  bodyType: "Sedan" | "SUV" | "Hatchback" | "Coupe" | "Convertible" | "Truck" | "Van"
  condition: "New" | "Used" | "Certified Pre-Owned"
  doors: number
  engineSize: string
  color: string
  images: string[]
  video?: string
  description: string
  features: string[]
  location: string
  status: "available" | "sold" | "reserved"
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: string
  carId: string
  buyerId: string
  sellerId: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  bookingDate: Date
  testDriveDate?: Date
  message?: string
  createdAt: Date
}

export interface CarFilters {
  brand?: string
  model?: string
  yearFrom?: number
  yearTo?: number
  priceFrom?: number
  priceTo?: number
  mileageFrom?: number
  mileageTo?: number
  fuelType?: string
  transmission?: string
  bodyType?: string
  condition?: string
  location?: string
}

export interface DashboardStats {
  totalCars: number
  totalBookings: number
  totalRevenue: number
  monthlyStats: {
    month: string
    cars: number
    bookings: number
    revenue: number
  }[]
}
