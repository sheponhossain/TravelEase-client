import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Heart,
  Wallet,
  CreditCard,
} from 'lucide-react';
import DashboardStats from '../components/MyBookingDetailsLayOut/Dashboard/DashboardCard';
import BookingsAndTransactions from '../components/MyBookingDetailsLayOut/Dashboard/BookingsAndTransactions';
import MyBooking from '../components/MyBookingDetailsLayOut/MyBooking/MyBooking';
import Wishlist from '../components/MyBookingDetailsLayOut/Wishlist/Wishlist';

const MyBookings = () => {
  // ডিফল্টভাবে 'Dashboard' ট্যাব সেট করা হয়েছে
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={24} /> },
    { name: 'My Bookings', icon: <CalendarCheck size={24} /> },
    { name: 'Wishlist', icon: <Heart size={24} /> },
    { name: 'My Wallet', icon: <Wallet size={24} /> },
    { name: 'Payments', icon: <CreditCard size={24} /> },
  ];

  // ট্যাব অনুযায়ী আলাদা আলাদা কন্টেন্ট রেন্ডার করার ফাংশন
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
            <DashboardStats />
            <BookingsAndTransactions />
          </>
        );
      case 'My Bookings':
        return <MyBooking />;
      case 'Wishlist':
        return <Wishlist />;
      case 'My Wallet':
        return (
          <div className="p-10 text-center font-bold">
            Wallet Details Coming Soon...
          </div>
        );
      case 'Payments':
        return (
          <div className="p-10 text-center font-bold">
            Payment History Coming Soon...
          </div>
        );
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="w-full bg-white py-8 border-b border-gray-100 mx-auto mt-8 rounded-2xl shadow-lg shadow-gray-200/50">
      {/* Navigation Tabs */}
      <div className="px-4 w-full mx-auto md:w-11/12 lg:w-10/12 xl:w-10/12 2xl:w-8/12 rounded-2xl mb-8">
        <div className="flex w-full mx-auto flex-wrap items-center justify-center gap-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex flex-col items-center justify-center min-w-[120px] h-[120px] rounded-xl transition-all duration-300 gap-3
                ${
                  activeTab === item.name
                    ? 'bg-[#F5A64B] text-white shadow-lg shadow-orange-100'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
            >
              <div
                className={
                  activeTab === item.name ? 'text-white' : 'text-gray-600'
                }
              >
                {item.icon}
              </div>
              <span className="text-[14px] font-bold tracking-tight">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content Section */}
      <div className="transition-all duration-500">{renderTabContent()}</div>
    </div>
  );
};

export default MyBookings;
