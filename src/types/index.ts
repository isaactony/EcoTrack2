export interface Supplier {
  id: string;
  name: string;
  location: string;
  sustainabilityScore: number;
  certifications: Certification[];
  metrics: EnvironmentalMetrics;
  notes?: SupplierNote[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
}

export interface EnvironmentalMetrics {
  carbonFootprint: number;
  wasteOutput: number;
  energyEfficiency: number;
  waterUsage: number;
  renewableEnergy: number;
}

export interface SupplierNote {
  id: string;
  content: string;
  date: string;
}