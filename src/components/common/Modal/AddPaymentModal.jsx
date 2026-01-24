import React, { useContext, useState } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Buttons from '../Buttons';
import { AuthContext } from '../../../Routers/AuthProvider';

const AddPaymentModal = ({ isOpen, onClose }) => {
  const { loading, setLoading } = useContext(AuthContext);
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

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success('Funds Added to Wallet! 💰');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm p-4 transition-all">
      <div className="bg-white dark:bg-[#141414] w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border dark:border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-black text-[#040720] dark:text-white">
            Add Payment
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400 dark:text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Total Amount Display */}
          <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-3xl p-5 text-center mb-6 border dark:border-gray-800/50">
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
              Total Amount
            </p>
            <h4 className="text-3xl font-black text-[#040720] dark:text-white">
              $22,314
            </h4>
          </div>

          <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
            Choose your Payment Method
          </p>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all h-20
                  ${
                    selectedMethod === method.id
                      ? 'border-[#FF7000] bg-orange-50/50 dark:bg-[#FF7000]/10'
                      : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                  }`}
              >
                <img
                  src={method.logo}
                  alt={method.name}
                  className="h-8 w-auto object-contain brightness-100 dark:contrast-125"
                />
              </button>
            ))}
          </div>

          {/* Conditional View: Cards */}
          {selectedMethod === 'visa' && (
            <div className="space-y-3 mb-8">
              {savedCards.map((card) => (
                <label
                  key={card.id}
                  className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="selectedCard"
                      defaultChecked={card.id === 1}
                      className="w-4 h-4 accent-[#FF7000]"
                    />
                    <div className="w-12 h-8 border border-gray-100 dark:border-gray-700 rounded flex items-center justify-center p-1 bg-white dark:bg-gray-200">
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
                      <p className="text-sm font-bold text-[#040720] dark:text-gray-200">
                        {card.number}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">
                        Card Number
                      </p>
                    </div>
                  </div>
                </label>
              ))}
              <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 dark:text-gray-500 text-sm font-bold hover:border-[#FF7000] hover:text-[#FF7000] transition-all">
                <Plus size={18} /> Add New Card
              </button>
            </div>
          )}

          <div className="space-y-3">
            <Buttons
              type="solid"
              disabled={loading} //
              onClick={handlePayment}
              className={`w-full !py-4 !rounded-2xl shadow-lg shadow-[#FF7000]/20 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Add to Wallet'
              )}
            </Buttons>

            <button
              onClick={onClose}
              disabled={loading}
              className="w-full py-3 text-red-500 dark:text-red-400 font-bold text-sm hover:underline transition-all disabled:opacity-50"
            >
              Cancel Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;
