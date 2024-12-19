import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { FileSpreadsheet, ArrowRight, Map, Check, Crop } from 'lucide-react';

type Step = {
  title: string;
  description: string;
};

type Rotation = {
  id: string;
  sequence: string[];
  selected: boolean;
};

type Plot = {
  id: string;
  name: string;
  size: number;
  currentCrop: string;
  selected: boolean;
};

const steps: Step[] = [
  {
    title: "Import de l'itinéraire",
    description: "Importez votre itinéraire technique depuis MesParcelles ou utilisez notre modèle",
  },
  {
    title: "Confirmation",
    description: "Vérifiez et confirmez vos rotations de cultures",
  },
  {
    title: "Parcelles",
    description: "Sélectionnez vos parcelles pour la simulation",
  }
];

const rotationOptions: Rotation[] = [
  {
    id: 'rotation1',
    sequence: ['Colza', 'Blé', 'Orge'],
    selected: false
  },
  {
    id: 'rotation2',
    sequence: ['Colza', 'Blé', 'Pois protéagineux', 'Blé'],
    selected: false
  },
  {
    id: 'rotation3',
    sequence: ['Tournesol', 'Blé', 'Orge'],
    selected: false
  }
];

const plotOptions: Plot[] = [
  {
    id: 'plot1',
    name: 'La Grande Plaine',
    size: 25.5,
    currentCrop: 'Blé',
    selected: false
  },
  {
    id: 'plot2',
    name: 'Les Quatre Vents',
    size: 18.3,
    currentCrop: 'Colza',
    selected: false
  },
  {
    id: 'plot3',
    name: 'Le Champ du Moulin',
    size: 30.7,
    currentCrop: 'Orge',
    selected: false
  },
  {
    id: 'plot4',
    name: 'La Vallée Verte',
    size: 22.1,
    currentCrop: 'Tournesol',
    selected: false
  }
];

export function SimulationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [rotations, setRotations] = useState<Rotation[]>(rotationOptions);
  const [plots, setPlots] = useState<Plot[]>(plotOptions);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleRotationSelect = (rotationId: string) => {
    setRotations(prevRotations =>
      prevRotations.map(rotation => ({
        ...rotation,
        selected: rotation.id === rotationId
      }))
    );
  };

  const handlePlotSelect = (plotId: string) => {
    setPlots(prevPlots =>
      prevPlots.map(plot => ({
        ...plot,
        selected: plot.id === plotId ? !plot.selected : plot.selected
      }))
    );
  };

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      navigate('/results');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const canProceed = () => {
    if (currentStep === 0) return !!file;
    if (currentStep === 1) return rotations.some(r => r.selected);
    if (currentStep === 2) return plots.some(p => p.selected);
    return true;
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${index === currentStep ? 'bg-[#00A9A3] text-white' : 
                  index < currentStep ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}
              `}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-24 h-1 mx-2
                  ${index < currentStep ? 'bg-green-100' : 'bg-gray-100'}
                `} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-2">{steps[currentStep].title}</h3>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl p-8 shadow-sm border mb-8">
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileSpreadsheet className="w-12 h-12 mb-4 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Cliquez pour importer</span> ou glissez-déposez
                  </p>
                  <p className="text-xs text-gray-500">Format Excel ou CSV</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="text-center">
              <Button 
                variant="outline"
                onClick={() => window.open('/template.xlsx')}
              >
                Télécharger le modèle
              </Button>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid gap-4">
              {rotations.map((rotation) => (
                <div
                  key={rotation.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${rotation.selected 
                      ? 'border-[#00A9A3] bg-[#00A9A3]/5' 
                      : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handleRotationSelect(rotation.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        {rotation.sequence.map((crop, index) => (
                          <div key={index} className="flex items-center">
                            <span className="font-medium">{crop}</span>
                            {index < rotation.sequence.length - 1 && (
                              <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        {rotation.sequence.length} cultures dans la rotation
                      </p>
                    </div>
                    {rotation.selected && (
                      <div className="w-6 h-6 rounded-full bg-[#00A9A3] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plots.map((plot) => (
                <div
                  key={plot.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${plot.selected 
                      ? 'border-[#00A9A3] bg-[#00A9A3]/5' 
                      : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handlePlotSelect(plot.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Crop className="w-5 h-5 text-[#00A9A3] mr-2" />
                        <h4 className="font-medium">{plot.name}</h4>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          Surface: {plot.size} hectares
                        </p>
                        <p className="text-sm text-gray-600">
                          Culture actuelle: {plot.currentCrop}
                        </p>
                      </div>
                    </div>
                    {plot.selected && (
                      <div className="w-6 h-6 rounded-full bg-[#00A9A3] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Surface totale sélectionnée: {plots.filter(p => p.selected).reduce((acc, plot) => acc + plot.size, 0).toFixed(1)} hectares
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Retour
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="bg-[#00A9A3] hover:bg-[#008C87] text-white"
        >
          {currentStep === steps.length - 1 ? 'Voir les résultats' : 'Suivant'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
