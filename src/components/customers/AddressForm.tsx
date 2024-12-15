import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, ChevronDown } from 'lucide-react';
import { Address } from '../../types';
import { lookupPostcode, validatePostcode, PostcodeAddress } from '../../utils/postcode';

interface AddressFormProps {
  value: Address;
  onChange: (address: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ value, onChange }) => {
  const [postcode, setPostcode] = useState(value.postcode || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<PostcodeAddress[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.postcode !== postcode) {
      setPostcode(value.postcode || '');
    }
  }, [value.postcode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePostcodeLookup = async () => {
    const cleanPostcode = postcode.trim().toUpperCase();
    if (!validatePostcode(cleanPostcode)) {
      setError('Please enter a valid UK postcode');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAddresses([]);

    try {
      const result = await lookupPostcode(cleanPostcode);
      setAddresses(result.addresses);
      setIsDropdownOpen(true);
    } catch (error) {
      setError('Failed to find address. Please enter manually.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAddress = (address: PostcodeAddress) => {
    onChange({
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      county: address.county,
      postcode: address.postcode
    });
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative" ref={dropdownRef}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Postcode
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={postcode}
            onChange={(e) => {
              const newValue = e.target.value.toUpperCase();
              setPostcode(newValue);
              onChange({ ...value, postcode: newValue });
            }}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter postcode"
          />
          <button
            type="button"
            onClick={handlePostcodeLookup}
            disabled={isLoading || !postcode.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>Find Address</span>
          </button>
        </div>

        {/* Address Dropdown */}
        {isDropdownOpen && addresses.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            <div className="p-2 border-b bg-gray-50">
              <p className="text-sm font-medium text-gray-700">
                Select an address
              </p>
            </div>
            <ul className="max-h-60 overflow-auto">
              {addresses.map((address) => (
                <li
                  key={address.udprn}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                  onClick={() => handleSelectAddress(address)}
                >
                  <p className="font-medium">{address.line1}</p>
                  {address.line2 && <p className="text-gray-600">{address.line2}</p>}
                  <p className="text-gray-600">
                    {address.city}, {address.postcode}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 1
        </label>
        <input
          type="text"
          value={value.line1 || ''}
          onChange={(e) => onChange({ ...value, line1: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          value={value.line2 || ''}
          onChange={(e) => onChange({ ...value, line2: e.target.value || undefined })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={value.city || ''}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            County (Optional)
          </label>
          <input
            type="text"
            value={value.county || ''}
            onChange={(e) => onChange({ ...value, county: e.target.value || undefined })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;