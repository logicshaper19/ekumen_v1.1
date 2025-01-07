import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { LogIn } from 'lucide-react'

export function LandingNav() {
  return (
    <nav className="bg-[#FAF7F0] border-b border-[#004D40]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-[#004D40]">
                Ekumen
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/use-cases"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#004D40] hover:text-[#004D40]/80"
              >
                Cas d'Usage
              </Link>
              <Link
                to="/results"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#004D40] hover:text-[#004D40]/80"
              >
                Résultats
              </Link>
              <Link
                to="/equipe"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#004D40] hover:text-[#004D40]/80"
              >
                Équipe
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center">
            <Button
              asChild
              className="bg-[#004D40] text-[#FAF7F0] hover:bg-[#004D40]/90"
            >
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Se connecter
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}