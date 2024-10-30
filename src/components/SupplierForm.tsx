import { useState } from 'react';
import type { Supplier } from '../types';
import { X } from 'lucide-react';

interface SupplierFormProps {
  onSubmit: (supplier: Partial<Supplier>) => void;
  onClose: () => void;
  initialData?: Supplier;
}

const VALID_LOCATIONS = [
  'San Francisco, CA',
  'Austin, TX',
  'Seattle, WA',
  'Portland, OR',
  'Boston, MA',
  'New York, NY',
  'Chicago, IL',
  'Los Angeles, CA',
  'Miami, FL',
  'Denver, CO',
];

export default function SupplierForm({ onSubmit, onClose, initialData }: SupplierFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    location: initialData?.location || '',
    sustainabilityScore: initialData?.sustainabilityScore || 0,
    metrics: {
      carbonFootprint: initialData?.metrics?.carbonFootprint || 0,
      wasteOutput: initialData?.metrics?.wasteOutput || 0,
      energyEfficiency: initialData?.metrics?.energyEfficiency || 0,
      waterUsage: initialData?.metrics?.waterUsage || 0,
      renewableEnergy: initialData?.metrics?.renewableEnergy || 0,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Supplier' : 'Add New Supplier'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              >
                <option value="">Select a location</option>
                {VALID_LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Choose from supported locations for map display
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sustainability Score (0-100)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={formData.sustainabilityScore}
              onChange={(e) => setFormData({ ...formData, sustainabilityScore: Number(e.target.value) })}
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Environmental Metrics</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Carbon Footprint (tons CO2e)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.metrics.carbonFootprint}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: { ...formData.metrics, carbonFootprint: Number(e.target.value) }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Water Usage (gallons)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.metrics.waterUsage}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: { ...formData.metrics, waterUsage: Number(e.target.value) }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Energy Efficiency (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.metrics.energyEfficiency}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: { ...formData.metrics, energyEfficiency: Number(e.target.value) }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Renewable Energy (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.metrics.renewableEnergy}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: { ...formData.metrics, renewableEnergy: Number(e.target.value) }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Waste Output (tons)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.metrics.wasteOutput}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: { ...formData.metrics, wasteOutput: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {initialData ? 'Update Supplier' : 'Add Supplier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}