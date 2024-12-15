import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Document } from '../types';
import { generatePDFFromHTML } from '../utils/pdf';
import { sendEmail } from '../utils/email';
import { env } from '../config/environment';

interface DocumentsState {
  documents: Document[];
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  getDocument: (id: string) => Document | undefined;
  sendDocument: (id: string, isReminder?: boolean) => Promise<boolean>;
  convertEstimateToInvoice: (estimateId: string) => Promise<string>;
}

// Mock data for initial state
const mockDocuments: Document[] = [
  {
    id: 'INV-123ABC',
    type: 'invoice',
    customer: {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '07700 900123',
      vehicle: {
        make: 'BMW',
        model: '320d',
        year: 2019,
        ecuType: 'Bosch EDC17',
        registration: 'AB19 XYZ',
        engineSize: '2.0L'
      },
      tuningHistory: []
    },
    services: [
      { id: 'stage1', name: 'Stage 1 Tuning', price: 280 },
      { id: 'dpf', name: 'DPF Delete', price: 250 }
    ],
    total: 330,
    notes: 'Stage 1 remap with DPF delete service',
    status: 'paid',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const useDocumentsStore = create<DocumentsState>()(
  persist(
    (set, get) => ({
      documents: mockDocuments,
      
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
              ? { ...doc, ...updates, updatedAt: new Date().toISOString() }
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
            get().updateDocument(id, { status: doc.type === 'estimate' ? 'sent' : 'pending' });
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
    }),
    {
      name: 'documents-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return { ...persistedState, documents: mockDocuments };
        }
        return persistedState;
      }
    }
  )
);