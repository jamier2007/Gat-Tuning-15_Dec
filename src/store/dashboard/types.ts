import { DashboardWidget } from './widgets';

export interface DashboardStats {
  pendingLeads: number;
  upcomingBookings: number;
  monthlyRevenue: number;
  revenueChange: number;
}

export interface DashboardState {
  widgets: DashboardWidget[];
  stats: DashboardStats;
  updateWidgetOrder: (widgets: DashboardWidget[]) => void;
  toggleWidget: (widgetId: string) => void;
  getEnabledWidgets: () => DashboardWidget[];
  calculateStats: () => void;
}

export const defaultWidgets: DashboardWidget[] = [
  { id: 'stats', type: 'stats', title: 'Key Statistics', enabled: true, order: 0 },
  { id: 'revenue', type: 'revenue', title: 'Revenue Overview', enabled: true, order: 1 },
  { id: 'bookings', type: 'bookings', title: 'Upcoming Bookings', enabled: true, order: 2 }
];