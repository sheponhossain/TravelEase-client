import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
const TopCategories = () => {
  return (
    <section className="container mx-auto px-4 mt-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Top Categories</h2>
          <p className="text-gray-500 mt-1">
            Explore our wide range of vehicles by type
          </p>
        </div>
        <button className="text-[#FF7000] font-semibold hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { name: 'SUVs', icon: '🚙', count: '45 Cars' },
          { name: 'Electric', icon: '⚡', count: '12 Cars' },
          { name: 'Sedans', icon: '🚗', count: '82 Cars' },
          { name: 'Luxury', icon: '✨', count: '18 Cars' },
        ].map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center cursor-pointer hover:shadow-md transition-all"
          >
            <div className="text-4xl mb-3">{cat.icon}</div>
            <h3 className="font-bold text-gray-800">{cat.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{cat.count}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default TopCategories;
