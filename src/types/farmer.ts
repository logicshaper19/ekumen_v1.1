export type FarmType = 'crop' | 'livestock' | 'mixed';

export interface FarmerSignup {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  siretNumber: string;
  farmAddress: string;
  farmType: FarmType;
  farmingDetails: string;
  farmSize: number;
}

export type SignupStep = 'personal' | 'business' | 'farm' | 'parcels';