import { Shield } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter',
    price: '299',
    features: [
      'Up to 50 suppliers',
      'Basic analytics',
      'Email support',
      'Monthly reports',
    ],
  },
  {
    name: 'Professional',
    price: '599',
    features: [
      'Up to 200 suppliers',
      'Advanced analytics',
      'Priority support',
      'Weekly reports',
      'API access',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited suppliers',
      'Custom analytics',
      '24/7 support',
      'Real-time reporting',
      'API access',
      'Dedicated account manager',
    ],
  },
];

export default function PricingSection() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Transparent Pricing</h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that fits your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-green-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-medium">
                  Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-gray-600">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-500">/month</span>}
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 block w-full text-center px-6 py-3 rounded-lg font-medium ${
                    plan.popular
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-colors`}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}