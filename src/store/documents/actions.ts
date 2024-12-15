import { StateCreator } from 'zustand';
import { DocumentsState, Document } from './types';
import { generatePDFFromHTML } from '../../utils/pdf';
import { sendEmail } from '../../utils/email';
import { env } from '../../config/environment';

export const createDocumentActions = (
  set: StateCreator<DocumentsState>['setState'],
  get: () => DocumentsState
) => ({
  addDocument: async (doc) => {
    const id = `${doc.type === 'estimate' ? 'EST' : 'INV'}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const timestamp = new Date().toISOString();
    
    const newDoc: Document = {
      ...doc,
      id,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    set(state => ({
      documents: [...state.documents, newDoc]
    }));
    
    return id;
  },
  
  updateDocument: (id, updates) => {
    set(state => ({
      documents: state.documents.map(doc => 
        doc.id === id 
          ? { 
              ...doc, 
              ...updates, 
              updatedAt: new Date().toISOString(),
              // Set timestamps for specific status changes
              ...(updates.status === 'paid' ? { paidAt: new Date().toISOString() } : {}),
              ...(updates.status === 'sent' ? { sentAt: new Date().toISOString() } : {})
            }
          : doc
      )
    }));
  },

  getDocument: (id) => {
    return get().documents.find(doc => doc.id === id);
  },
  
  sendDocument: async (id, isReminder = false) => {
    const doc = get().documents.find(d => d.id === id);
    if (!doc) return false;

    try {
      // Wait for the document to render
      await new Promise(resolve => setTimeout(resolve, 1000));

      const pdfBlob = await generatePDFFromHTML('printable-document');
      
      const subject = isReminder
        ? `Payment Reminder: ${doc.type === 'invoice' ? 'Invoice' : 'Estimate'} ${doc.id}`
        : `Your ${doc.type === 'invoice' ? 'Invoice' : 'Estimate'} from ${env.COMPANY_NAME}`;

      const textBody = isReminder
        ? `This is a reminder that payment for ${doc.type} ${doc.id} is due. Please find the ${doc.type} attached.`
        : `Please find your ${doc.type} attached.`;

      const htmlBody = isReminder
        ? `<h1>Payment Reminder</h1><p>This is a reminder that payment for ${doc.type} ${doc.id} is due. Please find the ${doc.type} attached.</p>`
        : `<h1>Your ${doc.type}</h1><p>Please find your ${doc.type} attached.</p>`;

      const success = await sendEmail(
        doc.customer.email,
        subject,
        textBody,
        htmlBody,
        [{
          filename: `${doc.type}_${id}.pdf`,
          content: pdfBlob,
          contentType: 'application/pdf'
        }]
      );
      
      if (success && !isReminder) {
        get().updateDocument(id, { 
          status: doc.type === 'estimate' ? 'sent' : 'pending',
          sentAt: new Date().toISOString()
        });
      }
      
      return success;
    } catch (error) {
      console.error('Error sending document:', error);
      return false;
    }
  },

  convertEstimateToInvoice: async (estimateId) => {
    const estimate = get().documents.find(d => d.id === estimateId);
    if (!estimate || estimate.type !== 'estimate') {
      throw new Error('Invalid estimate ID');
    }

    const { id, type, status, ...rest } = estimate;
    const invoiceId = await get().addDocument({
      ...rest,
      type: 'invoice',
      status: 'pending'
    });

    return invoiceId;
  }
});