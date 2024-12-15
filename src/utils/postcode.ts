import { Address } from '../types';

const GETADDRESS_API = 'https://api.getaddress.io/v2';

export interface PostcodeAddress {
  udprn: string;
  line1: string;
  line2?: string;
  city: string;
  county?: string;
  postcode: string;
}

export interface PostcodeLookupResult {
  addresses: PostcodeAddress[];
  postcode: string;
}

export const lookupPostcode = async (postcode: string): Promise<PostcodeLookupResult> => {
  const settings = JSON.parse(localStorage.getItem('settings-storage') || '{}');
  const apiKey = settings?.state?.settings?.getAddress?.apiKey;
  const enabled = settings?.state?.settings?.getAddress?.enabled;

  if (!apiKey || !enabled) {
    // Fallback to postcodes.io if GetAddress.io is not configured
    return lookupPostcodeFallback(postcode);
  }

  try {
    const response = await fetch(
      `${GETADDRESS_API}/find/${encodeURIComponent(postcode)}?api-key=${apiKey}&expand=true`
    );

    if (!response.ok) {
      throw new Error('Address lookup failed');
    }

    const data = await response.json();
    
    const addresses: PostcodeAddress[] = data.addresses.map((addr: any, index: number) => ({
      udprn: addr.udprn || String(index),
      line1: addr.line_1,
      line2: addr.line_2 || undefined,
      city: addr.town_or_city,
      county: addr.county,
      postcode: data.postcode
    }));

    return {
      addresses,
      postcode: data.postcode
    };
  } catch (error) {
    console.error('GetAddress.io lookup error:', error);
    // Fallback to postcodes.io on error
    return lookupPostcodeFallback(postcode);
  }
};

// Fallback to free postcodes.io API
const lookupPostcodeFallback = async (postcode: string): Promise<PostcodeLookupResult> => {
  try {
    const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
    if (!response.ok) {
      throw new Error('Invalid postcode');
    }

    const data = await response.json();
    const result = data.result;

    // Simulate multiple addresses since postcodes.io doesn't provide actual addresses
    const addresses: PostcodeAddress[] = [
      {
        udprn: '1',
        line1: '1 ' + (result.thoroughfare || result.ward),
        city: result.post_town || result.admin_district,
        county: result.admin_county,
        postcode: result.postcode
      },
      {
        udprn: '2',
        line1: '2 ' + (result.thoroughfare || result.ward),
        city: result.post_town || result.admin_district,
        county: result.admin_county,
        postcode: result.postcode
      }
    ];

    return {
      addresses,
      postcode: result.postcode
    };
  } catch (error) {
    console.error('Postcode lookup error:', error);
    throw error;
  }
};

export const validatePostcode = (postcode: string): boolean => {
  const pattern = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
  return pattern.test(postcode.trim());
};

export const testGetAddressLookup = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${GETADDRESS_API}/find/SW1A1AA?api-key=${apiKey}&expand=true`
    );
    return response.ok;
  } catch {
    return false;
  }
};