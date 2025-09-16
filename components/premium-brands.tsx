"use client"

import { useEffect, useRef, useState } from "react"

export function PremiumBrands() {
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

  const brands = [
    { name: "BMW", logo: "/bmw-logo.png" },
    { name: "Mercedes-Benz", logo: "/mercedes-benz-logo.jpg" },
    { name: "Chevrolet", logo: "/chevrolet-logo.png" },
    { name: "Ferrari", logo: "/ferrari-logo.jpg" },
    { name: "Toyota", logo: "/toyota-logo.png" },
    { name: "KIA", logo: "/kia-logo.jpg" },
    { name: "Honda", logo: "/honda-logo.png" },
    { name: "Ford", logo: "/ford-oval-logo.png" },
    { name: "Tesla", logo: "/tesla-logo.png" },
    { name: "MG", logo: "/mg-logo.jpg" },
    { name: "Audi", logo: "/audi-logo.png" },
    { name: "Alfa Romeo", logo: "/alfa-romeo-logo.png" },
  ]

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between mb-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold text-foreground">Explore Our Premium Brands</h2>
          <a href="#" className="text-accent hover:underline">
            View All Brands →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className={`flex flex-col items-center group cursor-pointer transform transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + index * 50}ms` }}
            >
              <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center mb-2 group-hover:shadow-lg transition-shadow">
                <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="w-10 h-10 object-contain" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
