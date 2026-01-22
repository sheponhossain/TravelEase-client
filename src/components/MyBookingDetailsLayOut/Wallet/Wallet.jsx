import React, { useState } from 'react';
import {
  RefreshCw,
  PlusCircle,
  MoreVertical,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  History,
} from 'lucide-react';
import Buttons from '../../common/Buttons';
import AddPaymentModal from '../../common/Modal/AddPaymentModal';

const Wallet = () => {
  // ১. মোডাল কন্ট্রোল করার জন্য স্টেট যোগ করা হয়েছে
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cards] = useState([
    {
      id: 1,
      type: 'VISA',
      number: '3210 **** **** **12',
      balance: '$3000',
      status: 'Active',
      isActive: true,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
    },
    {
      id: 2,
      type: 'MASTERCARD',
      number: '7847 **** **** **78',
      balance: '$2300',
      status: 'Active',
      isActive: false,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
    },
    {
      id: 3,
      type: 'VISA',
      number: '4710 **** **** **64',
      balance: '$1800',
      status: 'Active',
      isActive: false,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
    },
  ]);

  return (
    <div className="w-full bg-[#F8F9FA] py-10">
      <div className="mx-auto w-full md:w-11/12 lg:w-10/12 px-4">
        <h2 className="text-2xl font-black text-[#040720] mb-8">
          Wallet Balance
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Balance & Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              {/* Available Balance Black Card */}
              <div className="bg-[#1a1a1a] text-white p-7 rounded-2xl relative overflow-hidden mb-8 shadow-lg shadow-gray-200">
                <div className="relative z-10">
                  <p className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-widest opacity-80">
                    Available Balance
                  </p>
                  <h3 className="text-4xl font-black tracking-tight">
                    $4,544.00
                  </h3>
                </div>
                <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all hover:rotate-180 duration-500">
                  <RefreshCw size={24} />
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-[#E7F6F2] p-4 rounded-2xl border border-teal-50 flex flex-col items-center justify-center">
                  <ArrowUpRight size={18} className="text-[#117a8b] mb-2" />
                  <p className="text-lg font-black text-[#040720]">$123.4k</p>
                  <p className="text-[10px] font-bold text-[#117a8b] uppercase tracking-tighter">
                    Credit
                  </p>
                </div>
                <div className="bg-[#FFF4ED] p-4 rounded-2xl border border-orange-50 flex flex-col items-center justify-center">
                  <ArrowDownLeft size={18} className="text-[#f58220] mb-2" />
                  <p className="text-lg font-black text-[#040720]">$7.3k</p>
                  <p className="text-[10px] font-bold text-[#f58220] uppercase tracking-tighter">
                    Debit
                  </p>
                </div>
                <div className="bg-[#EEF2FF] p-4 rounded-2xl border border-blue-50 flex flex-col items-center justify-center">
                  <History size={18} className="text-[#4F46E5] mb-2" />
                  <p className="text-lg font-black text-[#040720]">$656k</p>
                  <p className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-tighter">
                    Total
                  </p>
                </div>
              </div>

              {/* Add Credit Section */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-500 block ml-1">
                  Add Wallet Credits ($)
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="1,000"
                    className="flex-grow bg-gray-50 border border-gray-200 px-5 py-4 rounded-2xl text-sm font-black text-[#040720] focus:ring-2 ring-orange-500/10 outline-none transition-all"
                  />
                </div>
                {/* ২. বাটনে onClick ইভেন্ট যোগ করা হয়েছে */}
                <Buttons
                  onClick={() => setIsModalOpen(true)}
                  type="solid"
                  className="w-full !py-4 font-black rounded-2xl shadow-md transition-transform active:scale-[0.98]"
                >
                  Add Payment
                </Buttons>
              </div>
            </div>
          </div>

          {/* Right Side: Linked Cards */}
          <div className="lg:col-span-7 h-full">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-50 p-2.5 rounded-xl">
                    <CreditCard size={20} className="text-orange-500" />
                  </div>
                  <h3 className="text-xl font-black text-[#040720]">
                    Linked Cards
                  </h3>
                </div>
                <button className="flex items-center gap-2 text-[#117a8b] font-black text-sm hover:underline">
                  <PlusCircle size={20} /> Add New
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between group p-1 transition-all"
                  >
                    <div className="flex items-center gap-6 flex-grow">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${card.isActive ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-gray-200'}`}
                      />
                      <div className="w-16 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center p-2 shadow-sm">
                        <img
                          src={card.logo}
                          alt={card.type}
                          className="max-h-full object-contain"
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 flex-grow gap-4">
                        <div className="flex flex-col">
                          <p className="text-[13px] font-black text-[#040720] tracking-wide">
                            {card.number}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                            Card Number
                          </p>
                        </div>
                        <div className="hidden md:flex flex-col">
                          <p className="text-[13px] font-black text-[#040720]">
                            {card.balance}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                            Balance
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-md w-fit uppercase ${card.isActive ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}
                          >
                            {card.status}
                          </span>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                            Status
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-300 hover:text-[#040720] transition-colors border border-transparent hover:border-gray-100">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-5 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-[11px] text-gray-500 font-bold text-center leading-relaxed">
                  * You can link up to 5 cards to your account. Verified
                  accounts get unlimited transactions and priority support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ৩. মোডাল এখানে রেন্ডার করা হয়েছে */}
      <AddPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Wallet;
