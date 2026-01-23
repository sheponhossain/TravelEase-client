import React, { useState, useEffect } from 'react';
import {
  Car,
  DollarSign,
  ChevronLeft,
  Save,
  Trash2,
  Image as ImageIcon,
  Info,
  Zap,
  ShieldCheck,
  Camera,
} from 'lucide-react';

import { toast, Toaster } from 'react-hot-toast';
import Buttons from '../common/Buttons';

const UpdateVehicle = ({ existingData, onCancel, onUpdate }) => {
  // ১. Prefilled State setup
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Premium',
    transmission: 'Auto',
    fuel: 'Petrol',
    status: 'Available',
    description: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (existingData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: existingData.name || '',
        price: existingData.price || '',
        category: existingData.category || 'Premium',
        transmission: existingData.transmission || 'Auto',
        fuel: existingData.fuel || 'Petrol',
        status: existingData.status || 'Available',
        description: existingData.description || '',
      });
      setPreview(existingData.img); // আগের ইমেজ প্রিভিউ সেট করা
    }
  }, [existingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  // ২. Save & Toast Logic
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    // সিমুলেশন: সাকসেস হলে টোস্ট দেখাবে
    if (!formData.name || !formData.price) {
      toast.error('Please fill in the required fields!');
      return;
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)), // API call simulation
      {
        loading: 'Updating vehicle data...',
        success: <b>Vehicle updated successfully!</b>,
        error: <b>Could not update vehicle.</b>,
      },
      {
        style: {
          borderRadius: '15px',
          background: '#1a1a1a',
          color: '#fff',
          fontWeight: 'bold',
        },
      }
    );

    // After success, pass the data back to parent if needed
    setTimeout(() => {
      if (onUpdate) onUpdate(formData);
    }, 2000);
  };

  return (
    <div className="w-full bg-[#FAFAFB] min-h-screen py-10">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="mx-auto w-full md:w-11/12 lg:w-9/12 px-4">
        {/* Top Navigation & Actions */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <button
              onClick={onCancel}
              className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all group"
            >
              <ChevronLeft
                size={20}
                className="text-gray-600 group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div>
              <h2 className="text-3xl font-black text-[#040720]">
                Edit Vehicle
              </h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter">
                Inventory / {formData.name || 'Update'}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-red-50 text-red-500 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-red-100 transition-colors">
            <Trash2 size={18} /> Delete
          </button>
        </div>

        <form
          onSubmit={handleUpdateSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* Left Side: Image Upload & Status (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
              <p className="text-xs font-black text-gray-400 mb-5 uppercase tracking-widest text-center">
                Vehicle Image
              </p>

              <div className="relative group overflow-hidden rounded-3xl border-4 border-gray-50 aspect-square">
                <img
                  src={
                    preview ||
                    'https://via.placeholder.com/400x400?text=Upload+Image'
                  }
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Car Preview"
                />
                <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                  <Camera size={32} className="mb-2" />
                  <span className="text-sm font-bold">Change Image</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-sm font-bold text-gray-500">
                    Inventory Status
                  </span>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="bg-transparent text-sm font-black text-emerald-600 outline-none cursor-pointer"
                  >
                    <option value="Available">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-[2.5rem] text-white">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-orange-400" size={24} />
                <h4 className="font-bold">Trust Badge</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Modifying technical specs will trigger a re-verification of the
                vehicle listing.
              </p>
            </div>
          </div>

          {/* Right Side: Form Details (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                <h3 className="text-xl font-black text-[#040720]">
                  General Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Vehicle Model Name
                  </label>
                  <div className="relative">
                    <Car
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ferrari 458 Italia"
                      className="w-full bg-gray-50 border border-gray-100 pl-14 pr-5 py-4 rounded-2xl text-[15px] font-black text-[#040720] focus:ring-4 ring-orange-500/5 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Daily Rental Price ($)
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="999"
                      className="w-full bg-gray-50 border border-gray-100 pl-14 pr-5 py-4 rounded-2xl text-[15px] font-black text-[#040720] focus:ring-4 ring-orange-500/5 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-100 px-5 py-4 rounded-2xl text-sm font-black text-[#040720] outline-none"
                  >
                    <option value="Premium">Premium</option>
                    <option value="Suv">SUV</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Transmission
                  </label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-100 px-5 py-4 rounded-2xl text-sm font-black text-[#040720] outline-none"
                  >
                    <option value="Auto">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Fuel
                  </label>
                  <select
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-100 px-5 py-4 rounded-2xl text-sm font-black text-[#040720] outline-none"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Electric">Electric</option>
                    <option value="Octane">Octane</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 mb-10">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">
                  Detailed Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your vehicle features, condition..."
                  className="w-full bg-gray-50 border border-gray-100 px-6 py-5 rounded-[2rem] text-sm font-medium text-gray-700 focus:ring-4 ring-orange-500/5 outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Buttons
                  type="solid"
                  className="flex-grow !py-5 font-black rounded-2xl shadow-xl shadow-gray-200 !bg-[#1a1a1a] flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
                >
                  <Save size={20} /> Save Changes
                </Buttons>
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-10 py-5 border-2 border-gray-100 rounded-2xl font-black text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all uppercase text-xs tracking-widest"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVehicle;
