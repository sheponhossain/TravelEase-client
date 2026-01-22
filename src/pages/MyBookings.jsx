import React, { useState } from 'react';
import {
  LayoutGrid,
  CalendarCheck,
  Star,
  Heart,
  MessageSquare,
  Wallet as WalletIcon,
  CreditCard,
  Settings,
} from 'lucide-react';
import BookingsAndTransactions from '../components/MyBookingDetailsLayOut/Dashboard/BookingsAndTransactions';
import Wishlist from '../components/MyBookingDetailsLayOut/Wishlist/Wishlist';
import Wallet from '../components/MyBookingDetailsLayOut/Wallet/Wallet';
import MyBooking from '../components/MyBookingDetailsLayOut/MyBooking/MyBooking';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  // স্ক্রিনশট অনুযায়ী আইটেম এবং আইকন সেট
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
        return <MyBooking />; // আপনার তৈরি করা বড় টেবিল সেকশন
      case 'Wishlist':
        return <Wishlist />;
      case 'My Wallet': // match the name exactly
        return <Wallet />;
      case 'Messages':
      case 'Payments':
      case 'Settings':
        return (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="text-gray-300 animate-spin-slow" size={32} />
            </div>
            <h3 className="text-xl font-black text-[#040720]">
              {activeTab} Coming Soon
            </h3>
            <p className="text-gray-400 font-bold">
              We are working hard to bring this feature to you!
            </p>
          </div>
        );
      default:
        return <BookingsAndTransactions />;
    }
  };

  return (
    <div className="w-full bg-[#FBFBFB] min-h-screen py-10">
      {/* Navigation Tabs Container */}
      <div className="mx-auto w-full md:w-11/12 lg:w-10/12 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex items-center justify-start md:justify-center gap-4 min-w-max px-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex flex-col items-center justify-center w-[140px] h-[130px] rounded-xl transition-all duration-300 gap-3 border
                ${
                  activeTab === item.name
                    ? 'bg-[#FF7000] text-white border-[#F5A64B] shadow-xl shadow-orange-100 scale-105'
                    : 'bg-[#F4F7F8] text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700'
                }`}
            >
              <div
                className={
                  activeTab === item.name
                    ? 'text-white'
                    : 'text-gray-400 font-bold'
                }
              >
                {item.icon}
              </div>
              <span className="text-[14px] font-black tracking-tight leading-tight">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content Section with Animation */}
      <div className="w-full transition-opacity duration-300 ease-in-out">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MyBookings;
