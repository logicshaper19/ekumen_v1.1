import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

interface SSOProvider {
  id: string;
  name: string;
  logo: string;
}

const providers: SSOProvider[] = [
  {
    id: 'smag',
    name: 'SMAG',
    logo: '/images/smag-logo.png',
  },
  {
    id: 'isagri',
    name: 'ISAGRI',
    logo: '/images/isagri-logo.png',
  }
];

export function SSOProviders() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === '/signup';

  const handleSSOClick = (_provider: SSOProvider) => {
    // For now, just redirect to signup flow
    navigate('/auth/signup-flow');
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {isSignup ? 'Créer un compte avec' : 'Se connecter avec'}
        </h2>
        <p className="text-gray-600">
          {isSignup 
            ? 'Choisissez votre fournisseur de services agricoles pour créer votre compte'
            : 'Choisissez votre fournisseur de services agricoles'}
        </p>
      </div>

      <div className="space-y-3">
        {providers.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            className="w-full flex items-center justify-center space-x-3 h-14 border-2 hover:bg-gray-50"
            onClick={() => handleSSOClick(provider)}
          >
            <div className="w-6 h-6 relative flex items-center justify-center">
              <img
                src={provider.logo}
                alt={`${provider.name} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-gray-700">
              {isSignup 
                ? `Créer un compte avec ${provider.name}`
                : `Se connecter avec ${provider.name}`}
            </span>
          </Button>
        ))}
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">ou</span>
        </div>
      </div>
    </div>
  );
}
