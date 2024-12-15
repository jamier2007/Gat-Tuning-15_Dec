import React from 'react';
import { format } from 'date-fns';
import { Customer, ServicePrice } from '../../types';
import { env } from '../../config/environment';
import Logo from '../Logo';

interface PrintableInvoiceProps {
  customer: Customer;
  services: ServicePrice[];
  total: number;
  notes?: string;
  invoiceNumber: string;
}

const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({
  customer,
  services,
  total,
  notes,
  invoiceNumber
}) => {
  return (
    <div id="printable-document" className="max-w-4xl mx-auto bg-white p-8 print:p-4">
      <div className="flex justify-between items-start mb-8">
        <div>
          <Logo size="lg" />
          <div className="mt-4">
            <p className="text-gray-600">{env.COMPANY_ADDRESS}</p>
            <p className="text-gray-600">Tel: {env.COMPANY_PHONE}</p>
            <p className="text-gray-600">Email: {env.COMPANY_EMAIL}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold mb-2">INVOICE</h2>
          <p className="text-gray-600">Invoice #: {invoiceNumber}</p>
          <p className="text-gray-600">Date: {format(new Date(), 'dd/MM/yyyy')}</p>
          <p className="text-gray-600">Due Date: {format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy')}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Bill To</h3>
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

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
        <div className="border rounded-lg p-4">
          <p className="font-medium">Bank Transfer</p>
          <p className="text-gray-600">Account Name: {env.COMPANY_NAME}</p>
          <p className="text-gray-600">Sort Code: 12-34-56</p>
          <p className="text-gray-600">Account Number: 12345678</p>
          <p className="text-gray-600">Reference: {invoiceNumber}</p>
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-8">
        <p>Terms and Conditions:</p>
        <ul className="list-disc ml-4 mt-2">
          <li>Payment is due within 14 days of invoice date</li>
          <li>Late payments may incur additional charges</li>
          <li>All prices include VAT where applicable</li>
          <li>Please include invoice number as payment reference</li>
        </ul>
      </div>
    </div>
  );
};

export default PrintableInvoice;