import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Map, Bell, Activity } from 'lucide-react';

const features = [
  {
    title: 'Real-time Analytics Dashboard',
    description: 'Monitor your supply chain sustainability metrics in real-time with interactive charts and visualizations.',
    icon: BarChart2,
    color: 'from-green-500 to-green-600',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Data Points', value: '1M+' },
      { label: 'Update Rate', value: 'Real-time' },
      { label: 'Accuracy', value: '99.9%' }
    ]
  },
  {
    title: 'Global Supplier Mapping',
    description: 'Visualize your entire supply chain network with interactive maps and location-based insights.',
    icon: Map,
    color: 'from-blue-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Locations', value: '200+' },
      { label: 'Countries', value: '50+' },
      { label: 'Coverage', value: '95%' }
    ]
  },
  {
    title: 'Risk Assessment & Alerts',
    description: 'Stay ahead of potential sustainability risks with AI-powered alerts and predictive analytics.',
    icon: Bell,
    color: 'from-yellow-500 to-yellow-600',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Alerts', value: '24/7' },
      { label: 'Accuracy', value: '96%' },
      { label: 'Response', value: '<1min' }
    ]
  },
  {
    title: 'Performance Benchmarking',
    description: 'Compare your sustainability performance against industry standards and competitors.',
    icon: Activity,
    color: 'from-purple-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Metrics', value: '50+' },
      { label: 'Industries', value: '25+' },
      { label: 'Reports', value: 'Weekly' }
    ]
  }
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="bg-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Powerful Features for Modern Supply Chains
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to monitor, analyze, and improve your supply chain sustainability
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 lg:sticky lg:top-24">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-white rounded-xl p-6 transition-all duration-300 cursor-pointer feature-card-shadow ${
                  activeFeature === index
                    ? 'ring-2 ring-green-500 scale-[1.02]'
                    : 'hover:ring-1 hover:ring-green-200'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {feature.description}
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-4">
                      {feature.metrics.map((metric) => (
                        <div key={metric.label} className="bg-gray-50 p-2 rounded-lg">
                          <div className="text-sm font-semibold text-gray-900">
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-500">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative lg:sticky lg:top-24">
            <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl -z-10" />
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`transition-all duration-500 transform ${
                  activeFeature === index
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8 absolute inset-0'
                }`}
                style={{ 
                  pointerEvents: activeFeature === index ? 'auto' : 'none',
                  zIndex: activeFeature === index ? 1 : 0
                }}
              >
                <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h4 className="text-2xl font-bold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-200 text-lg">
                      {feature.description}
                    </p>
                    <Link
                      to="/dashboard"
                      className="mt-6 inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                    >
                      Try it now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}