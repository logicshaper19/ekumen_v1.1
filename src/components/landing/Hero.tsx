import React from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Simplifiez la gestion de votre exploitation agricole
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Gérez vos déclarations, suivez vos parcelles et optimisez votre exploitation agricole 
            avec notre plateforme tout-en-un.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/signup"
              className="rounded-md bg-black px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              S'inscrire
            </Link>
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Se connecter <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
