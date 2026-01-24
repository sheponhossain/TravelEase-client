/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect, useContext } from 'react';
import axios from 'axios';
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
  Eye,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Buttons from '../components/common/Buttons';
import Heading from '../Heading/Heading';
import { toast } from 'react-toastify';
import { AuthContext } from '../Routers/AuthProvider';

const AllVehicles = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const addToWishlist = async (car) => {
    if (!user?.email) {
      toast.error('Please login to add to wishlist!');
      return navigate('/login');
    }
    try {
      const response = await axios.post('http://localhost:5000/api/wishlist', {
        userEmail: user.email,
        vehicleId: car._id,
        vehicleName: car.vehicleName,
        price: car.pricePerDay,
        image: car.coverImage,
        transmission: car.transmission,
        fuel: car.fuel,
        location: car.location || 'Spain',
      });

      if (response.status === 201) {
        toast.success(`${car.vehicleName} added to Wishlist!`);
        fireConfetti();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server is not responding');
    }
  };
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [searchModel, setSearchModel] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState([]);
  const [sortBy, setSortBy] = useState('Latest Model');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/vehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      zIndex: 9999,
      colors: ['#FF7000', '#1a1a1a', '#ffffff'],
    });
  };

  const filteredCars = useMemo(() => {
    let result = [...vehicles];

    if (searchModel) {
      result = result.filter((car) =>
        car.vehicleName.toLowerCase().includes(searchModel.toLowerCase())
      );
    }
    if (selectedCategories.length > 0) {
      result = result.filter((car) =>
        selectedCategories.includes(car.categories)
      );
    }
    if (selectedTransmission.length > 0) {
      result = result.filter((car) =>
        selectedTransmission.includes(car.transmission)
      );
    }
    if (selectedFuel.length > 0) {
      result = result.filter((car) => selectedFuel.includes(car.fuel));
    }

    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortBy === 'Latest Model') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [
    vehicles,
    searchModel,
    selectedCategories,
    selectedTransmission,
    selectedFuel,
    sortBy,
  ]);

  const toggleFilter = (value, type) => {
    const setFunc =
      type === 'cat'
        ? setSelectedCategories
        : type === 'trans'
          ? setSelectedTransmission
          : setSelectedFuel;
    setFunc((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSearchModel('');
    setSelectedCategories([]);
    setSelectedTransmission([]);
    setSelectedFuel([]);
    setSortBy('Latest Model');
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans">
      <div className="bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="relative z-10">
          <Heading type="secondary">ALL VEHICLES</Heading>
        </div>
      </div>

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
        <aside className="lg:col-span-3">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-24 space-y-8">
            <div className="flex items-center gap-3 mb-2 font-black text-[#1a1a1a] uppercase text-sm tracking-widest">
              <SlidersHorizontal size={20} className="text-[#FF7000]" /> Filters
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Specific model..."
                value={searchModel}
                onChange={(e) => setSearchModel(e.target.value)}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl text-xs font-bold outline-none ring-1 ring-gray-100 focus:ring-[#FF7000]/20 transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>

            <FilterGroup
              title="Categories"
              options={['Electric', 'Sedan', 'SUV', 'Luxury']}
              selected={selectedCategories}
              onToggle={(opt) => toggleFilter(opt, 'cat')}
            />
            <FilterGroup
              title="Transmission"
              options={['Manual', 'Automatic']}
              selected={selectedTransmission}
              onToggle={(opt) => toggleFilter(opt, 'trans')}
            />
            <FilterGroup
              title="Fuel Type"
              options={['Petrol', 'Diesel', 'Electric']}
              selected={selectedFuel}
              onToggle={(opt) => toggleFilter(opt, 'fuel')}
            />

            <button
              onClick={resetFilters}
              className="w-full flex items-center justify-center gap-2 text-gray-400 text-[10px] font-black uppercase mt-6 tracking-widest hover:text-red-500 transition-colors"
            >
              <RotateCcw size={12} /> Reset All
            </button>
          </div>
        </aside>

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
                className="text-sm font-black text-[#1a1a1a] outline-none cursor-pointer bg-transparent uppercase"
              >
                <option>Latest Model</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 uppercase text-[10px] font-black text-gray-400 tracking-widest animate-pulse">
              Checking your assets...
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredCars.map((car) => (
                  <motion.div
                    key={car._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 border border-gray-50 overflow-hidden transition-all duration-500 flex flex-col h-full"
                  >
                    <div className="relative h-56 group overflow-hidden">
                      <img
                        src={car.coverImage}
                        alt={car.vehicleName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <span
                        className={`absolute top-5 left-5 text-white text-[9px] px-3 py-1.5 rounded-full uppercase font-black tracking-widest shadow-lg ${car.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}
                      >
                        {car.availability}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(car);
                        }}
                        className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-gray-400 hover:text-red-500 transition-all shadow-sm z-30 group/heart"
                      >
                        <Heart className="w-4 h-4 group-hover/heart:fill-red-500 transition-colors" />
                      </button>
                    </div>

                    <div className="p-7 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[#FF7000] font-black text-[10px] uppercase tracking-widest">
                          {car.categories}
                        </span>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full text-[#FFB800] text-[10px] font-black">
                          <Star size={12} className="fill-[#FFB800]" />{' '}
                          {car.rating || 3}
                        </div>
                      </div>
                      <h3 className="font-black text-[#1a1a1a] text-xl mb-6 tracking-tight truncate uppercase">
                        {car.vehicleName}
                      </h3>

                      <div className="grid grid-cols-3 gap-3 mb-8 ">
                        <SpecItem
                          icon={<Settings size={14} />}
                          label={car.transmission || 'N/A'}
                          color="text-blue-500 "
                          bg="bg-blue-50"
                        />

                        {/* Fuel Type - Petrol/Diesel/Electric */}
                        <SpecItem
                          icon={<Fuel size={14} />}
                          label={car.fuel || 'N/A'}
                          color="text-orange-500"
                          bg="bg-orange-50"
                        />

                        {/* Capacity - Just the number of persons */}
                        <SpecItem
                          icon={<User size={14} />}
                          label={
                            car.capacity
                              ? `${car.capacity.split(' ')[0]} Seats`
                              : '4 Seats'
                          }
                          color="text-green-500"
                          bg="bg-green-50"
                        />
                      </div>

                      <div className="mt-auto pt-6 border-t border-gray-50">
                        <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-2xl mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-gray-400" />
                            <span className="text-gray-600 font-bold text-sm truncate max-w-[100px]">
                              {car.location || 'Spain'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <span className="text-[#FF7000] font-black text-xl">
                              ${car.pricePerDay}
                            </span>
                            <div className="flex flex-col ">
                              <span className="text-gray-400 font-bold text-[16px] ">
                                /
                              </span>
                              <span className="text-gray-400 font-bold text-[10px] uppercase -mt-4 ml-2">
                                Day
                              </span>
                            </div>
                          </div>
                        </div>

                        <Buttons
                          type="solid"
                          onClick={() => navigate(`/VehicleDetails/${car._id}`)}
                          className="cursor-pointer w-full font-black active:scale-[0.98]"
                        >
                          <Calendar size={20} className="text-white/80" />
                          Book Now
                        </Buttons>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredCars.length > 0 && (
            <div className="flex justify-center items-center mt-20 gap-4">
              <button className="w-12 h-12 flex items-center justify-center border border-gray-100 bg-white rounded-2xl hover:bg-[#1a1a1a] hover:text-white transition-all text-gray-400">
                <FaArrowLeft size={14} />
              </button>
              <button className="w-12 h-12 rounded-2xl font-black text-sm bg-[#FF7000] text-white shadow-xl shadow-orange-200">
                1
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-gray-100 bg-white rounded-2xl hover:bg-[#1a1a1a] hover:text-white transition-all text-gray-400">
                <FaArrowRight size={14} />
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const FilterGroup = ({ title, options, selected, onToggle }) => (
  <div className="space-y-4">
    <p className="font-black text-[10px] uppercase text-gray-400 tracking-widest border-b border-gray-50 pb-2">
      {title}
    </p>
    <div className="space-y-2.5">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
            className="w-4 h-4 accent-[#FF7000] rounded"
          />
          <span
            className={`text-[12px] font-bold transition-colors ${selected.includes(opt) ? 'text-[#1a1a1a]' : 'text-gray-400 group-hover:text-gray-600'}`}
          >
            {opt}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const SpecItem = ({ icon, label, color, bg }) => (
  <div className="flex flex-col items-center justify-center bg-[#F8F9FA] border border-gray-100/50 p-2 rounded-[1.2rem] hover:bg-white hover:shadow-md transition-all duration-300 min-h-[85px]">
    <div
      className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center mb-2 shrink-0`}
    >
      <div className={color}>{icon}</div>
    </div>
    <span className="text-[9px] font-bold text-[#1a1a1a] uppercase tracking-tighter text-center w-full leading-tight break-words px-1">
      {label}
    </span>
  </div>
);

export default AllVehicles;
