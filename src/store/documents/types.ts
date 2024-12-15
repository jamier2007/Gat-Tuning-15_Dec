import { Customer, ServicePrice } from '../../types';

export type DocumentType = 'invoice' | 'estimate';
export type DocumentStatus = 'draft' | 'pending' | 'paid' | 'sent' | 'cancelled';

export interface Document {
  id: string;
  type: DocumentType;
  customer: Customer;
  services: ServicePrice[];
  total: number;
  notes?: string;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  sentAt?: string;
}

export interface DocumentsState {
  documents: Document[];
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  getDocument: (id: string) => Document | undefined;
  sendDocument: (id: string, isReminder?: boolean) => Promise<boolean>;
  convertEstimateToInvoice: (estimateId: string) => Promise<string>;
}