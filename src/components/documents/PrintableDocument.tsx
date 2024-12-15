import React from 'react';
import { format } from 'date-fns';
import { Customer, ServicePrice } from '../../types';
import Logo from '../Logo';

interface PrintableDocumentProps {
  type: 'estimate' | 'invoice';
  customer: Customer;
  services: ServicePrice[];
  total: number;
  notes?: string;
  documentNumber?: string;
}

const PrintableDocument: React.FC<PrintableDocumentProps> = ({
  type,
  customer,
  services,
  total,
  notes,
  documentNumber
}) => {
  const isInvoice = type === 'invoice';

  return (
    <div id="printable-document" className="max-w-4xl mx-auto bg-white p-8 print:p-4">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="w-48 mb-4">
            <Logo size="lg" variant="dark" />
          </div>
          <div className="text-sm">
            <p className="text-gray-600">Woodlands Garage</p>
            <p className="text-gray-600">Chapel Road</p>
            <p className="text-gray-600">Smallfield</p>
            <p className="text-gray-600">RH6 9NN</p>
            <p className="text-gray-600">Tel: 01342 621241</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold mb-2">{type.toUpperCase()}</h2>
          {isInvoice ? (
            <>
              <p className="text-gray-600">Invoice #: {documentNumber}</p>
              <p className="text-gray-600">Date: {format(new Date(), 'dd/MM/yyyy')}</p>
              <p className="text-gray-600">Due Date: {format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy')}</p>
            </>
          ) : (
            <>
              <p className="text-gray-600">Estimate #: {documentNumber}</p>
              <p className="text-gray-600">Date: {format(new Date(), 'dd/MM/yyyy')}</p>
              <p className="text-gray-600">Valid for: 30 days</p>
            </>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
        <div className="border rounded-lg p-4">
          <p className="font-medium">{customer.name}</p>
          <p className="text-gray-600">{customer.email}</p>
          <p className="text-gray-600">{customer.phone}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Vehicle Details</h3>
        <div className="border rounded-lg p-4">
          <p className="font-medium">{customer.vehicle.registration}</p>
          <p className="text-gray-600">
            {customer.vehicle.make} {customer.vehicle.model} ({customer.vehicle.year})
          </p>
          <p className="text-gray-600">Engine: {customer.vehicle.engineSize}</p>
          <p className="text-gray-600">ECU: {customer.vehicle.ecuType}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Services</h3>
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="text-left py-2">Service</th>
              <th className="text-right py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b">
                <td className="py-2">{service.name}</td>
                <td className="text-right py-2">£{service.price}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="py-4">Total</td>
              <td className="text-right py-4">£{total}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {notes && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
          <div className="border rounded-lg p-4">
            <p className="text-gray-600 whitespace-pre-wrap">{notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintableDocument;