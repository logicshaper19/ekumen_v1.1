import React, { useState } from 'react';
import { Map } from 'lucide-react';

interface Plot {
  id: string;
  name: string;
  size: string;
  coordinates: string;
  crops2023: string[];
  color: string;
}

interface ParcelIdentificationStepProps {
  onSubmit: () => void;
  onBack: () => void;
}

const samplePlots: Plot[] = [
  {
    id: 'p1',
    name: 'Parcelle Nord',
    size: '5.2 hectares',
    coordinates: '48°51\'N 2°21\'E',
    crops2023: ['Blé tendre', 'Colza'],
    color: 'bg-green-100'
  },
  {
    id: 'p2',
    name: 'Parcelle Sud',
    size: '3.8 hectares',
    coordinates: '48°50\'N 2°21\'E',
    crops2023: ['Maïs', 'Tournesol'],
    color: 'bg-yellow-100'
  },
  {
    id: 'p3',
    name: 'Parcelle Est',
    size: '4.5 hectares',
    coordinates: '48°51\'N 2°22\'E',
    crops2023: ['Orge', 'Betterave sucrière'],
    color: 'bg-orange-100'
  },
  {
    id: 'p4',
    name: 'Parcelle Ouest',
    size: '6.1 hectares',
    coordinates: '48°51\'N 2°20\'E',
    crops2023: ['Pommes de terre', 'Légumineuses'],
    color: 'bg-blue-100'
  }
];

export function ParcelIdentificationStep({ onSubmit, onBack }: ParcelIdentificationStepProps) {
  const [hoveredPlot, setHoveredPlot] = useState<Plot | null>(null);
  const [selectedPlots, setSelectedPlots] = useState<string[]>([]);

  const handlePlotClick = (plotId: string) => {
    setSelectedPlots(prev => {
      if (prev.includes(plotId)) {
        return prev.filter(id => id !== plotId);
      }
      return [...prev, plotId];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Identification des Parcelles
          </label>
          <p className="mt-1 text-sm text-gray-500">
            Survolez les parcelles pour voir les détails. Cliquez pour les sélectionner.
          </p>
        </div>

        {/* Simulated Map Area */}
        <div className="relative border-2 border-gray-200 rounded-lg p-4 min-h-[600px]">
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full">
            <Map className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Vue Satellite</span>
          </div>
          
          {/* Grid of plots */}
          <div className="grid grid-cols-2 gap-6 mt-16">
            {samplePlots.map(plot => (
              <div
                key={plot.id}
                className={`
                  group
                  relative h-64 ${plot.color} rounded-lg cursor-pointer transition-all duration-300
                  ${selectedPlots.includes(plot.id) 
                    ? 'ring-4 ring-black shadow-lg transform scale-[1.02]' 
                    : 'hover:ring-2 hover:ring-gray-400 hover:shadow-md hover:scale-[1.01]'
                  }
                  ${hoveredPlot?.id === plot.id ? 'shadow-lg' : ''}
                `}
                onMouseEnter={() => setHoveredPlot(plot)}
                onMouseLeave={() => setHoveredPlot(null)}
                onClick={() => handlePlotClick(plot.id)}
              >
                {/* Card Content */}
                <div className={`
                  absolute inset-0 p-4 flex flex-col
                  ${hoveredPlot?.id === plot.id ? 'bg-white/95' : 'bg-white/0 hover:bg-white/95'}
                  rounded-lg transition-all duration-300
                `}>
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {plot.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-600">
                      {plot.size}
                    </span>
                  </div>

                  {/* Details - Only visible on hover */}
                  <div className={`
                    mt-4 space-y-3 opacity-0 transition-all duration-300
                    ${hoveredPlot?.id === plot.id ? 'opacity-100' : 'group-hover:opacity-100'}
                  `}>
                    <div>
                      <p className="text-sm text-gray-600">Coordonnées:</p>
                      <p className="text-sm font-medium text-gray-900">{plot.coordinates}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-1.5">Cultures 2023:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {plot.crops2023.map((crop, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Selection Status */}
                  {selectedPlots.includes(plot.id) && (
                    <div className="absolute bottom-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-full">
                      Sélectionné
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Retour
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Terminer l'Inscription
        </button>
      </div>
    </form>
  );
}
