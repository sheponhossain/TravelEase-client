import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import 'flatpickr/dist/themes/material_orange.css';
import Flatpickr from 'react-flatpickr';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  User,
  Fuel,
  Gauge,
  Settings,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const AllVehicles = () => {
  const [pickupDate, setPickupDate] = useState(new Date('2023-11-04'));
  const [returnDate, setReturnDate] = useState(new Date('2023-11-05'));

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      zIndex: 9999,
      colors: ['#FF7000', '#0a0a0a', '#ffffff'], // আপনার ব্র্যান্ড কালার অনুযায়ী
    });
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Header Section */}
      <div className="bg-[#0a0a0a] py-16 text-center text-white">
        <h1 className="text-4xl font-bold">Car Listings</h1>
        <p className="mt-2 text-gray-400">Home / Listings / Car Listings</p>
      </div>

      {/* 2. Top Search Bar */}
      <div className="container mx-auto -mt-10 px-4 relative z-20">
        <div className="bg-white p-6 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-gray-100">
          {/* Pickup Location */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-500 block mb-2">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Enter City, Airport..."
                className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#FF7000] text-sm"
              />
            </div>
          </div>

          {/* Pickup Date & Time */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-500 block mb-2">
              Pickup Date
            </label>
            <div className="flex gap-2">
              <Flatpickr
                value={pickupDate}
                onChange={(dates) => {
                  setPickupDate(dates[0]);
                  fireConfetti();
                }}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#FF7000] focus:outline-none bg-white"
              />
              <Flatpickr
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'H:i',
                  time_24hr: true,
                }}
                defaultValue="11:00"
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#FF7000] focus:outline-none bg-white"
              />
            </div>
          </div>

          {/* Return Date & Time (এখানেও Flatpickr যোগ করা হয়েছে) */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-500 block mb-2">
              Return Date
            </label>
            <div className="flex gap-2">
              <Flatpickr
                value={returnDate}
                onChange={(dates) => {
                  setReturnDate(dates[0]);
                  fireConfetti();
                }}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#FF7000] focus:outline-none bg-white"
              />
              <Flatpickr
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'H:i',
                  time_24hr: true,
                }}
                defaultValue="11:00"
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#FF7000] focus:outline-none bg-white"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-[#FF7000] text-white py-2.5 rounded font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-md active:scale-95">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>

      {/* 3. Main Content Wrapper */}
      <main className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR SECTION */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold border-b pb-3 mb-4">
              What Are You Looking For
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 border rounded bg-gray-50"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {/* Filter Groups */}
            <div className="mt-6 space-y-6">
              {[
                {
                  title: 'Availability',
                  options: ['Instant Book', 'Featured'],
                },
                {
                  title: 'Car Brand',
                  options: [
                    'Tesla',
                    'Ford',
                    'Mercediz Benz',
                    'Audi',
                    'Kia',
                    'Toyota',
                  ],
                },
                {
                  title: 'Car Category',
                  options: ['SUV', 'Sedan', 'Luxury', 'Truck'],
                },
                {
                  title: 'Fuel Type',
                  options: ['Petrol', 'Diesel', 'Electric'],
                },
              ].map((filter, i) => (
                <div key={i}>
                  <button className="flex justify-between w-full font-bold text-sm mb-3">
                    {filter.title} <span>^</span>
                  </button>
                  <div className="space-y-2">
                    {filter.options.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                      >
                        <input type="checkbox" className="accent-[#FF7000]" />{' '}
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-[#008099] text-white py-3 rounded mt-8 font-bold text-sm hover:opacity-90">
              Filter results
            </button>
            <button className="w-full text-red-500 text-sm mt-4 font-semibold hover:underline">
              Reset Filter
            </button>
          </div>
        </aside>

        {/* MAIN LISTING SECTION */}
        <section className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 text-sm">Showing 1-9 of 154 Cars</p>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                Show:{' '}
                <select className="border p-1 rounded">
                  <option>9</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                Sort By:{' '}
                <select className="border p-1 rounded font-bold">
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid of Cars */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {carData.map((car, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm border overflow-hidden group"
              >
                {/* Image Section */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  {car.featured && (
                    <span className="absolute top-4 left-0 bg-red-600 text-white text-[10px] px-2 py-1 uppercase font-bold transform -rotate-45 -translate-x-2">
                      Featured
                    </span>
                  )}
                  <button className="absolute top-4 right-4 bg-white/80 p-1.5 rounded-full text-gray-500 hover:text-red-500">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 uppercase">
                      {car.brand}
                    </span>
                    <div className="flex items-center gap-1 text-[#FFB800] text-xs">
                      <Star className="w-3 h-3 fill-current" /> {car.rating} (
                      {car.reviews})
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-4">{car.name}</h3>

                  <div className="grid grid-cols-3 gap-y-3 gap-x-1 border-t pt-4 mb-4 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Settings className="w-3 h-3" /> {car.transmission}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3 h-3" /> {car.mileage}
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel className="w-3 h-3" /> {car.fuel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3 h-3" /> {car.power}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {car.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {car.capacity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t mt-4">
                    <div className="text-gray-400 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {car.location}
                    </div>
                    <div className="text-right">
                      <span className="text-[#FF7000] font-bold text-lg">
                        ${car.price}
                      </span>
                      <span className="text-gray-400 text-xs">/Day</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#1b1b1b] text-white py-3 rounded-lg mt-4 font-bold flex items-center justify-center gap-2 group-hover:bg-[#FF7000] transition-colors">
                    <Calendar className="w-4 h-4" /> Rent Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-2">
            <button className="p-3 border rounded hover:bg-gray-100">
              Prev
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-10 h-10 border rounded ${n === 2 ? 'bg-[#008099] text-white' : 'hover:bg-gray-100'}`}
              >
                {n}
              </button>
            ))}
            <button className="p-3 border rounded hover:bg-gray-100">
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

// Sample Data derived from PDF
const carData = [
  {
    name: 'Toyota Camry SE 350',
    brand: 'Toyota',
    rating: '4.0',
    reviews: '138',
    transmission: 'Auto',
    mileage: '10 KM',
    fuel: 'Petrol',
    power: 'Power',
    year: '2018',
    capacity: '5 Persons',
    location: 'Washington',
    price: '160',
    featured: true,
    img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=400',
  },
  {
    name: 'Kia Soul 2016',
    brand: 'Kia',
    rating: '4.0',
    reviews: '170',
    transmission: 'Auto',
    mileage: '22 KM',
    fuel: 'Petrol',
    power: 'Diesel',
    year: '2016',
    capacity: '5 Persons',
    location: 'Belgium',
    price: '80',
    featured: false,
    img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=400',
  },
  {
    name: 'Audi A3 2019 new',
    brand: 'Audi',
    rating: '4.0',
    reviews: '150',
    transmission: 'Manual',
    mileage: '10 KM',
    fuel: 'Petrol',
    power: 'Power',
    year: '2019',
    capacity: '4 Persons',
    location: 'Newyork, USA',
    price: '45',
    featured: false,
    img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=400',
  },
];

export default AllVehicles;
