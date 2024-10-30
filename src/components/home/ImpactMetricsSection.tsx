import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Droplets } from 'lucide-react';

const chartData = [
  { month: 'Jan', emissions: 2400, reduction: 1400 },
  { month: 'Feb', emissions: 1398, reduction: 2210 },
  { month: 'Mar', emissions: 9800, reduction: 2290 },
  { month: 'Apr', emissions: 3908, reduction: 2000 },
  { month: 'May', emissions: 4800, reduction: 2181 },
  { month: 'Jun', emissions: 3800, reduction: 2500 },
];

export default function ImpactMetricsSection() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Real Impact, Real Results
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Track your environmental impact with precision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold">Carbon Emissions Reduction</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="reduction" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ fill: '#22c55e' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <Droplets className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold">Water Usage Optimization</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="emissions" 
                    fill="#0ea5e9"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}