import { Customer } from '../types';

export const filterCustomers = (customers: Customer[], searchTerm: string): Customer[] => {
  const term = searchTerm.toLowerCase();
  return customers.filter((customer) =>
    customer.name.toLowerCase().includes(term) ||
    customer.email.toLowerCase().includes(term) ||
    customer.vehicle.registration.toLowerCase().includes(term)
  );
};