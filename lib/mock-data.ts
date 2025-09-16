import type { Car, User, Booking, DashboardStats } from "./types"

export const mockUsers: User[] = [
  {
    id: "1",
    email: "seller@example.com",
    phone: "+250788123456",
    name: "John Seller",
    role: "seller",
    verified: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "buyer@example.com",
    phone: "+250788654321",
    name: "Jane Buyer",
    role: "buyer",
    verified: true,
    createdAt: new Date("2024-01-15"),
  },
]

export const mockCars: Car[] = [
  {
    id: "1",
    sellerId: "1",
    title: "Porsche 718 Cayman S",
    brand: "Porsche",
    model: "718 Cayman S",
    year: 2023,
    price: 142000,
    originalPrice: 160000,
    currency: "USD",
    mileage: 250,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Coupe",
    condition: "Used",
    doors: 2,
    engineSize: "4.0L",
    color: "Silver",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fChfZ2Jn6TmDGcjkZ1emqk1043293z.png",
      "/porsche-cayman-interior.jpg",
      "/porsche-cayman-engine.jpg",
    ],
    description:
      "Stunning Porsche 718 Cayman S in excellent condition. This sports car delivers exceptional performance with its powerful engine and precise handling.",
    features: ["Sport Package", "Premium Audio", "Navigation System", "Leather Seats", "Climate Control"],
    location: "Kigali, Rwanda",
    status: "available",
    views: 1250,
    likes: 89,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "2",
    sellerId: "1",
    title: "Ford Transit 2021",
    brand: "Ford",
    model: "Transit",
    year: 2021,
    price: 22000,
    currency: "USD",
    mileage: 2500,
    fuelType: "Diesel",
    transmission: "Manual",
    bodyType: "Van",
    condition: "Used",
    doors: 4,
    engineSize: "2.0L",
    color: "White",
    images: ["/ford-transit-van-white.jpg", "/ford-transit-interior-cargo.jpg"],
    description: "Reliable Ford Transit van perfect for business use. Low mileage and well-maintained.",
    features: ["Cargo Space", "Power Steering", "Air Conditioning", "Bluetooth"],
    location: "Kigali, Rwanda",
    status: "available",
    views: 890,
    likes: 34,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    sellerId: "1",
    title: "New GLC 2023",
    brand: "Mercedes-Benz",
    model: "GLC",
    year: 2023,
    price: 95000,
    currency: "USD",
    mileage: 50,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    condition: "New",
    doors: 4,
    engineSize: "2.0L",
    color: "Blue",
    images: ["/mercedes-glc-blue-suv.jpg", "/mercedes-glc-interior-luxury.jpg"],
    description: "Brand new Mercedes-Benz GLC with latest technology and luxury features.",
    features: ["AMG Package", "Panoramic Roof", "Premium Sound", "Advanced Safety", "Wireless Charging"],
    location: "Kigali, Rwanda",
    status: "available",
    views: 2100,
    likes: 156,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: "4",
    sellerId: "1",
    title: "Audi A6 3.5 New",
    brand: "Audi",
    model: "A6",
    year: 2024,
    price: 58000,
    currency: "USD",
    mileage: 100,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    condition: "New",
    doors: 4,
    engineSize: "3.5L",
    color: "Orange",
    images: ["/audi-a6-orange-sedan-luxury.jpg", "/audi-a6-interior-dashboard.jpg"],
    description: "Latest Audi A6 with powerful 3.5L engine and premium interior.",
    features: ["Quattro AWD", "Virtual Cockpit", "Matrix LED", "Bang & Olufsen Audio", "Adaptive Cruise"],
    location: "Kigali, Rwanda",
    status: "available",
    views: 1680,
    likes: 92,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
]

export const mockBookings: Booking[] = [
  {
    id: "1",
    carId: "1",
    buyerId: "2",
    sellerId: "1",
    status: "pending",
    bookingDate: new Date("2024-02-20"),
    testDriveDate: new Date("2024-02-22"),
    message: "Interested in test driving this Porsche",
    createdAt: new Date("2024-02-18"),
  },
]

export const mockDashboardStats: DashboardStats = {
  totalCars: 4,
  totalBookings: 1,
  totalRevenue: 317000,
  monthlyStats: [
    { month: "Jan", cars: 2, bookings: 0, revenue: 117000 },
    { month: "Feb", cars: 2, bookings: 1, revenue: 200000 },
  ],
}

// Utility functions for mock data
export const getCarById = (id: string): Car | undefined => {
  return mockCars.find((car) => car.id === id)
}

export const getCarsBySeller = (sellerId: string): Car[] => {
  return mockCars.filter((car) => car.sellerId === sellerId)
}

export const filterCars = (filters: any): Car[] => {
  return mockCars.filter((car) => {
    // Search functionality
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const searchableText =
        `${car.title} ${car.brand} ${car.model} ${car.description} ${car.features.join(" ")}`.toLowerCase()
      if (!searchableText.includes(searchTerm)) return false
    }

    // Brand filter
    if (filters.brand && car.brand.toLowerCase() !== filters.brand.toLowerCase()) return false

    // Year filters
    if (filters.yearFrom && car.year < filters.yearFrom) return false
    if (filters.yearTo && car.year > filters.yearTo) return false

    // Price filters
    if (filters.priceFrom && car.price < filters.priceFrom) return false
    if (filters.priceTo && car.price > filters.priceTo) return false

    // Mileage filters
    if (filters.mileageFrom && car.mileage < filters.mileageFrom) return false
    if (filters.mileageTo && car.mileage > filters.mileageTo) return false

    // Condition filter
    if (filters.condition && car.condition !== filters.condition) return false

    // Fuel type filter
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false

    // Transmission filter
    if (filters.transmission && car.transmission !== filters.transmission) return false

    // Body type filter
    if (filters.bodyType && car.bodyType !== filters.bodyType) return false

    // Location filter
    if (filters.location && !car.location.toLowerCase().includes(filters.location.toLowerCase())) return false

    return true
  })
}

// Utility functions for mock data
export const getFilterOptions = () => {
  const brands = [...new Set(mockCars.map((car) => car.brand))].sort()
  const years = [...new Set(mockCars.map((car) => car.year))].sort((a, b) => b - a)
  const bodyTypes = [...new Set(mockCars.map((car) => car.bodyType))].sort()
  const fuelTypes = [...new Set(mockCars.map((car) => car.fuelType))].sort()
  const conditions = [...new Set(mockCars.map((car) => car.condition))].sort()
  const transmissions = [...new Set(mockCars.map((car) => car.transmission))].sort()

  return {
    brands,
    years,
    bodyTypes,
    fuelTypes,
    conditions,
    transmissions,
  }
}

export const getPriceRanges = () => {
  const prices = mockCars.map((car) => car.price).sort((a, b) => a - b)
  const min = Math.min(...prices)
  const max = Math.max(...prices)

  return {
    min,
    max,
    ranges: [
      { label: "Under $25K", min: 0, max: 25000 },
      { label: "$25K - $50K", min: 25000, max: 50000 },
      { label: "$50K - $100K", min: 50000, max: 100000 },
      { label: "$100K - $200K", min: 100000, max: 200000 },
      { label: "Over $200K", min: 200000, max: Number.POSITIVE_INFINITY },
    ],
  }
}
