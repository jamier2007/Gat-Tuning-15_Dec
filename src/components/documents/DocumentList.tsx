import React, { useState } from 'react';
import { Edit2, Send, CreditCard, ArrowRight } from 'lucide-react';
import { Document } from '../../types';
import { useDocumentsStore } from '../../store/documents';
import DocumentEditor from './DocumentEditor';
import PrintableDocument from './PrintableDocument';

interface DocumentListProps {
  type: 'estimate' | 'invoice';
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ type, documents }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const { updateDocument, sendDocument, convertEstimateToInvoice } = useDocumentsStore();
  const [isSending, setIsSending] = useState(false);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleUpdate = async (id: string, services: any[], notes: string) => {
    await updateDocument(id, { services, notes });
    setEditingId(null);
  };

  const handleResend = async (id: string) => {
    setIsSending(true);
    try {
      await sendDocument(id);
    } finally {
      setIsSending(false);
    }
  };

  const handlePaymentReminder = async (id: string) => {
    setIsSending(true);
    try {
      await sendDocument(id, true);
    } finally {
      setIsSending(false);
    }
  };

  const handleConvert = async (id: string) => {
    try {
      await convertEstimateToInvoice(id);
    } catch (error) {
      console.error('Error converting to invoice:', error);
    }
  };

  if (showPreview) {
    const doc = documents.find(d => d.id === showPreview);
    if (!doc) return null;

    return (
      <div>
        <div className="fixed top-4 right-4 space-x-4 print:hidden">
          <button
            onClick={() => setShowPreview(null)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
          >
            Back
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Print
          </button>
        </div>
        <PrintableDocument
          type={doc.type}
          customer={doc.customer}
          services={doc.services}
          total={doc.total}
          notes={doc.notes}
          documentNumber={doc.id}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div key={doc.id} className="bg-white rounded-lg shadow-md p-6">
          {editingId === doc.id ? (
            <DocumentEditor
              services={doc.services}
              notes={doc.notes || ''}
              onUpdate={(services, notes) => handleUpdate(doc.id, services, notes)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {doc.customer.name} - {doc.customer.vehicle.registration}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(doc.id)}
                    className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleResend(doc.id)}
                    disabled={isSending}
                    className="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                  {type === 'invoice' && doc.status === 'pending' && (
                    <button
                      onClick={() => handlePaymentReminder(doc.id)}
                      disabled={isSending}
                      className="p-2 text-orange-600 hover:text-orange-800 rounded-lg hover:bg-orange-50"
                    >
                      <CreditCard className="w-4 h-4" />
                    </button>
                  )}
                  {type === 'estimate' && doc.status === 'sent' && (
                    <button
                      onClick={() => handleConvert(doc.id)}
                      className="p-2 text-green-600 hover:text-green-800 rounded-lg hover:bg-green-50"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Services</h4>
                  <ul className="space-y-1">
                    {doc.services.map((service) => (
                      <li key={service.id} className="text-sm text-gray-600">
                        {service.name} - £{service.price}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Total</h4>
                  <p className="text-lg font-semibold">£{doc.total}</p>
                </div>
              </div>

              {doc.notes && (
                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{doc.notes}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setShowPreview(doc.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Preview
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentList;