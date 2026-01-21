import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
// 1. Video-ti import korun
import carVideo from '../../assets/car-drift.mp4';
import Buttons from '../common/Buttons';

const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover opacity-60"
        >
          {/* 2. Import kora variable-ti ekhane boshan */}
          <source src={carVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white text-7xl font-black italic uppercase">
            Travel <span className="text-[#FF7000]">Ease</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-lg">
            Experience the freedom of the open road with our premium vehicle
            rentals. Whether you're seeking adventure or business travel, we
            have the perfect ride for you.
          </p>
          <nav className="flex gap-4 items-center mt-4 ">
            <Buttons className="text-sm cursor-pointer" type="solid">
              All Vehicles
            </Buttons>
          </nav>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
