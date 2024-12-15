import { useCustomersStore, useDocumentsStore } from '../store';
import { TuningRecord } from '../types';

export const syncTuningHistory = () => {
  const { documents } = useDocumentsStore.getState();
  const { customers, updateCustomer } = useCustomersStore.getState();

  // Get all paid invoices
  const paidInvoices = documents.filter(
    doc => doc.type === 'invoice' && doc.status === 'paid'
  );

  // Process each customer
  customers.forEach(customer => {
    // Keep existing manual records (those without invoice references)
    const manualRecords = customer.tuningHistory.filter(
      record => !record.notes?.includes('Invoice')
    );

    // Create tuning records from invoices
    const invoiceRecords: TuningRecord[] = [];
    paidInvoices
      .filter(invoice => invoice.customer.id === customer.id)
      .forEach(invoice => {
        invoice.services.forEach(service => {
          invoiceRecords.push({
            id: `${invoice.id}-${service.id}`,
            date: invoice.createdAt,
            type: service.name.replace(' ', '_') as any,
            notes: `Invoice ${invoice.id} - ${service.name}`
          });
        });
      });

    // Update customer with combined records
    updateCustomer(customer.id, {
      tuningHistory: [...manualRecords, ...invoiceRecords].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    });
  });
};