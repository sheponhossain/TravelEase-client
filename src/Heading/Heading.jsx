import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Heading = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative group flex flex-col items-center justify-center ${className}`}
      {...props}
    >
      <h2
        className="text-4xl md:text-6xl lg:text-7xl font-[1000] tracking-tighter uppercase 
                   text-white drop-shadow-2xl transition-all duration-500"
      >
        {children}
      </h2>
      <div className="mt-4 h-1.5 w-20 bg-[#FF7000] rounded-full shadow-[0_0_20px_rgba(255,112,0,0.6)] transition-all duration-500 group-hover:w-40" />
    </motion.div>
  );
};

export default Heading;
