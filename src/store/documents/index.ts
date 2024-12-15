import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DocumentsState } from './types';
import { createDocumentActions } from './actions';
import { mockDocuments } from './mock-data';

export const useDocumentsStore = create<DocumentsState>()(
  persist(
    (set, get) => ({
      documents: mockDocuments,
      ...createDocumentActions(set, get)
    }),
    {
      name: 'documents-storage',
      version: 1,
      partialize: (state) => ({ documents: state.documents })
    }
  )
);