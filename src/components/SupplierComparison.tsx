import { X, TrendingUp, TrendingDown, Minus, Download } from 'lucide-react';
import type { Supplier } from '../types';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface SupplierComparisonProps {
  suppliers: Supplier[];
  onClose: () => void;
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b'];

export default function SupplierComparison({ suppliers, onClose }: SupplierComparisonProps) {
  const getScoreIndicator = (value: number, baseValue: number) => {
    const diff = value - baseValue;
    if (Math.abs(diff) < 0.1) return <Minus className="h-4 w-4 text-gray-500" />;
    if (diff > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getPercentageDiff = (value: number, baseValue: number) => {
    const diff = ((value - baseValue) / baseValue) * 100;
    if (Math.abs(diff) < 0.1) return '0%';
    return `${diff > 0 ? '+' : ''}${diff.toFixed(1)}%`;
  };

  const radarData = [
    { metric: 'Sustainability', fullMark: 100, ...suppliers.reduce((acc, s, i) => ({ ...acc, [`supplier${i + 1}`]: s.sustainabilityScore }), {}) },
    { metric: 'Energy Efficiency', fullMark: 100, ...suppliers.reduce((acc, s, i) => ({ ...acc, [`supplier${i + 1}`]: s.metrics.energyEfficiency }), {}) },
    { metric: 'Water Usage', fullMark: 100, ...suppliers.reduce((acc, s, i) => ({ ...acc, [`supplier${i + 1}`]: 100 - (s.metrics.waterUsage / 2000) * 100 }), {}) },
    { metric: 'Carbon Footprint', fullMark: 100, ...suppliers.reduce((acc, s, i) => ({ ...acc, [`supplier${i + 1}`]: 100 - (s.metrics.carbonFootprint / 400) * 100 }), {}) },
    { metric: 'Renewable Energy', fullMark: 100, ...suppliers.reduce((acc, s, i) => ({ ...acc, [`supplier${i + 1}`]: s.metrics.renewableEnergy }), {}) },
  ];

  const downloadComparison = () => {
    const comparisonData = {
      date: new Date().toISOString(),
      suppliers: suppliers.map(s => ({
        name: s.name,
        metrics: {
          sustainabilityScore: s.sustainabilityScore,
          ...s.metrics,
        },
      })),
    };

    const blob = new Blob([JSON.stringify(comparisonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supplier-comparison.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Supplier Comparison</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={downloadComparison}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Metrics Comparison */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Key Metrics Comparison</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1"></div>
                  {suppliers.map((supplier, index) => (
                    <div
                      key={supplier.id}
                      className="text-sm font-medium"
                      style={{ color: COLORS[index] }}
                    >
                      {supplier.name}
                    </div>
                  ))}
                </div>

                {[
                  { label: 'Sustainability Score', key: 'sustainabilityScore' },
                  { label: 'Carbon Footprint', key: 'carbonFootprint', unit: 'tons' },
                  { label: 'Energy Efficiency', key: 'energyEfficiency', unit: '%' },
                  { label: 'Water Usage', key: 'waterUsage', unit: 'gal' },
                  { label: 'Renewable Energy', key: 'renewableEnergy', unit: '%' },
                ].map((metric) => (
                  <div key={metric.key} className="grid grid-cols-4 gap-4 py-2 border-t border-gray-200">
                    <div className="text-sm text-gray-600">{metric.label}</div>
                    {suppliers.map((supplier, index) => (
                      <div
                        key={`${supplier.id}-${metric.key}`}
                        className="flex items-center space-x-2"
                      >
                        <span className="font-medium" style={{ color: COLORS[index] }}>
                          {metric.key === 'sustainabilityScore'
                            ? supplier[metric.key]
                            : supplier.metrics[metric.key as keyof typeof supplier.metrics]}
                          {metric.unit}
                        </span>
                        {index > 0 && (
                          <div className="flex items-center">
                            {getScoreIndicator(
                              metric.key === 'sustainabilityScore'
                                ? supplier[metric.key]
                                : supplier.metrics[metric.key as keyof typeof supplier.metrics],
                              metric.key === 'sustainabilityScore'
                                ? suppliers[0][metric.key]
                                : suppliers[0].metrics[metric.key as keyof typeof supplier.metrics]
                            )}
                            <span className="text-xs ml-1">
                              {getPercentageDiff(
                                metric.key === 'sustainabilityScore'
                                  ? supplier[metric.key]
                                  : supplier.metrics[metric.key as keyof typeof supplier.metrics],
                                metric.key === 'sustainabilityScore'
                                  ? suppliers[0][metric.key]
                                  : suppliers[0].metrics[metric.key as keyof typeof supplier.metrics]
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    {suppliers.map((_, index) => (
                      <Radar
                        key={`supplier${index + 1}`}
                        name={suppliers[index].name}
                        dataKey={`supplier${index + 1}`}
                        stroke={COLORS[index]}
                        fill={COLORS[index]}
                        fillOpacity={0.3}
                      />
                    ))}
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}