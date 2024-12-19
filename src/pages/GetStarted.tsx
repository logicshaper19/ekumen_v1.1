import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Upload, ArrowRight, FileSpreadsheet } from 'lucide-react';

export const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white pt-32 pb-16 border-b">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Commencez votre simulation en quelques minutes
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Pour vous fournir les meilleures recommandations, nous avons besoin de votre itinéraire technique.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Upload Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border mb-12">
          <div className="flex items-start space-x-6">
            <div className="w-12 h-12 bg-[#00A9A3] bg-opacity-15 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileSpreadsheet className="w-6 h-6 text-[#00A9A3]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Importez votre itinéraire technique</h2>
              <p className="text-gray-600 mb-6">
                Importez votre fichier depuis MesParcelles ou utilisez notre modèle pour une saisie manuelle. 
                Nous utiliserons ces données pour créer votre simulation personnalisée.
              </p>
              <div className="flex items-center space-x-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/upload-itinerary')}
                  className="bg-[#00A9A3] hover:bg-[#008C87] text-white px-8 py-3 text-lg font-semibold"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Importer le fichier
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('/template.xlsx')}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Télécharger le modèle
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next Section */}
        <div className="space-y-8">
          <h3 className="text-xl font-semibold text-gray-900">Ce qui vous attend</h3>
          
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-semibold">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Confirmation des données</h4>
              <p className="text-gray-600">
                Nous vous demanderons de confirmer quelques informations comme vos rotations de cultures.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-semibold">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Sélection de parcelles</h4>
              <p className="text-gray-600">
                Vous pourrez sélectionner vos parcelles sur une carte interactive pour une simulation plus précise.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-semibold">3</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Résultats et recommandations</h4>
              <p className="text-gray-600">
                Découvrez vos résultats et créez un compte pour sauvegarder vos simulations et accéder à plus de fonctionnalités.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
