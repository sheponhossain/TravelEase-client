import React, { useState } from 'react';
import { X, CreditCard, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import Buttons from '../Buttons';

const AddPaymentModal = ({ isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState('visa');

  if (!isOpen) return null;

  const paymentMethods = [
    {
      id: 'bkash',
      name: 'bKash',
      logo: 'https://i.ibb.co.com/4ZyZ1CrV/download-2.png',
    },
    {
      id: 'nagad',
      name: 'Nagad',
      logo: 'https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png',
    },
    {
      id: 'visa',
      name: 'VISA',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
    },
  ];

  const savedCards = [
    { id: 1, number: '3210 **** **** **12', type: 'visa' },
    { id: 2, number: '7847 **** **** **78', type: 'mastercard' },
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-black text-[#040720]">Add Payment</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {/* Total Amount Display */}
          <div className="bg-gray-50 rounded-2xl p-4 text-center mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              Total Amount
            </p>
            <h4 className="text-2xl font-black text-[#040720]">$22,314</h4>
          </div>

          <p className="text-sm font-bold text-gray-700 mb-4">
            Choose your Payment Method
          </p>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all h-16
                  ${
                    selectedMethod === method.id
                      ? 'border-orange-500 bg-orange-50/50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
              >
                <img
                  src={method.logo}
                  alt={method.name}
                  className="h-8 w-auto object-contain"
                />
              </button>
            ))}
          </div>

          {/* Conditional View: Show Cards only if VISA/Cards is selected */}
          {selectedMethod === 'visa' && (
            <div className="space-y-3 mb-8">
              {savedCards.map((card) => (
                <label
                  key={card.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="selectedCard"
                      defaultChecked={card.id === 1}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <div className="w-12 h-8 border border-gray-100 rounded flex items-center justify-center p-1 bg-white">
                      <img
                        src={
                          card.type === 'visa'
                            ? 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
                            : 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
                        }
                        alt="card"
                        className="h-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#040720]">
                        {card.number}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">
                        Card Number
                      </p>
                    </div>
                  </div>
                </label>
              ))}
              <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-sm font-bold hover:border-orange-200 hover:text-orange-500 transition-all">
                <Plus size={18} /> Add New Card
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Buttons
              type="solid"
              onClick={() => {
                toast.success('Funds Added to Wallet!', {
                  duration: 3000,
                  position: 'top-right',
                  style: {
                    background: '#1a1a1a', // আপনার বাটনের কালারের সাথে মিল রেখে ডার্ক থিম
                    color: '#fff',
                    borderRadius: '16px',
                    fontWeight: 'bold',
                    padding: '16px',
                  },
                  iconTheme: {
                    primary: '#FF7000', // আপনার অরেঞ্জ কালারটি আইকনে ব্যবহার করা হয়েছে
                    secondary: '#fff',
                  },
                });
              }}
              className="w-full cursor-pointer"
            >
              Add to Wallet
            </Buttons>
            <Buttons
              type="outline"
              onClick={onClose}
              className="w-full py-2 text-red-500 font-bold text-sm cursor-pointer"
            >
              Cancel
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;
