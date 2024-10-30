import { useState } from 'react';
import { 
  MessageSquare, 
  Newspaper, 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  ArrowLeftRight,
  Download,
  TrendingUp,
  Droplets,
  Zap,
  Trash2,
  FileText,
  BarChart3,
  AlertTriangle,
  MapPin,
  Plus,
  Check,
  X
} from 'lucide-react';
import type { Supplier, Certification } from '../types';
import SupplierComparison from './SupplierComparison';
import SupplierForm from './SupplierForm';

interface SupplierListProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  selectedId?: string;
}

type RiskLevel = 'Low' | 'Medium' | 'High';
interface RiskAssessment {
  compliance: RiskLevel;
  environmental: RiskLevel;
  supplyChain: RiskLevel;
}

export default function SupplierList({ suppliers, onEdit, selectedId }: SupplierListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showNewCertForm, setShowNewCertForm] = useState<string | null>(null);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [newCertData, setNewCertData] = useState({
    name: '',
    issuer: '',
    expiryDate: ''
  });
  const [riskLevels, setRiskLevels] = useState<{ [key: string]: RiskAssessment }>({});

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleComparison = (id: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(id)) {
        return prev.filter(supplierId => supplierId !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
  };

  const handleUpdateSupplier = (updatedSupplier: Supplier) => {
    onEdit({
      ...updatedSupplier,
      id: editingSupplier!.id,
      certifications: editingSupplier!.certifications
    });
    setEditingSupplier(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-lime-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBgColor = (level: RiskLevel) => {
    switch (level) {
      case 'Low': return 'bg-green-100';
      case 'Medium': return 'bg-yellow-100';
      case 'High': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  const toggleCertificationStatus = (supplierId: string, certId: string) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) return;

    const updatedSupplier = {
      ...supplier,
      certifications: supplier.certifications.map(cert => {
        if (cert.id === certId) {
          return {
            ...cert,
            status: cert.status === 'active' ? 'expired' : 'active'
          };
        }
        return cert;
      })
    };
    onEdit(updatedSupplier);
  };

  const addNewCertification = (supplierId: string) => {
    if (!newCertData.name || !newCertData.issuer || !newCertData.expiryDate) return;

    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) return;

    const updatedSupplier = {
      ...supplier,
      certifications: [
        ...supplier.certifications,
        {
          id: Date.now().toString(),
          name: newCertData.name,
          issuer: newCertData.issuer,
          expiryDate: newCertData.expiryDate,
          status: 'active'
        }
      ]
    };

    onEdit(updatedSupplier);
    setShowNewCertForm(null);
    setNewCertData({ name: '', issuer: '', expiryDate: '' });
  };

  const cycleRiskLevel = (supplierId: string, riskType: keyof RiskAssessment) => {
    const levels: RiskLevel[] = ['Low', 'Medium', 'High'];
    const currentLevel = (riskLevels[supplierId]?.[riskType] || 'Low') as RiskLevel;
    const currentIndex = levels.indexOf(currentLevel);
    const nextLevel = levels[(currentIndex + 1) % levels.length];

    setRiskLevels(prev => ({
      ...prev,
      [supplierId]: {
        ...prev[supplierId],
        [riskType]: nextLevel
      }
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Supplier List</h2>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              id={`supplier-${supplier.id}`}
              className={`${
                selectedId === supplier.id ? 'bg-green-50' : ''
              } transition-colors`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedForComparison.includes(supplier.id)}
                      onChange={() => toggleComparison(supplier.id)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {supplier.name}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {supplier.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Sustainability Score</div>
                      <div className={`text-lg font-bold ${getScoreColor(supplier.sustainabilityScore)}`}>
                        {supplier.sustainabilityScore}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(supplier)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => toggleExpand(supplier.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        {expandedId === supplier.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {expandedId === supplier.id && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <BarChart3 className="h-5 w-5" />
                        <h4 className="font-medium">Environmental Metrics</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Carbon Footprint</span>
                          <span className="font-medium">{supplier.metrics.carbonFootprint} tons</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Water Usage</span>
                          <span className="font-medium">{supplier.metrics.waterUsage} gal</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Energy Efficiency</span>
                          <span className="font-medium">{supplier.metrics.energyEfficiency}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5" />
                          <h4 className="font-medium">Certifications</h4>
                        </div>
                        <button
                          onClick={() => setShowNewCertForm(supplier.id)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {showNewCertForm === supplier.id && (
                        <div className="mb-4 p-4 bg-white rounded-lg shadow-sm space-y-3">
                          <input
                            type="text"
                            placeholder="Certification Name"
                            className="w-full p-2 border rounded"
                            value={newCertData.name}
                            onChange={(e) => setNewCertData(prev => ({ ...prev, name: e.target.value }))}
                          />
                          <input
                            type="text"
                            placeholder="Issuer"
                            className="w-full p-2 border rounded"
                            value={newCertData.issuer}
                            onChange={(e) => setNewCertData(prev => ({ ...prev, issuer: e.target.value }))}
                          />
                          <input
                            type="date"
                            className="w-full p-2 border rounded"
                            value={newCertData.expiryDate}
                            onChange={(e) => setNewCertData(prev => ({ ...prev, expiryDate: e.target.value }))}
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setShowNewCertForm(null)}
                              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => addNewCertification(supplier.id)}
                              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        {supplier.certifications.map((cert) => (
                          <div
                            key={cert.id}
                            className="flex items-center justify-between bg-white p-2 rounded shadow-sm"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-sm">{cert.name}</div>
                              <div className="text-xs text-gray-500">
                                {cert.issuer} · Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                              </div>
                            </div>
                            <button
                              onClick={() => toggleCertificationStatus(supplier.id, cert.id)}
                              className={`ml-2 p-1 rounded-full ${
                                cert.status === 'active'
                                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                  : 'bg-red-100 text-red-600 hover:bg-red-200'
                              }`}
                            >
                              {cert.status === 'active' ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-gray-600 mb-4">
                        <AlertTriangle className="h-5 w-5" />
                        <h4 className="font-medium">Risk Assessment</h4>
                      </div>
                      <div className="space-y-3">
                        {[
                          { key: 'compliance' as const, label: 'Compliance Risk' },
                          { key: 'environmental' as const, label: 'Environmental Risk' },
                          { key: 'supplyChain' as const, label: 'Supply Chain Risk' }
                        ].map((risk) => (
                          <div key={risk.key} className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">{risk.label}</span>
                            <button
                              onClick={() => cycleRiskLevel(supplier.id, risk.key)}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                getRiskBgColor(riskLevels[supplier.id]?.[risk.key] || 'Low')
                              } ${getRiskColor(riskLevels[supplier.id]?.[risk.key] || 'Low')}`}
                            >
                              {riskLevels[supplier.id]?.[risk.key] || 'Low'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedForComparison.length >= 2 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setShowComparison(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg flex items-center space-x-2"
          >
            <ArrowLeftRight className="h-5 w-5" />
            <span>Compare {selectedForComparison.length} Suppliers</span>
          </button>
        </div>
      )}

      {showComparison && (
        <SupplierComparison
          suppliers={suppliers.filter(s => selectedForComparison.includes(s.id))}
          onClose={() => {
            setShowComparison(false);
            setSelectedForComparison([]);
          }}
        />
      )}

      {editingSupplier && (
        <SupplierForm
          initialData={editingSupplier}
          onSubmit={handleUpdateSupplier}
          onClose={() => setEditingSupplier(null)}
        />
      )}
    </div>
  );
}