import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Recycle, TreePine, Users } from 'lucide-react';

const stats = [
  { label: 'Active Suppliers', value: '500+', icon: Factory },
  { label: 'Carbon Reduced', value: '2M tons', icon: Recycle },
  { label: 'Water Saved', value: '500M gal', icon: TreePine },
  { label: 'Happy Clients', value: '99.9%', icon: Users },
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center hero-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 to-teal-50/90" />
      <div className="absolute inset-0 bg-white/40" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-green-100/20 to-transparent transform -skew-x-12" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-teal-100/20 to-transparent transform skew-x-12" />
      
      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Transform Your{' '}
            <span className="bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent animate-gradient">
              Supply Chain
            </span>{' '}
            Impact
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            Join the future of sustainable manufacturing with real-time monitoring, AI-powered insights, and comprehensive environmental tracking.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/dashboard"
              className="group inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Try Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-green-600 bg-white border-2 border-green-600 rounded-lg hover:bg-green-50 transition-all duration-200"
            >
              Contact Sales
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <stat.icon className="h-8 w-8 mx-auto text-green-600 mb-3" />
              <dt className="text-base font-medium text-gray-600">{stat.label}</dt>
              <dd className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}