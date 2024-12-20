import { useState } from 'react';
import { Sprout, TrendingUp, LineChart, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SimulationForm } from '../components/simulation/SimulationForm';

export const UseCases = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white pt-32 pb-20 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#004D40] max-w-2xl mx-auto leading-tight">
            Anticipez l'avenir de votre exploitation
          </h1>
          <p className="text-xl text-[#004D40] text-center max-w-2xl mx-auto leading-relaxed">
            Découvrez comment nos simulations avancées peuvent vous aider à prendre les meilleures décisions pour votre exploitation agricole.
          </p>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Sprout className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#004D40]">
              Optimisation des Cultures
            </h3>
            <p className="text-[#004D40] mb-6">
              Analysez différents scénarios de rotation des cultures pour maximiser vos rendements tout en préservant la qualité de vos sols.
            </p>
            <ul className="space-y-3 text-[#004D40]">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Prévisions de rendement basées sur l'historique
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Recommandations personnalisées pour vos parcelles
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#004D40]">
              Gestion des Ressources
            </h3>
            <p className="text-[#004D40] mb-6">
              Optimisez l'utilisation de vos ressources en eau et en intrants pour une agriculture plus durable et rentable.
            </p>
            <ul className="space-y-3 text-[#004D40]">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Suivi précis des besoins en eau
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Optimisation des intrants agricoles
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <LineChart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#004D40]">
              Analyse Économique
            </h3>
            <p className="text-[#004D40] mb-6">
              Évaluez la rentabilité de vos décisions agricoles grâce à nos outils d'analyse économique détaillée.
            </p>
            <ul className="space-y-3 text-[#004D40]">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Calcul des marges par culture
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Simulation des scénarios économiques
              </li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#004D40]">
              Gestion des Risques
            </h3>
            <p className="text-[#004D40] mb-6">
              Anticipez et gérez les risques climatiques et économiques pour sécuriser votre exploitation.
            </p>
            <ul className="space-y-3 text-[#004D40]">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Prévisions météorologiques avancées
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Stratégies d'adaptation au changement climatique
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold mb-6 text-[#004D40]">Prêt à explorer les possibilités ?</h2>
          <Button 
            size="lg"
            onClick={() => {
              setShowForm(true);
              setTimeout(() => {
                document.getElementById('simulation-section')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }, 100);
            }}
            className="bg-[#004D40] hover:bg-[#003D33] text-white px-8 py-3 text-lg font-semibold"
          >
            Commencer la simulation
          </Button>
        </div>

        {/* Simulation Form */}
        {showForm && (
          <div id="simulation-section" className="mt-24 pt-16 border-t">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#004D40]">Commençons votre simulation</h2>
            <SimulationForm />
          </div>
        )}
      </div>
    </div>
  );
};
