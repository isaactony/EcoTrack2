import type { Supplier } from '../types';

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'EcoTech Solutions',
    location: 'San Francisco, CA',
    sustainabilityScore: 92,
    certifications: [
      {
        id: 'cert1',
        name: 'ISO 14001',
        issuer: 'ISO',
        expiryDate: '2024-12-31',
        status: 'active',
      },
      {
        id: 'cert2',
        name: 'Green Business Certification',
        issuer: 'GBC',
        expiryDate: '2024-08-15',
        status: 'active',
      },
    ],
    metrics: {
      carbonFootprint: 125.4,
      wasteOutput: 45.2,
      energyEfficiency: 89.5,
      waterUsage: 1250.8,
      renewableEnergy: 78.3,
    },
  },
  {
    id: '2',
    name: 'Sustainable Manufacturing Co.',
    location: 'Austin, TX',
    sustainabilityScore: 85,
    certifications: [
      {
        id: 'cert3',
        name: 'LEED Certification',
        issuer: 'USGBC',
        expiryDate: '2024-10-20',
        status: 'active',
      },
    ],
    metrics: {
      carbonFootprint: 198.6,
      wasteOutput: 62.8,
      energyEfficiency: 76.2,
      waterUsage: 2150.4,
      renewableEnergy: 65.7,
    },
  },
  {
    id: '3',
    name: 'Green Logistics Inc.',
    location: 'Seattle, WA',
    sustainabilityScore: 78,
    certifications: [
      {
        id: 'cert4',
        name: 'SmartWay Transport',
        issuer: 'EPA',
        expiryDate: '2024-06-30',
        status: 'active',
      },
    ],
    metrics: {
      carbonFootprint: 312.7,
      wasteOutput: 89.4,
      energyEfficiency: 71.8,
      waterUsage: 1875.2,
      renewableEnergy: 45.9,
    },
  },
  {
    id: '4',
    name: 'Nordic Eco Industries',
    location: 'Portland, OR',
    sustainabilityScore: 95,
    certifications: [
      {
        id: 'cert5',
        name: 'B Corp Certification',
        issuer: 'B Lab',
        expiryDate: '2025-01-15',
        status: 'active',
      },
      {
        id: 'cert6',
        name: 'Cradle to Cradle',
        issuer: 'C2C',
        expiryDate: '2024-11-30',
        status: 'active',
      },
    ],
    metrics: {
      carbonFootprint: 89.2,
      wasteOutput: 28.5,
      energyEfficiency: 94.7,
      waterUsage: 980.3,
      renewableEnergy: 92.1,
    },
  },
  {
    id: '5',
    name: 'CircularTech Innovations',
    location: 'Boston, MA',
    sustainabilityScore: 88,
    certifications: [
      {
        id: 'cert7',
        name: 'ISO 50001',
        issuer: 'ISO',
        expiryDate: '2024-09-20',
        status: 'active',
      },
    ],
    metrics: {
      carbonFootprint: 156.8,
      wasteOutput: 42.3,
      energyEfficiency: 85.9,
      waterUsage: 1580.6,
      renewableEnergy: 71.4,
    },
  },
];