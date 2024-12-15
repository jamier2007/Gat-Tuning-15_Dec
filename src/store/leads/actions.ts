import { StateCreator } from 'zustand';
import { LeadsState } from './types';
import { useNotificationsStore } from '../notifications';

export const createLeadActions = (
  set: StateCreator<LeadsState>['setState']
) => ({
  addLead: (lead) => {
    const newLead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      leads: [...state.leads, newLead]
    }));

    // Create notification for new lead
    if (lead.followUpDate) {
      useNotificationsStore.getState().addNotification({
        type: 'lead',
        title: 'New Lead Requires Follow-up',
        message: `Remember to contact ${newLead.customerName} about ${newLead.notes || 'their inquiry'}`,
        followUpDate: lead.followUpDate
      });
    }
  },

  updateLead: (id, updates) => {
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, ...updates } : lead
      )
    }));
  },

  deleteLead: (id) => {
    set((state) => ({
      leads: state.leads.filter((lead) => lead.id !== id)
    }));
  }
});