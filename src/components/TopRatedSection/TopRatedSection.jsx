import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, MapPin, Fuel, Settings, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Buttons from '../common/Buttons';

const TopRatedSection = () => {
  const [topVehicles, setTopVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/top-rated-vehicles'
        );
        setTopVehicles(res.data);
      } catch (err) {
        console.error('Top Rated Fetch Error:', err);
      }
    };
    fetchTopRated();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <span className="inline-flex items-center gap-2 text-[#FF7000] font-black text-[10px] uppercase tracking-[0.4em] mb-6">
              <span className="w-8 h-[1px] bg-[#FF7000]"></span>Elite Collection
            </span>
            <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tight">
              Top Rated <span className="text-[#FF7000]">Vehicles</span>
            </h2>
          </div>
          <button
            onClick={() => navigate('/allvehicles')}
            className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#FF7000] transition-colors"
          >
            Explore All Fleet <ArrowRight size={14} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topVehicles.map((car, idx) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className=" bg-[#F8F9FA] rounded-[2.5rem] overflow-hidden border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={car.coverImage}
                  alt={car.vehicleName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Star size={14} className="text-[#FFB800] fill-[#FFB800]" />
                  <span className="text-xs font-black text-[#1a1a1a]">
                    {car.rating}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-8 text-left">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                    {car.categories}
                  </span>
                  <div className="flex items-center gap-1 text-[#FF7000] font-black text-xl">
                    ${car.pricePerDay}{' '}
                    <span className="text-gray-300 text-[10px] uppercase tracking-widest ml-1">
                      / Day
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-[1000] text-[#1a1a1a] mb-6 uppercase tracking-tight">
                  {car.vehicleName}
                </h3>

                {/* Specs */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 bg-white border border-gray-100 px-3 py-2 rounded-xl">
                    <Settings size={12} className="text-[#FF7000]" />{' '}
                    {car.transmission}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 bg-white border border-gray-100 px-3 py-2 rounded-xl">
                    <Fuel size={12} className="text-[#FF7000]" /> {car.fuel}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 bg-white border border-gray-100 px-3 py-2 rounded-xl">
                    <MapPin size={12} className="text-[#FF7000]" />{' '}
                    {car.location}
                  </div>
                </div>

                <Buttons
                  onClick={() => navigate(`/VehicleDetails/${car._id}`)}
                  type="solid"
                  className="cursor-pointer"
                >
                  View Details
                </Buttons>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedSection;
