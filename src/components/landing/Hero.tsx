import React from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  const scrollToSimulation = () => {
    const element = document.querySelector('#simulation-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/use-cases#simulation-section';
    }
  };

  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-24 sm:py-32 gap-x-8 gap-y-16">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 lg:pr-8">
            <div className="text-left">
              <h1 className="text-4xl font-bold tracking-tight text-[#004D40] sm:text-6xl">
                Simulez l'avenir de votre exploitation
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#004D40]">
                Anticipez vos performances agricoles et économiques grâce à notre simulateur d'assolement.
                Optimisez vos rotations de cultures et maximisez votre rentabilité.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/use-cases"
                  className="rounded-md bg-[#004D40] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#003D33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004D40]"
                >
                  Découvrir
                </Link>
                <button
                  onClick={scrollToSimulation}
                  className="text-sm font-semibold leading-6 text-[#004D40] hover:text-[#003D33]"
                >
                  Commencer la simulation <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="lg:w-1/2 lg:pl-8">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-50 shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Simulation visualization mockup */}
                <div className="w-full h-full p-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="space-y-1">
                        <div className="h-4 w-32 bg-[#004D40]/10 rounded"></div>
                        <div className="h-3 w-24 bg-[#004D40]/5 rounded"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-8 w-8 rounded-lg bg-[#004D40]/10"></div>
                        <div className="h-8 w-8 rounded-lg bg-[#004D40]/10"></div>
                      </div>
                    </div>
                    
                    {/* Main content */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-4">
                        <div className="h-24 bg-[#004D40]/5 rounded-lg"></div>
                        <div className="h-24 bg-[#004D40]/5 rounded-lg"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 bg-[#004D40]/10 rounded-lg"></div>
                        <div className="h-8 bg-[#004D40]/5 rounded-lg w-3/4"></div>
                        <div className="h-8 bg-[#004D40]/5 rounded-lg w-1/2"></div>
                        <div className="h-12 bg-[#004D40]/10 rounded-lg"></div>
                      </div>
                    </div>

                    {/* Bottom section */}
                    <div className="grid grid-cols-3 gap-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-16 bg-[#004D40]/5 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
