import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginCredentials } from '../types/auth';
import { Link } from 'react-router-dom';

export function Login() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Determine role based on email
    const isBankUser = credentials.email === 'gr@bank.com';
    
    // Mock user data - in a real app, this would come from your backend
    const mockUser = {
      id: '1',
      firstName: isBankUser ? 'Groupe' : 'Marie',
      lastName: isBankUser ? 'Régional' : 'Martin',
      email: credentials.email,
      role: isBankUser ? 'bank' : 'farmer'
    };
    login(mockUser);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="fixed top-8 left-8">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#004D40]">Ekumen</span>
        </Link>
      </div>

      {/* Login Form */}
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-[#004D40]">
                Bon retour sur Ekumen
              </h2>
              <p className="mt-3 text-gray-600">
                Accédez à votre tableau de bord
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#004D40] focus:border-[#004D40] sm:text-sm"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#004D40] focus:border-[#004D40] sm:text-sm"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004D40] hover:bg-[#00695C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004D40]"
                >
                  Se connecter
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Vous n'avez pas de compte ?{' '}
                    <Link to="/signup" className="font-medium text-[#004D40] hover:text-[#00695C]">
                      Inscrivez-vous
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}