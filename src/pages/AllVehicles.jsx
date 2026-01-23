/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import 'flatpickr/dist/themes/material_orange.css';
import Flatpickr from 'react-flatpickr';
import {
  Search,
  MapPin,
  Calendar,
  Star,
  Heart,
  User,
  Fuel,
  Settings,
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Buttons from '../components/common/Buttons';
import Heading from '../Heading/Heading';

const AllVehicles = () => {
  const navigator = useNavigate();

  // ১. স্টেট ম্যানেজমেন্ট
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [searchModel, setSearchModel] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('Latest Model');

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      zIndex: 9999,
      colors: ['#FF7000', '#1a1a1a', '#ffffff'],
    });
  };

  // ২. ফিল্টারিং এবং সর্টিং লজিক
  const filteredCars = useMemo(() => {
    let result = [...carData];

    // সার্চ ফিল্টার
    if (searchModel) {
      result = result.filter((car) =>
        car.name.toLowerCase().includes(searchModel.toLowerCase())
      );
    }

    // ব্র্যান্ড ফিল্টার
    if (selectedBrands.length > 0) {
      result = result.filter((car) => selectedBrands.includes(car.brand));
    }

    // ক্যাটাগরি ফিল্টার
    if (selectedCategories.length > 0) {
      result = result.filter((car) =>
        selectedCategories.includes(car.category)
      );
    }

    // সর্টিং
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === 'Latest Model') {
      result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [searchModel, selectedBrands, selectedCategories, sortBy]);

  const handleFilterChange = (value, type) => {
    if (type === 'Car Brand') {
      setSelectedBrands((prev) =>
        prev.includes(value)
          ? prev.filter((i) => i !== value)
          : [...prev, value]
      );
    } else if (type === 'Category') {
      setSelectedCategories((prev) =>
        prev.includes(value)
          ? prev.filter((i) => i !== value)
          : [...prev, value]
      );
    }
  };

  const resetFilters = () => {
    setSearchModel('');
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSortBy('Latest Model');
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="relative z-10">
          <Heading type="secondary">ALL VEHICLES</Heading>
        </div>
      </div>

      {/* Top Search Bar */}
      <div className="container mx-auto -mt-12 px-4 relative z-20">
        <div className="bg-white p-2 rounded-[2rem] shadow-2xl shadow-orange-500/10 grid grid-cols-1 md:grid-cols-4 gap-2 items-center border border-gray-100/50 backdrop-blur-xl">
          <div className="px-6 py-3 border-r border-gray-50 flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Location
            </label>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#FF7000]" />
              <input
                type="text"
                placeholder="Where to?"
                className="w-full focus:outline-none text-sm font-bold text-[#1a1a1a] bg-transparent"
              />
            </div>
          </div>
          <div className="px-6 py-3 border-r border-gray-50 flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Pickup
            </label>
            <div className="flex items-center gap-2 text-sm font-bold text-[#1a1a1a]">
              <Calendar size={16} className="text-[#FF7000]" />
              <Flatpickr
                value={pickupDate}
                onChange={(d) => setPickupDate(d[0])}
                className="bg-transparent focus:outline-none w-full cursor-pointer"
              />
            </div>
          </div>
          <div className="px-6 py-3 border-r border-gray-50 flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Return
            </label>
            <div className="flex items-center gap-2 text-sm font-bold text-[#1a1a1a]">
              <Calendar size={16} className="text-[#FF7000]" />
              <Flatpickr
                value={returnDate}
                onChange={(d) => {
                  setReturnDate(d[0]);
                  fireConfetti();
                }}
                className="bg-transparent focus:outline-none w-full cursor-pointer"
              />
            </div>
          </div>
          <div className="p-1">
            <button className="w-full h-full bg-[#1a1a1a] text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#FF7000] transition-all duration-500 shadow-xl group">
              <Search className="w-4 h-4 group-hover:rotate-90 transition-transform" />{' '}
              Search
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* SIDEBAR */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <SlidersHorizontal size={20} className="text-[#FF7000]" />
              <h3 className="font-black text-[#1a1a1a] uppercase text-sm tracking-widest">
                Filters
              </h3>
            </div>

            {/* Model Search */}
            <div className="relative mb-10">
              <input
                type="text"
                placeholder="Specific model..."
                value={searchModel}
                onChange={(e) => setSearchModel(e.target.value)}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl text-xs font-bold outline-none ring-1 ring-gray-100 focus:ring-[#FF7000]/20 transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>

            {/* Checkbox Filters */}
            <div className="space-y-8">
              {filters.map((filter, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex justify-between items-center group cursor-pointer">
                    <span className="font-black text-xs uppercase text-[#1a1a1a] tracking-wider">
                      {filter.title}
                    </span>
                    <ChevronDown
                      size={14}
                      className="text-gray-300 group-hover:text-[#FF7000] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {filter.options.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer group transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={
                            filter.title === 'Car Brand'
                              ? selectedBrands.includes(opt)
                              : selectedCategories.includes(opt)
                          }
                          onChange={() => handleFilterChange(opt, filter.title)}
                          className="w-4 h-4 accent-[#FF7000] rounded-lg border-gray-200"
                        />
                        <span className="text-[13px] font-bold text-gray-400 group-hover:text-[#1a1a1a] transition-colors">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={resetFilters}
              className="w-full flex items-center justify-center gap-2 text-gray-400 text-[10px] font-black uppercase mt-6 tracking-widest hover:text-red-500 transition-colors"
            >
              <RotateCcw size={12} /> Reset All
            </button>
          </div>
        </aside>

        {/* LISTING SECTION */}
        <section className="lg:col-span-9">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <p className="text-[#1a1a1a] text-sm font-bold">
              Showing{' '}
              <span className="text-[#FF7000]">{filteredCars.length}</span>{' '}
              Results
            </p>
            <div className="bg-white p-2 rounded-2xl border border-gray-100 flex items-center gap-3 px-5">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm font-black text-[#1a1a1a] outline-none cursor-pointer bg-transparent"
              >
                <option>Latest Model</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 border border-gray-50 overflow-hidden transition-all duration-500 flex flex-col h-full"
                >
                  <div className="relative h-56 group overflow-hidden">
                    <img
                      src={car.img}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    {car.featured && (
                      <span className="absolute top-5 left-5 bg-[#FF7000] text-white text-[9px] px-3 py-1.5 rounded-full uppercase font-black tracking-widest shadow-lg">
                        Featured
                      </span>
                    )}
                    <button className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-gray-400 hover:text-red-500 transition-all shadow-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#FF7000] font-black text-[10px] uppercase tracking-widest">
                        {car.brand}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full text-[#FFB800] text-[10px] font-black">
                        <Star size={12} className="fill-[#FFB800]" />{' '}
                        {car.rating}
                      </div>
                    </div>
                    <h3 className="font-black text-[#1a1a1a] text-xl mb-6 tracking-tight">
                      {car.name}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="flex flex-col gap-1 items-center bg-gray-50 p-3 rounded-2xl">
                        <Settings size={14} className="text-gray-300" />
                        <span className="text-[10px] font-black text-[#1a1a1a]">
                          {car.transmission}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 items-center bg-gray-50 p-3 rounded-2xl">
                        <Fuel size={14} className="text-gray-300" />
                        <span className="text-[10px] font-black text-[#1a1a1a]">
                          {car.fuel}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 items-center bg-gray-50 p-3 rounded-2xl">
                        <User size={14} className="text-gray-300" />
                        <span className="text-[10px] font-black text-[#1a1a1a]">
                          {car.capacity.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-6 border-t border-gray-50 mt-auto">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Price Per Day
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[#1a1a1a] font-black text-2xl">
                            ${car.price}
                          </span>
                          <span className="text-gray-400 font-bold text-xs">
                            /day
                          </span>
                        </div>
                      </div>
                      <Buttons
                        onClick={() => navigator('/VehicleDetails')}
                        type="solid"
                        className="!rounded-2xl !py-4 !px-6 text-xs font-black shadow-lg shadow-orange-100"
                      >
                        Details
                      </Buttons>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredCars.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold">
                No vehicles found. Try resetting filters!
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-20 gap-4">
            <button className="w-12 h-12 flex items-center justify-center border border-gray-100 bg-white rounded-2xl hover:bg-[#1a1a1a] hover:text-white transition-all text-gray-400">
              <FaArrowLeft size={14} />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-12 h-12 rounded-2xl font-black text-sm transition-all ${n === 1 ? 'bg-[#FF7000] text-white shadow-xl shadow-orange-200' : 'bg-white border border-gray-100 text-gray-400 hover:border-[#1a1a1a]'}`}
              >
                {n}
              </button>
            ))}
            <button className="w-12 h-12 flex items-center justify-center border border-gray-100 bg-white rounded-2xl hover:bg-[#1a1a1a] hover:text-white transition-all text-gray-400">
              <FaArrowRight size={14} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

// ডাটা সোর্স (category ফিল্ডটি প্রতিটি অবজেক্টে যোগ করে দিয়েছি)
const filters = [
  {
    title: 'Car Brand',
    options: ['Tesla', 'Ford', 'Audi', 'Kia', 'Toyota', 'Chevrolet'],
  },
  { title: 'Category', options: ['SUV', 'Sedan', 'Luxury', 'Truck'] },
];

const carData = [
  {
    name: 'Toyota Camry SE 350',
    brand: 'Toyota',
    category: 'Sedan',
    rating: '4.8',
    transmission: 'Auto',
    fuel: 'Petrol',
    year: '2018',
    capacity: '5 Persons',
    price: '160',
    featured: true,
    img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=400',
  },
  {
    name: 'Kia Soul 2016 Edition',
    brand: 'Kia',
    category: 'SUV',
    rating: '4.5',
    transmission: 'Auto',
    fuel: 'Electric',
    year: '2016',
    capacity: '5 Persons',
    price: '80',
    featured: false,
    img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=400',
  },
  {
    name: 'Audi A3 Sport 2019',
    brand: 'Audi',
    category: 'Luxury',
    rating: '4.9',
    transmission: 'Manual',
    fuel: 'Petrol',
    year: '2019',
    capacity: '4 Persons',
    price: '145',
    featured: false,
    img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=400',
  },
];

export default AllVehicles;
