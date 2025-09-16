"use client"

import { Shield, Tag, Wrench } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function WhyChooseUs() {
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

  const features = [
    {
      icon: Shield,
      title: "Special Financing Offers",
      description: "Our stress-free finance department that can find financial solutions to save you money.",
    },
    {
      icon: Tag,
      title: "Transparent Pricing",
      description: "Our stress-free finance department that can find financial solutions to save you money.",
    },
    {
      icon: Wrench,
      title: "Expert Car Service",
      description: "Our stress-free finance department that can find financial solutions to save you money.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-3xl font-bold text-foreground mb-12 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className={`text-left transform transition-all duration-700 hover:-translate-y-2 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="w-12 h-12 mb-6">
                  <IconComponent className="w-12 h-12 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
