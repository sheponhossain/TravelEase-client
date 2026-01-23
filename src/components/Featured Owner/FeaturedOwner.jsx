import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Quote, ChevronRight } from 'lucide-react';
import Buttons from '../common/Buttons';

const FeaturedOwner = () => {
  return (
    <section className="container mx-auto px-4 my-32">
      <div className="mb-12">
        <span className="inline-flex items-center gap-2 text-[#FF7000] font-black text-[10px] uppercase tracking-[0.4em] mb-6">
          <span className="w-8 h-[1px] bg-[#FF7000]"></span>Meet Our
        </span>
        <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tight">
          Featured <span className="text-[#FF7000]">Owner</span>
        </h2>
      </div>
      <div className="relative bg-[#0d0d0d] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7000]/10 blur-[120px] rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full -ml-10 -mb-10"></div>

        <div className="flex flex-col lg:flex-row items-stretch">
          {/* 1. Image Section with Floating Badge */}
          <div className="w-full lg:w-5/12 relative group min-h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800"
              alt="Featured Owner"
              className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0d0d0d] hidden lg:block"></div>

            {/* Floating Verified Badge */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute top-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#FF7000] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40">
                <ShieldCheck className="text-white" size={20} />
              </div>
              <div>
                <p className="text-white font-black text-xs uppercase tracking-widest">
                  Verified
                </p>
                <p className="text-gray-400 text-[10px] font-bold">
                  TOP-RATED HOST
                </p>
              </div>
            </motion.div>
          </div>

          {/* 2. Content Section */}
          <div className="w-full lg:w-7/12 p-10 md:p-16 lg:p-20 flex flex-col justify-center relative">
            <Quote
              size={60}
              className="absolute top-10 right-10 text-white opacity-5 rotate-12"
            />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-[#FF7000] font-black text-[10px] uppercase tracking-[0.4em] mb-6">
                <span className="w-8 h-[1px] bg-[#FF7000]"></span> Owner
                Spotlight
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
                Meet Robert, the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 italic">
                  Gold Standard
                </span>{' '}
                of Hosting
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-10 italic font-medium border-l-4 border-[#FF7000] pl-6">
                "I've been sharing my fleet on TravelEase for 2 years. The
                experience has been seamless. My cars are always maintained to
                the highest standards, ensuring every trip is a memory worth
                keeping."
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12">
                <div className="space-y-1">
                  <h4 className="text-3xl font-black text-white">500+</h4>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Trips Completed
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-3xl font-black text-white flex items-center gap-2">
                    4.9{' '}
                    <Star className="fill-[#FFB800] text-[#FFB800]" size={20} />
                  </h4>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Average Rating
                  </p>
                </div>
                <div className="space-y-1 hidden sm:block">
                  <h4 className="text-3xl font-black text-white">100%</h4>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Response Rate
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-wrap gap-6 items-center">
                <Buttons
                  type="solid"
                  className="cursor-pointer px-10 py-5  text-xs uppercase  shadow-2xl shadow-orange-500/20"
                >
                  View Robert's Fleet
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Buttons>
                <button className="text-gray-400 hover:text-white font-black text-xs uppercase tracking-widest transition-colors">
                  Learn about hosting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOwner;
