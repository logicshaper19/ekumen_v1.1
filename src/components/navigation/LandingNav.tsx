import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export function LandingNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 font-bold text-xl">
            Ekumen
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="#features" className="text-sm font-semibold leading-6 text-gray-900">
            Fonctionnalités
          </Link>
          <Link to="#how-it-works" className="text-sm font-semibold leading-6 text-gray-900">
            Comment ça marche
          </Link>
          <Link to="/use-cases" className="text-sm font-semibold leading-6 text-gray-900">
            Cas d'Usage
          </Link>
          <Link to="#benefits" className="text-sm font-semibold leading-6 text-gray-900">
            Avantages
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link to="/login">Se connecter</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">S'inscrire</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}