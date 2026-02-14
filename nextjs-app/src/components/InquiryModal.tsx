'use client';

import { useState, useEffect } from 'react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Country {
  cntyId: string;
  cntyNm: string;
}

interface InquiryType {
  cd: string;
  cdNm: string;
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState<Country[]>([]);
  const [inquiryTypes, setInquiryTypes] = useState<InquiryType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedType, setSelectedType] = useState<InquiryType | null>(null);
  const [showCountryList, setShowCountryList] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    address: '',
    phone: '',
    email: '',
    message: '',
    password: '',
    agree: false,
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      fetch('/api/data/country-list')
        .then((r) => r.json())
        .then(setCountries);
    }
  }, [isOpen]);

  const loadInquiryTypes = () => {
    fetch('/api/data/inquiry-types')
      .then((r) => r.json())
      .then(setInquiryTypes);
  };

  const handleSubmit = () => {
    setStep(4); // Show success
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-end p-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
              <path d="M36.086 11.914 11.915 36.086M36.086 36.086 11.915 11.914" stroke="#20232D" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-8 pb-8">
          {/* Step 1: Select Region */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-2">Contact us</h2>
              <p className="text-lg text-gray-600 mb-6">Please select a region</p>

              <div className="mb-6">
                <label className="block text-base mb-2">Region</label>
                <div className="relative">
                  <button
                    onClick={() => setShowCountryList(!showCountryList)}
                    className="w-full border border-gray-300 rounded-full h-14 px-5 text-left flex items-center justify-between"
                  >
                    <span className={selectedCountry ? 'text-black' : 'text-gray-400'}>
                      {selectedCountry?.cntyNm || 'Region'}
                    </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6.707 8.293a1 1 0 0 0-1.414 1.414l1.414-1.414zM12 15l-.707.707a1 1 0 0 0 1.414 0L12 15zm6.707-5.293a1 1 0 0 0-1.414-1.414l1.414 1.414zm-13.414 0 6 6 1.414-1.414-6-6-1.414 1.414zm7.414 6 6-6-1.414-1.414-6 6 1.414 1.414z" fill="#191919" />
                    </svg>
                  </button>
                  {showCountryList && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1 z-10">
                      {countries.map((country) => (
                        <button
                          key={country.cntyId}
                          className="w-full text-left px-5 py-3 hover:bg-gray-50 text-base flex items-center justify-between"
                          onClick={() => {
                            setSelectedCountry(country);
                            setShowCountryList(false);
                          }}
                        >
                          {country.cntyNm}
                          {selectedCountry?.cntyId === country.cntyId && (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="m18.8 7-8.72 9.6L6 12.44" stroke="#BB1E4D" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedCountry) {
                    loadInquiryTypes();
                    setStep(2);
                  }
                }}
                disabled={!selectedCountry}
                className={`w-40 h-14 rounded-full text-white font-bold transition-colors ${
                  selectedCountry ? 'bg-[#BB1E4D] hover:bg-[#9a1840]' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </>
          )}

          {/* Step 2: Select Category */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-2">Contact us</h2>
              <p className="text-lg text-gray-600 mb-6">Select the classification of inquiries</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {inquiryTypes.map((type) => (
                  <button
                    key={type.cd}
                    className={`p-4 rounded-xl border-2 text-center font-bold transition-all ${
                      selectedType?.cd === type.cd
                        ? 'border-[#BB1E4D] bg-[#BB1E4D]/5 text-[#BB1E4D]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type.cdNm}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  if (selectedType) setStep(3);
                }}
                disabled={!selectedType}
                className={`w-40 h-14 rounded-full text-white font-bold transition-colors ${
                  selectedType ? 'bg-[#BB1E4D] hover:bg-[#9a1840]' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </>
          )}

          {/* Step 3: Enter Details */}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold mb-6">Enter your inquiry</h2>

              <div className="space-y-4 mb-6">
                {[
                  { key: 'name', label: 'Name', type: 'text', required: true },
                  { key: 'company', label: 'Company', type: 'text', required: true },
                  { key: 'address', label: 'Address', type: 'text', required: true },
                  { key: 'phone', label: 'Phone number', type: 'text', required: true },
                  { key: 'email', label: 'E-mail', type: 'email', required: true },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-base mb-2">
                      {field.label} {field.required && <span className="text-[#BB1E4D]">*</span>}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.label}
                      className="w-full border border-gray-300 rounded-full h-14 px-5 text-base outline-none focus:border-[#BB1E4D] transition-colors"
                      value={formData[field.key as keyof typeof formData] as string}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-base mb-2">
                    Message <span className="text-[#BB1E4D]">*</span>
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-2xl p-5 text-base outline-none focus:border-[#BB1E4D] transition-colors min-h-[120px]"
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <p className="text-sm text-gray-400 mt-1">Maximum 6,000 bytes are allowed</p>
                </div>

                <div>
                  <label className="block text-base mb-2">
                    Password <span className="text-[#BB1E4D]">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    maxLength={6}
                    className="w-full border border-gray-300 rounded-full h-14 px-5 text-base outline-none focus:border-[#BB1E4D] transition-colors"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <p className="text-sm text-gray-400 mt-1">Please enter a password between 4 and 6 numbers.</p>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="mt-1 w-5 h-5 accent-[#BB1E4D]"
                  />
                  <label htmlFor="agree" className="text-base">
                    I agree with the privacy policy.
                  </label>
                </div>

                <p className="text-base font-bold">
                  Register your inquiry{' '}
                  <strong className="text-[#BB1E4D]">
                    [{selectedCountry?.cntyNm}][{selectedType?.cdNm}]
                  </strong>
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !formData.message || !formData.password || !formData.agree}
                className={`w-40 h-14 rounded-full text-white font-bold transition-colors ${
                  formData.name && formData.email && formData.message && formData.password && formData.agree
                    ? 'bg-[#BB1E4D] hover:bg-[#9a1840]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            </>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-12">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto mb-6">
                <path d="m20 42 12 14 28-32" stroke="#BB1E4D" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="text-2xl font-bold mb-3">Registration is complete.</h2>
              <p className="text-lg text-gray-600 mb-8">We will reply after checking your inquiry</p>
              <button
                onClick={onClose}
                className="w-40 h-14 rounded-full bg-[#BB1E4D] text-white font-bold hover:bg-[#9a1840] transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
