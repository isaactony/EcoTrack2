import { useState } from 'react';
import { Users, Award, AlertTriangle, TrendingUp, Droplets, Zap } from 'lucide-react';
import SupplierList from './SupplierList';
import { mockSuppliers } from '../data/mockData';
import MetricsCard from './MetricsCard';
import SupplierForm from './SupplierForm';
import SupplierMap from './SupplierMap';
import SearchBar from './SearchBar';
import type { Supplier } from '../types';

export default function Dashboard() {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const stats = [
    {
      name: 'Total Suppliers',
      value: suppliers.length.toString(),
      icon: Users,
      change: '+12%',
      changeType: 'increase' as const,
      description: 'Active suppliers in network',
    },
    {
      name: 'Sustainability Score',
      value: (suppliers.reduce((acc, s) => acc + s.sustainabilityScore, 0) / suppliers.length).toFixed(1),
      icon: TrendingUp,
      change: '+4.3%',
      changeType: 'increase' as const,
      description: 'Average across all suppliers',
    },
    {
      name: 'Water Usage',
      value: '1.2M',
      icon: Droplets,
      change: '-8%',
      changeType: 'decrease' as const,
      description: 'Gallons per month',
    },
    {
      name: 'Energy Efficiency',
      value: '92%',
      icon: Zap,
      change: '+5%',
      changeType: 'increase' as const,
      description: 'Average efficiency rating',
    },
  ];

  const handleUpdateSupplier = (updatedSupplier: Supplier) => {
    const updatedSuppliers = suppliers.map(s => 
      s.id === updatedSupplier.id ? updatedSupplier : s
    );
    setSuppliers(updatedSuppliers);
    setFilteredSuppliers(updatedSuppliers);
    setEditingSupplier(null);
  };

  const handleSearch = (results: Supplier[]) => {
    setFilteredSuppliers(results);
  };

  const handleMapSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    const element = document.getElementById(`supplier-${supplier.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-20 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Supplier Dashboard</h1>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <SearchBar suppliers={suppliers} onSearch={handleSearch} />
            <button 
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
            >
              Add Supplier
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <MetricsCard key={item.name} {...item} />
          ))}
        </div>

        <div className="mt-8">
          <SupplierMap 
            suppliers={filteredSuppliers}
            onSelectSupplier={handleMapSelect}
          />
        </div>

        <div className="mt-8">
          <SupplierList 
            suppliers={filteredSuppliers}
            onEdit={handleUpdateSupplier}
            selectedId={selectedSupplier?.id}
          />
        </div>

        {showAddForm && (
          <SupplierForm
            onSubmit={handleUpdateSupplier}
            onClose={() => setShowAddForm(false)}
          />
        )}

        {editingSupplier && (
          <SupplierForm
            onSubmit={handleUpdateSupplier}
            onClose={() => setEditingSupplier(null)}
            initialData={editingSupplier}
          />
        )}
      </div>
    </div>
  );
}