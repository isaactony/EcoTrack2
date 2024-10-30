import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  name: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'increase' | 'decrease';
  description: string;
}

export default function MetricsCard({
  name,
  value,
  icon: Icon,
  change,
  changeType,
  description,
}: MetricsCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow-lg rounded-xl transition-all hover:shadow-xl hover:scale-105">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-lg ${
              changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Icon
                className={`h-6 w-6 ${
                  changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {name}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    changeType === 'increase'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {change}
                </div>
              </dd>
              <dd className="mt-1 text-sm text-gray-500">{description}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}