import type React from "react"

interface CarIconProps {
  className?: string
}

const CarIcon: React.FC<CarIconProps> = ({ className = "h-6 w-6" }) => {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-1.5-1.5c-.4-.4-.9-.5-1.4-.5H16c-.6 0-1.1-.4-1.2-1L14 8H6l-.8 3c-.1.6-.6 1-1.2 1h-.1c-.5 0-1 .1-1.4.5L1 14v5c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-1h12v1c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-5z"
      />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}

export default CarIcon
