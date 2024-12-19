import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../utils/scroll';

export function LandingNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    if (to.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(to.substring(1)), 100);
      } else {
        scrollToSection(to.substring(1));
      }
    } else {
      navigate(to);
    }
  };

  return (
    <header className="fixed w-full bg-white z-50 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto">
        <nav className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-[22px] font-semibold text-[#004D40]">
              Ekumen
            </span>
          </Link>

          {/* Main Navigation */}
          <div className="flex items-center gap-x-12">
            <Link
              to="/equipe"
              className="text-[15px] font-medium text-[#004D40] hover:text-[#003D33] transition-colors"
            >
              Équipe
            </Link>
            <a
              href="#how-it-works"
              onClick={(e) => handleNavigation(e, '#how-it-works')}
              className="text-[15px] font-medium text-[#004D40] hover:text-[#003D33] transition-colors"
            >
              Comment ça marche
            </a>
            <Link
              to="/use-cases"
              className="text-[15px] font-medium text-[#004D40] hover:text-[#003D33] transition-colors"
            >
              Cas d'Usage
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-x-4">
            <Link
              to="/login"
              className="inline-flex items-center text-[15px] font-medium text-[#004D40] hover:text-[#003D33] transition-colors px-4 py-2 rounded-full border border-[#004D40] hover:bg-[#004D40] hover:text-white"
            >
              Connexion
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center text-[15px] font-medium text-white bg-[#004D40] hover:bg-[#003D33] transition-colors px-6 py-2 rounded-full"
            >
              S'inscrire
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}