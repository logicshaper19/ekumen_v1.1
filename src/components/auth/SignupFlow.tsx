import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from '../../context/AuthContext'; // Fixed import path

// Step 1 validation schema
const step1Schema = z.object({
  siret: z.string().length(14, 'Le numéro SIRET doit contenir 14 chiffres'),
  farmAddress: z.string().min(1, 'L\'adresse de l\'exploitation est requise'),
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('L\'email doit être valide'),
});

// Step 2 validation schema
const step2Schema = z.object({
  farmType: z.enum(['crop', 'livestock', 'mixed'], {
    required_error: 'Le type d\'exploitation est requis'
  }),
  farmSize: z.string().min(1, 'La taille de l\'exploitation est requise'),
  farmingDetails: z.string().min(1, 'Les détails de l\'exploitation sont requis'),
});

// Step 3 validation schema
const step3Schema = z.object({
  selectedParcels: z.array(z.string()).min(1, 'Sélectionnez au moins une parcelle')
});

// Complete schema for final data
const signupFlowSchema = step1Schema.merge(step2Schema).merge(step3Schema);

// Types
interface SignupFlowData {
  siret: string;
  farmAddress: string;
  farmType: 'crop' | 'livestock' | 'mixed';
  farmSize: number;
  farmingDetails: string;
  selectedParcels: string[];
  firstName: string;
  lastName: string;
  email: string;
}

// Simulated parcel data
const parcels = [
  {
    id: '1',
    coordinates: '48.8566° N, 2.3522° E',
    year: 2023,
    crop: 'Blé',
    size: '5.2'
  },
  {
    id: '2',
    coordinates: '48.8566° N, 2.3522° E',
    year: 2023,
    crop: 'Maïs',
    size: '3.8'
  },
  {
    id: '3',
    coordinates: '48.8566° N, 2.3522° E',
    year: 2023,
    crop: 'Colza',
    size: '4.5'
  },
  {
    id: '4',
    coordinates: '48.8566° N, 2.3522° E',
    year: 2023,
    crop: 'Orge',
    size: '6.1'
  }
];

const steps = [
  {
    id: 1,
    name: 'Informations de base',
    description: 'SIRET, adresse de l\'exploitation et informations personnelles',
    icon: '📋'
  },
  {
    id: 2,
    name: 'Détails agricoles',
    description: 'Type et taille de l\'exploitation',
    icon: '🌾'
  },
  {
    id: 3,
    name: 'Sélection des parcelles',
    description: 'Sélectionnez vos parcelles agricoles',
    icon: '🗺️'
  },
  {
    id: 4,
    name: 'Vérification',
    description: 'Vérifiez vos informations',
    icon: '✓'
  }
];

export function SignupFlow() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [formData, setFormData] = useState<Partial<SignupFlowData>>({});
  
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<SignupFlowData>({
    resolver: zodResolver(getCurrentStepSchema(step)),
    defaultValues: formData
  });

  const { login } = useAuth(); // Get the login function from the auth context

  function getCurrentStepSchema(currentStep: number) {
    switch (currentStep) {
      case 1:
        return step1Schema;
      case 2:
        return step2Schema;
      case 3:
        return step3Schema;
      case 4:
        return signupFlowSchema; // Use complete schema for final review
      default:
        return step1Schema;
    }
  }

  const onSubmit = async (data: SignupFlowData) => {
    if (step < 4) {
      setFormData({ ...formData, ...data });
      setStep(step + 1);
    } else {
      try {
        const finalData = {
          ...formData,
          ...data,
          selectedParcels
        };
        
        // Simulate API call for signup
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create the user object
        const user = {
          id: Date.now().toString(), // Temporary ID for demo
          firstName: finalData.firstName,
          lastName: finalData.lastName,
          email: finalData.email,
          farmDetails: {
            siret: finalData.siret,
            address: finalData.farmAddress,
            type: finalData.farmType,
            size: finalData.farmSize,
            parcels: selectedParcels
          }
        };
        
        // Set auth state using context
        login(user);
        
        // Navigate directly to dashboard
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Error during signup:', error);
        // Handle error appropriately
      }
    }
  };

  const handleParcelSelection = (parcelId: string) => {
    const newSelection = selectedParcels.includes(parcelId)
      ? selectedParcels.filter(id => id !== parcelId)
      : [...selectedParcels, parcelId];
    
    setSelectedParcels(newSelection);
    setValue('selectedParcels', newSelection, { shouldValidate: true });
  };

  useEffect(() => {
    if (step === 4) {
      // When reaching review step, ensure all previous data is set
      const values = getValues();
      setFormData(values);
    }
  }, [step, getValues]);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="siret">Numéro SIRET</Label>
              <Input
                id="siret"
                {...register('siret')}
                className="mt-1"
                placeholder="14 chiffres"
                defaultValue={formData.siret}
              />
              {errors.siret && (
                <p className="text-sm text-red-600 mt-1">{errors.siret.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="farmAddress">Adresse de l'exploitation</Label>
              <Input
                id="farmAddress"
                {...register('farmAddress')}
                className="mt-1"
                placeholder="Adresse complète de l'exploitation"
                defaultValue={formData.farmAddress}
              />
              {errors.farmAddress && (
                <p className="text-sm text-red-600 mt-1">{errors.farmAddress.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                className="mt-1"
                placeholder="Prénom"
                defaultValue={formData.firstName}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                className="mt-1"
                placeholder="Nom"
                defaultValue={formData.lastName}
              />
              {errors.lastName && (
                <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register('email')}
                className="mt-1"
                placeholder="Adresse email"
                defaultValue={formData.email}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>Type d'exploitation</Label>
              <RadioGroup
                defaultValue={formData.farmType}
                onValueChange={(value: string) => setValue('farmType', value as 'crop' | 'livestock' | 'mixed', { shouldValidate: true })}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="crop" id="crop" />
                  <Label htmlFor="crop">Culture</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="livestock" id="livestock" />
                  <Label htmlFor="livestock">Élevage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed">Mixte</Label>
                </div>
              </RadioGroup>
              {errors.farmType && (
                <p className="text-sm text-red-600 mt-1">{errors.farmType.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="farmSize">Taille de l'exploitation (hectares)</Label>
              <Input
                id="farmSize"
                type="number"
                {...register('farmSize')}
                className="mt-1"
                placeholder="Superficie en hectares"
                defaultValue={formData.farmSize}
              />
              {errors.farmSize && (
                <p className="text-sm text-red-600 mt-1">{errors.farmSize.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="farmingDetails">Détails de l'exploitation</Label>
              <Input
                id="farmingDetails"
                {...register('farmingDetails')}
                className="mt-1"
                placeholder="Cultures ou animaux principaux"
                defaultValue={formData.farmingDetails}
              />
              {errors.farmingDetails && (
                <p className="text-sm text-red-600 mt-1">{errors.farmingDetails.message}</p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Sélectionnez les parcelles qui composent votre exploitation
            </p>
            <div className="grid grid-cols-2 gap-4">
              {parcels.map((parcel) => (
                <div
                  key={parcel.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors
                    ${selectedParcels.includes(parcel.id)
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                  onClick={() => handleParcelSelection(parcel.id)}
                >
                  <div className="font-medium">Parcelle {parcel.id}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    <div>Coordonnées: {parcel.coordinates}</div>
                    <div>Culture 2023: {parcel.crop}</div>
                    <div>Taille: {parcel.size} ha</div>
                  </div>
                </div>
              ))}
            </div>
            {errors.selectedParcels && (
              <p className="text-sm text-red-600 mt-2">{errors.selectedParcels.message}</p>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Résumé de votre exploitation</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">SIRET</h4>
                    <p className="mt-1 text-gray-900">{formData.siret}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Adresse</h4>
                    <p className="mt-1 text-gray-900">{formData.farmAddress}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Type d'exploitation</h4>
                    <p className="mt-1 text-gray-900">
                      {formData.farmType === 'crop' ? 'Culture' :
                       formData.farmType === 'livestock' ? 'Élevage' :
                       'Mixte'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Taille</h4>
                    <p className="mt-1 text-gray-900">{formData.farmSize} hectares</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium text-gray-500">Détails de l'exploitation</h4>
                  <p className="mt-1 text-gray-900">{formData.farmingDetails}</p>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">Parcelles sélectionnées ({selectedParcels.length})</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedParcels.map((parcelId) => {
                      const parcel = parcels.find(p => p.id === parcelId);
                      return (
                        <div key={parcelId} className="bg-gray-50 p-3 rounded-md">
                          <p className="font-medium">Parcelle {parcelId}</p>
                          {parcel && (
                            <div className="text-sm text-gray-600 mt-1">
                              <p>Culture: {parcel.crop}</p>
                              <p>Taille: {parcel.size} ha</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>Vérifiez que toutes les informations sont correctes avant de continuer.</p>
              <p>Vous pourrez modifier ces informations plus tard depuis votre tableau de bord.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-2">
          {steps[step - 1].name}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-8">
          {steps[step - 1].description}
        </p>

        {/* Progress Steps */}
        <div className="max-w-xl mx-auto px-4">
          <nav aria-label="Progress">
            <ol role="list" className="flex items-center justify-between">
              {steps.map((s, index) => (
                <li key={s.id} className={`relative ${
                  index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
                }`}>
                  <div className="flex items-center">
                    <div className={`
                      relative flex h-12 w-12 items-center justify-center rounded-full
                      ${step > s.id ? 'bg-black' : step === s.id ? 'bg-black' : 'bg-gray-200'}
                      transition-colors duration-200
                    `}>
                      <span className="text-xl">{s.icon}</span>
                      {index !== steps.length - 1 && (
                        <div className={`
                          absolute -right-12 top-6 h-0.5 w-24
                          ${step > s.id ? 'bg-black' : 'bg-gray-200'}
                          transition-colors duration-200
                        `} />
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className={`
                      text-sm font-medium
                      ${step >= s.id ? 'text-black' : 'text-gray-500'}
                    `}>
                      {s.name}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Progress Bar */}
        <div className="max-w-xl mx-auto mt-8 px-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-black h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Étape {step} sur {steps.length}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStep()}
            
            <div className="flex space-x-4 mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="w-full"
                >
                  Retour
                </Button>
              )}
              <Button
                type="submit"
                className="w-full"
              >
                {step === 4 ? 'Terminer' : 'Continuer'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
