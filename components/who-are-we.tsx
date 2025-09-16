"use client"

import { useEffect, useRef, useState } from "react"

export function WhoAreWe() {
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

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transform transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">Who Are We?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quis sed facilisis sit
              sapien lorem et vitae risus pellentesque tempor ut placerat. Placerat ut sit cursus ut pretium lorem ante.
              Pretium velit lorem et vitae risus pellentesque tempor ut placerat.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Placerat ut sit cursus ut pretium lorem ante. Pretium velit lorem et vitae risus pellentesque tempor ut
              placerat.
            </p>
          </div>

          <div
            className={`relative transform transition-all duration-700 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/luxury-black-sports-car-side-view.jpg"
                alt="Luxury car 1"
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
              <img
                src="/green-vintage-classic-car.jpg"
                alt="Luxury car 2"
                className="rounded-lg shadow-lg mt-8 hover:shadow-xl transition-shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
