import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Upload, Map, FileSpreadsheet } from 'lucide-react';

export function UseCases() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Section 1: Introduction */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <h1 className="text-4xl font-bold text-center mb-6">Cas d'Usage</h1>
        <p className="text-xl text-gray-600 text-center mb-8">
          Nous cherchons à donner aux agriculteurs les moyens d'anticiper l'avenir grâce à nos simulations avancées.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Rotation des Cultures</h3>
            <p className="text-gray-600">Optimisez vos rendements avec des stratégies de rotation intelligentes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Impact Environnemental</h3>
            <p className="text-gray-600">Évaluez et améliorez votre empreinte environnementale.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Analyse Économique</h3>
            <p className="text-gray-600">Anticipez les impacts financiers de vos décisions.</p>
          </div>
        </div>
      </section>

      {/* Section 2: Required Information */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Ce dont nous avons besoin</h2>
          <p className="text-gray-600 mb-8">
            Plus vous nous fournissez d'informations, plus nos simulations seront précises et pertinentes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#00A9A3] bg-opacity-10 flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-6 h-6 text-[#00A9A3]" />
              </div>
              <h3 className="font-semibold mb-2">Itinéraire Technique</h3>
              <p className="text-gray-600">Importez depuis MesParcelles ou saisissez manuellement</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#00A9A3] bg-opacity-10 flex items-center justify-center mb-4">
                <Map className="w-6 h-6 text-[#00A9A3]" />
              </div>
              <h3 className="font-semibold mb-2">Sélection des Parcelles</h3>
              <p className="text-gray-600">Sélectionnez vos terres via le RPG</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#00A9A3] bg-opacity-10 flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-[#00A9A3]" />
              </div>
              <h3 className="font-semibold mb-2">Données du Sol</h3>
              <p className="text-gray-600">Ajoutez les caractéristiques de votre sol</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Get Started */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Commencer</h2>
        <p className="text-xl text-gray-600 mb-8">
          Prêt à explorer les possibilités ? Commencez par importer votre itinéraire technique.
        </p>
        <Button 
          size="lg"
          onClick={() => navigate('/upload-itinerary')}
          className="bg-[#00A9A3] hover:bg-[#008C87] text-white"
        >
          Importer l'Itinéraire Technique
        </Button>
      </section>
    </div>
  );
}
