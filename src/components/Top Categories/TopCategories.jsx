import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

const TopCategories = () => {
  const categories = [
    {
      name: 'SUVs',
      count: '45',
      img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=400',
      bgText: 'SUV',
    },
    {
      name: 'Electric',
      count: '12',
      img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=400',
      bgText: 'EV',
    },
    {
      name: 'Sedans',
      count: '82',
      img: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=400',
      bgText: 'SDN',
    },
    {
      name: 'Luxury',
      count: '18',
      img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400',
      bgText: 'LUX',
    },
  ];

  return (
    <section className="container mx-auto px-4 mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4 text-center md:text-left">
        <div>
          <span className="inline-flex items-center gap-2 text-[#FF7000] font-black text-[10px] uppercase tracking-[0.4em] mb-6">
            <span className="w-8 h-[1px] bg-[#FF7000]"></span>Fleet Overview
          </span>
          <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tight">
            TOP <span className="text-[#FF7000]">CATEGORIES</span>
          </h2>
        </div>
        <button className="flex items-center gap-2 text-[#1a1a1a] hover:text-[#FF7000] font-black text-xs uppercase tracking-widest transition-all group">
          View All{' '}
          <ChevronRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="group relative h-[380px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl shadow-gray-200/50"
          >
            {/* Background Image */}
            <img
              src={cat.img}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark Overlay (Gradient) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040720] via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

            {/* Content Box */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              {/* Watermark Background Text */}
              <span className="absolute top-10 -right-4 text-7xl font-black opacity-10 italic select-none">
                {cat.bgText}
              </span>

              <div className="relative z-10">
                <p className="text-[#FF7000] font-bold text-xs uppercase tracking-widest mb-1">
                  {cat.count} Vehicles
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black tracking-tight uppercase">
                    {cat.name}
                  </h3>
                  {/* Floating Action Circle */}
                  <div className="w-10 h-10 bg-[#FF7000] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                    <ArrowUpRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#FF7000] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
