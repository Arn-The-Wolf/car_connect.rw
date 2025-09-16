import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">Car Connect</div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="hover:text-gray-300 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Explore
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Contact
          </a>
        </nav>

        <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
          For Sale
        </Button>
      </div>
    </header>
  )
}
