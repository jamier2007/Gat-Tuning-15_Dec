export interface ServicePrice {
  id: string;
  name: string;
  price: number;
}

export const SERVICES: ServicePrice[] = [
  { id: 'stage1', name: 'Stage 1 Tuning', price: 280 },
  { id: 'dpf', name: 'DPF Delete', price: 250 },
  { id: 'egr', name: 'EGR Delete', price: 250 },
  { id: 'adblue', name: 'AdBlue Removal', price: 350 },
];

export const calculateTotalPrice = (selectedServiceIds: string[]): number => {
  if (selectedServiceIds.length === 0) return 0;
  
  const selectedPrices = selectedServiceIds.map(
    id => SERVICES.find(s => s.id === id)?.price || 0
  );
  
  const maxPrice = Math.max(...selectedPrices);
  const additionalServices = selectedServiceIds.length - 1;
  
  return maxPrice + (additionalServices > 0 ? additionalServices * 50 : 0);
};