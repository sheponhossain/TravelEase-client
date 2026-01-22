import React from 'react';
import {
  CalendarDays,
  Wallet,
  ArrowRightLeft,
  Heart,
  ArrowRight,
} from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'My Bookings',
      value: '450',
      linkText: 'View all Bookings',
      icon: <CalendarDays size={28} />,
      color: 'bg-[#3D707A]', // Teal
      lightBg: 'bg-teal-50',
    },
    {
      title: 'Wallet Balance',
      value: '$24,665',
      linkText: 'View Balance',
      icon: <Wallet size={28} />,
      color: 'bg-[#F5A64B]', // Orange
      lightBg: 'bg-orange-50',
    },
    {
      title: 'Total Transactions',
      value: '$15,210',
      linkText: 'View all Transactions',
      icon: <ArrowRightLeft size={28} />,
      color: 'bg-[#6BC051]', // Green
      lightBg: 'bg-green-50',
    },
    {
      title: 'Wishlist Cars',
      value: '24',
      linkText: 'Go to Wishlist',
      icon: <Heart size={28} />,
      color: 'bg-[#EF4444]', // Red
      lightBg: 'bg-red-50',
    },
  ];

  return (
    <div className="w-full bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl font-extrabold text-[#040720] mb-8">
          Dashboard
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-500 mb-1">
                    {item.title}
                  </p>
                  <h3 className="text-3xl font-black text-[#040720]">
                    {item.value}
                  </h3>
                </div>

                {/* Icon with unique shape background */}
                <div
                  className={`${item.color} text-white p-4 rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] shadow-lg`}
                >
                  {item.icon}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-gray-100 mt-2">
                <a
                  href="#"
                  className="text-[13px] font-bold text-[#3D707A] flex items-center gap-1 hover:gap-2 transition-all"
                >
                  {item.linkText} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
