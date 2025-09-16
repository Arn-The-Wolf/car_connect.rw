"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoginModal } from "@/components/auth/login-modal"
import { VehicleCarousel } from "@/components/vehicle-carousel"
import { mockCars } from "@/lib/mock-data"
import { Search, Users, Shield, Award, Phone, Mail, MapPin, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const featuredCars = mockCars.slice(0, 4)

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">carconnect.</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#vehicles" className="text-gray-600 hover:text-gray-900">
                Vehicles
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" onClick={() => setShowLoginModal(true)}>
                Sign In
              </Button>
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <Link href="#vehicles" className="text-gray-600 hover:text-gray-900">
                  Vehicles
                </Link>
                <Link href="#about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
                <Link href="#contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowLoginModal(true)}>
                    Sign In
                  </Button>
                  <Link href="/dashboard">
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-balance">Find Your Perfect Car</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
                Discover thousands of quality vehicles from trusted dealers. Buy, sell, or book test drives with ease.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input placeholder="Search by make, model, or location..." className="pl-12 h-14 text-lg" />
                <Button className="absolute right-2 top-2 h-10">Search</Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                10,000+ Cars Available
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                Verified Dealers
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                Instant Booking
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Carousel */}
      <section id="vehicles" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VehicleCarousel title="Featured Vehicles" showControls={true} autoPlay={true} />
        </div>
      </section>

      {/* Premium Brands */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Premium Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {["Porsche", "Mercedes-Benz", "BMW", "Audi", "Toyota", "Ford"].map((brand) => (
                <div key={brand} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                  <span className="font-semibold text-gray-700">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCars.map((car) => (
                <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-video relative">
                      <Image src={car.images[0] || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                    </div>
                    <Badge className="absolute top-2 left-2 bg-green-600">Featured</Badge>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{car.title}</h3>
                      <p className="text-sm text-gray-600">
                        {car.year} • {car.mileage.toLocaleString()} miles
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">${car.price.toLocaleString()}</div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link href="/dashboard/buy-cars">
              <Button size="lg">View All Vehicles</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Who Are We?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                CarConnect is Rwanda's leading automotive marketplace, connecting buyers and sellers across the country.
                We provide a trusted platform where you can find quality vehicles, verified dealers, and seamless
                booking experiences.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-gray-600">Cars Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-gray-600">Verified Dealers</div>
                </div>
              </div>
            </div>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image src="/modern-car-showroom.png" alt="Car dealership" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose CarConnect?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Verified Listings</h3>
                <p className="text-gray-600">
                  All vehicles are verified by our team to ensure quality and authenticity.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Trusted Community</h3>
                <p className="text-gray-600">
                  Join thousands of satisfied customers who found their perfect car with us.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Best Prices</h3>
                <p className="text-gray-600">Competitive pricing and transparent deals with no hidden fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <h2 className="text-3xl font-bold text-gray-900">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+250 788 123 456</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">info@carconnect.rw</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-600">Kigali, Rwanda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">carconnect.</h3>
              <p className="text-gray-400">
                Rwanda's premier automotive marketplace connecting buyers and sellers nationwide.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <Link href="#vehicles" className="block text-gray-400 hover:text-white">
                  Browse Cars
                </Link>
                <Link href="/dashboard" className="block text-gray-400 hover:text-white">
                  Dashboard
                </Link>
                <Link href="#about" className="block text-gray-400 hover:text-white">
                  About Us
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2">
                <Link href="#contact" className="block text-gray-400 hover:text-white">
                  Contact Us
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Help Center
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Connect</h4>
              <div className="space-y-2">
                <p className="text-gray-400">+250 788 123 456</p>
                <p className="text-gray-400">info@carconnect.rw</p>
                <p className="text-gray-400">Kigali, Rwanda</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 CarConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </main>
  )
}
