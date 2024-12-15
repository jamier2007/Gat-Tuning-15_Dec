import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

const StatCard = ({ title, value, icon: Icon, trend, trendUp }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-102 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold">{value}</p>
        {trend && (
          <p className={`text-sm ${trendUp ? 'text-green-500' : 'text-gray-500'}`}>
            {trend}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;