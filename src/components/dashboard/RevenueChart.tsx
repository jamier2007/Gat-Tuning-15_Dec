import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isWithinInterval } from 'date-fns';
import { Document } from '../../types';

interface RevenueChartProps {
  documents: Document[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ documents }) => {
  // Get the current week's data
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Calculate daily revenue
  const dailyRevenue = weekDays.map(day => {
    const dayInvoices = documents.filter(doc => 
      doc.type === 'invoice' && 
      isWithinInterval(new Date(doc.createdAt), {
        start: new Date(day.setHours(0, 0, 0, 0)),
        end: new Date(day.setHours(23, 59, 59, 999))
      })
    );

    const total = dayInvoices.reduce((sum, invoice) => sum + invoice.total, 0);

    return {
      name: format(day, 'EEE'),
      amount: total,
      displayAmount: total.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP'
      })
    };
  });

  // Calculate week's total
  const weekTotal = dailyRevenue.reduce((sum, day) => sum + day.amount, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Weekly Revenue</h2>
        <div className="text-sm text-gray-500">
          Total: {weekTotal.toLocaleString('en-GB', {
            style: 'currency',
            currency: 'GBP'
          })}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyRevenue}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `£${value}`}
            />
            <Tooltip 
              formatter={(value) => [`£${value}`, 'Revenue']}
              labelFormatter={(label) => `${label}`}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Bar 
              dataKey="amount" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;