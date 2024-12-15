import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, PoundSterling, UserPlus, Settings } from 'lucide-react';
import StatCard from '../components/StatCard';
import BookingsList from '../components/BookingsList';
import DashboardCustomizer from '../components/dashboard/DashboardCustomizer';
import RevenueChart from '../components/dashboard/RevenueChart';
import { useDashboardStore, useDocumentsStore } from '../store';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showCustomizer, setShowCustomizer] = useState(false);
  const { getEnabledWidgets, stats, calculateStats } = useDashboardStore();
  const { documents } = useDocumentsStore();
  const enabledWidgets = getEnabledWidgets();

  // Calculate stats when dashboard mounts and when dependencies change
  useEffect(() => {
    calculateStats();
  }, [documents]); // Recalculate when documents change

  const handleStatClick = (path: string) => {
    navigate(path);
  };

  const renderWidget = (widget: { id: string; type: string }) => {
    switch (widget.type) {
      case 'stats':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => handleStatClick('/leads')} className="cursor-pointer">
              <StatCard
                title="Pending Leads"
                value={stats.pendingLeads.toString()}
                icon={UserPlus}
                trend={`${stats.pendingLeads} new this week`}
                trendUp={stats.pendingLeads > 0}
              />
            </div>
            <div onClick={() => handleStatClick('/bookings')} className="cursor-pointer">
              <StatCard
                title="Upcoming Bookings"
                value={stats.upcomingBookings.toString()}
                icon={Calendar}
                trend="Next 7 days"
              />
            </div>
            <StatCard
              title="Monthly Revenue"
              value={`£${stats.monthlyRevenue.toLocaleString()}`}
              icon={PoundSterling}
              trend={`${stats.revenueChange}% vs last month`}
              trendUp={stats.revenueChange > 0}
            />
          </div>
        );
      
      case 'revenue':
        return <RevenueChart documents={documents} />;
      
      case 'bookings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
            <BookingsList />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button
          onClick={() => setShowCustomizer(true)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          <Settings className="w-4 h-4" />
          <span>Customize</span>
        </button>
      </div>

      <div className="space-y-6">
        {enabledWidgets.map(widget => (
          <div key={widget.id}>
            {renderWidget(widget)}
          </div>
        ))}
      </div>

      {showCustomizer && (
        <DashboardCustomizer onClose={() => setShowCustomizer(false)} />
      )}
    </div>
  );
};

export default Dashboard;