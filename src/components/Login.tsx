import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoginCredentials } from '../types/auth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Login() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-16 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="fixed top-8 left-8">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#004D40]">Ekumen</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-4xl font-bold tracking-tight text-[#004D40]">
          Bon retour sur Ekumen
        </h2>
        <p className="mt-4 text-center text-lg text-[#004D40]/80">
          Accédez à votre tableau de bord
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-lg sm:rounded-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-[#004D40]">
                Adresse Email
              </Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#004D40]/40" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10 border-[#004D40]/20 focus:border-[#004D40] focus:ring-[#004D40]"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-[#004D40]">
                Mot de passe
              </Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#004D40]/40" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-10 border-[#004D40]/20 focus:border-[#004D40] focus:ring-[#004D40]"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#004D40] hover:bg-[#003D33] text-white transition-colors"
            >
              Se Connecter
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#004D40]/80">
                  Pas encore de compte ?{' '}
                  <Link to="/signup" className="font-medium text-[#004D40] hover:text-[#003D33]">
                    S'inscrire
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}