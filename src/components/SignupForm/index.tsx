import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FarmerSignup, SignupStep } from '../../types/farmer';
import { PersonalInfoStep } from './PersonalInfoStep';
import { BusinessInfoStep } from './BusinessInfoStep';
import { FarmDetailsStep } from './FarmDetailsStep';
import { ParcelIdentificationStep } from './ParcelIdentificationStep';
import { ProgressBar } from './ProgressBar';
import { useAuth } from '../../context/AuthContext';

const initialFormData: FarmerSignup = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  siretNumber: '',
  farmAddress: '',
  farmType: 'crop',
  farmingDetails: '',
  farmSize: 0,
};

export function SignupForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState<SignupStep>('personal');
  const [formData, setFormData] = useState<FarmerSignup>(initialFormData);

  const handleChange = (field: keyof FarmerSignup, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Simulate successful signup and login
    login({
      id: '1',
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    });

    // Show success message
    alert('Inscription réussie ! Bienvenue sur Ekumen.');
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalInfoStep
            formData={formData}
            onChange={handleChange}
            onNext={() => setCurrentStep('business')}
          />
        );
      case 'business':
        return (
          <BusinessInfoStep
            formData={formData}
            onChange={handleChange}
            onNext={() => setCurrentStep('farm')}
            onBack={() => setCurrentStep('personal')}
          />
        );
      case 'farm':
        return (
          <FarmDetailsStep
            formData={formData}
            onChange={handleChange}
            onNext={() => setCurrentStep('parcels')}
            onBack={() => setCurrentStep('business')}
          />
        );
      case 'parcels':
        return (
          <ParcelIdentificationStep
            onSubmit={handleSubmit}
            onBack={() => setCurrentStep('farm')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-12 bg-white p-16 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-center text-5xl font-bold tracking-tight text-gray-900">
            Bienvenue sur Ekumen
          </h2>
          <p className="mt-6 text-center text-xl text-gray-600">
            Configurons votre exploitation dans notre système
          </p>
        </div>

        <ProgressBar currentStep={currentStep} />
        
        <div className="bg-gray-50/70 p-10 rounded-xl">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}