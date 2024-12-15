import React, { useState } from 'react';
import { Send, Edit, CreditCard, ArrowRight } from 'lucide-react';
import { Document } from '../../types';
import { useDocumentsStore } from '../../store/documents';

interface DocumentActionsProps {
  document: Document;
  onEdit: () => void;
}

const DocumentActions: React.FC<DocumentActionsProps> = ({ document, onEdit }) => {
  const { sendDocument, updateDocument } = useDocumentsStore();
  const [isSending, setIsSending] = useState(false);

  const handleResend = async () => {
    setIsSending(true);
    try {
      await sendDocument(document.id);
    } catch (error) {
      console.error('Error resending document:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handlePaymentChase = async () => {
    setIsSending(true);
    try {
      await sendDocument(document.id, true); // Second parameter indicates payment reminder
    } catch (error) {
      console.error('Error sending payment reminder:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleConvertToInvoice = async () => {
    if (document.type !== 'estimate') return;
    
    try {
      const { id, ...rest } = document;
      const invoiceId = await useDocumentsStore.getState().addDocument({
        ...rest,
        type: 'invoice',
        status: 'pending'
      });
      await sendDocument(invoiceId);
    } catch (error) {
      console.error('Error converting to invoice:', error);
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={onEdit}
        className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100"
        title="Edit"
      >
        <Edit className="w-4 h-4" />
      </button>
      
      <button
        onClick={handleResend}
        disabled={isSending}
        className="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50"
        title="Resend"
      >
        <Send className="w-4 h-4" />
      </button>

      {document.type === 'invoice' && document.status === 'pending' && (
        <button
          onClick={handlePaymentChase}
          disabled={isSending}
          className="p-2 text-orange-600 hover:text-orange-800 rounded-lg hover:bg-orange-50"
          title="Send Payment Reminder"
        >
          <CreditCard className="w-4 h-4" />
        </button>
      )}

      {document.type === 'estimate' && document.status === 'sent' && (
        <button
          onClick={handleConvertToInvoice}
          className="p-2 text-green-600 hover:text-green-800 rounded-lg hover:bg-green-50"
          title="Convert to Invoice"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default DocumentActions;