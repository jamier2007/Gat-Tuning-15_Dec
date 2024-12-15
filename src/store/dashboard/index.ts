import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DashboardState, defaultWidgets } from './types';
import { useLeadsStore, useBookingsStore, useDocumentsStore } from '..';
import { 
  startOfMonth, 
  endOfMonth, 
  isWithinInterval, 
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isAfter,
  isBefore,
  addMonths,
  addDays,
  parseISO
} from 'date-fns';

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      widgets: defaultWidgets,
      stats: {
        pendingLeads: 0,
        upcomingBookings: 0,
        monthlyRevenue: 0,
        revenueChange: 0
      },
      
      getEnabledWidgets: () => {
        return get().widgets
          .filter(widget => widget.enabled)
          .sort((a, b) => a.order - b.order);
      },

      toggleWidget: (widgetId) => {
        set(state => ({
          widgets: state.widgets.map(widget =>
            widget.id === widgetId
              ? { ...widget, enabled: !widget.enabled }
              : widget
          )
        }));
      },

      updateWidgetOrder: (widgets) => {
        set({ widgets });
      },

      calculateStats: () => {
        const { leads } = useLeadsStore.getState();
        const { bookings } = useBookingsStore.getState();
        const { documents } = useDocumentsStore.getState();

        // Calculate pending leads (only 'new' status)
        const pendingLeads = leads.filter(lead => lead.status === 'new').length;

        // Calculate upcoming bookings for next 7 days
        const now = new Date();
        const weekEnd = addDays(now, 7);
        const upcomingBookings = bookings.filter(booking => {
          const bookingDate = parseISO(booking.date);
          return (
            booking.status === 'scheduled' &&
            isAfter(bookingDate, now) &&
            isBefore(bookingDate, weekEnd)
          );
        }).length;

        // Calculate monthly revenue from paid invoices
        const currentMonth = startOfMonth(now);
        const monthEnd = endOfMonth(now);
        const monthlyRevenue = documents
          .filter(doc => 
            doc.type === 'invoice' && 
            doc.status === 'paid' &&
            isWithinInterval(parseISO(doc.createdAt), { start: currentMonth, end: monthEnd })
          )
          .reduce((sum, doc) => sum + doc.total, 0);

        // Calculate previous month's revenue
        const lastMonth = startOfMonth(addMonths(now, -1));
        const lastMonthEnd = endOfMonth(lastMonth);
        const lastMonthRevenue = documents
          .filter(doc => 
            doc.type === 'invoice' && 
            doc.status === 'paid' &&
            isWithinInterval(parseISO(doc.createdAt), { start: lastMonth, end: lastMonthEnd })
          )
          .reduce((sum, doc) => sum + doc.total, 0);

        // Calculate revenue change percentage
        const revenueChange = lastMonthRevenue === 0 
          ? 100 
          : Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100);

        set({ 
          stats: {
            pendingLeads,
            upcomingBookings,
            monthlyRevenue,
            revenueChange
          }
        });
      }
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({ widgets: state.widgets })
    }
  )
);