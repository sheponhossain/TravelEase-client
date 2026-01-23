import React, { useState } from 'react';
import {
  LayoutGrid,
  CalendarCheck,
  Heart,
  Wallet as WalletIcon,
  CreditCard,
  Settings,
} from 'lucide-react';
import BookingsAndTransactions from '../components/MyBookingDetailsLayOut/Dashboard/BookingsAndTransactions';
import Wishlist from '../components/MyBookingDetailsLayOut/Wishlist/Wishlist';
import Wallet from '../components/MyBookingDetailsLayOut/Wallet/Wallet';
import MyBooking from '../components/MyBookingDetailsLayOut/MyBooking/MyBooking';
import Heading from '../Heading/Heading';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard', icon: <LayoutGrid size={24} /> },
    { name: 'My Bookings', icon: <CalendarCheck size={24} /> },
    { name: 'Wishlist', icon: <Heart size={24} /> },
    { name: 'My Wallet', icon: <WalletIcon size={24} /> },
    { name: 'Payments', icon: <CreditCard size={24} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <BookingsAndTransactions />;
      case 'My Bookings':
        return <MyBooking />;
      case 'Wishlist':
        return <Wishlist />;
      case 'My Wallet':
        return <Wallet />;
      default:
        return (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="text-gray-300" size={32} />
            </div>
            <h3 className="text-xl font-black text-[#040720]">
              {activeTab} Coming Soon
            </h3>
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-[#FBFBFB] min-h-screen">
      {/* 1. Dynamic Header Section - ডার্ক থিম */}
      <div className="bg-[#0a0a0a] pt-24 pb-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        {/* অরেঞ্জ গ্লো */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-1/3 w-[500px] h-[500px] bg-[#FF7000] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* ডাইনামিক হেডিং - activeTab অনুযায়ী নাম পাল্টাবে */}
          <Heading className="text-white uppercase">{activeTab}</Heading>

          <p className="text-gray-500 font-[1000] uppercase text-[10px] tracking-[0.5em] mt-6 flex items-center gap-3">
            User <span className="w-1.5 h-1.5 bg-[#FF7000] rounded-full"></span>
            Profile{' '}
            <span className="w-1.5 h-1.5 bg-[#FF7000] rounded-full"></span>
            {activeTab}
          </p>
        </div>
      </div>

      {/* 2. Navigation Tabs - ফ্লোটিং স্টাইল */}
      <div className="mx-auto w-full md:w-11/12 lg:w-10/12 -mt-16 mb-10 relative z-20 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex items-center justify-start md:justify-center gap-4 min-w-max px-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex flex-col items-center justify-center w-[140px] h-[130px] rounded-[2rem] transition-all duration-500 gap-3 border-2
                ${
                  activeTab === item.name
                    ? 'bg-[#FF7000] text-white border-[#FF7000] shadow-2xl shadow-orange-500/20 scale-105'
                    : 'bg-white text-gray-400 border-gray-50 hover:border-gray-200 hover:text-gray-600 shadow-sm'
                }`}
            >
              <div
                className={`${activeTab === item.name ? 'text-white' : 'text-gray-300 transition-colors'}`}
              >
                {item.icon}
              </div>
              <span className="text-[12px] font-black tracking-tight uppercase">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Dynamic Content Section */}
      <div className="w-full container mx-auto px-4 pb-20">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MyBookings;
