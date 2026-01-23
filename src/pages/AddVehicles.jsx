import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import {
  Upload,
  Car,
  DollarSign,
  MapPin,
  FileText,
  User,
  ChevronLeft,
  CheckCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import Buttons from '../components/common/Buttons';
import Heading from '../Heading/Heading';

const AddVehicle = ({ userEmail, userName }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    vehicleName: '',
    ownerName: userName || '', // লগড ইন ইউজারের নাম অটো আসবে
    category: 'Sedan',
    pricePerDay: '',
    location: '',
    availability: 'Available',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('file', imageFile);
      data.append('upload_preset', 'your_preset');

      const vehicleData = {
        ...formData,
        userEmail: userEmail,
        coverImage: preview,
      };

      const response = await axios.post(
        'http://localhost:5000/api/vehicles',
        vehicleData
      );

      if (response.data) {
        toast.success('Vehicle added successfully!');
        setTimeout(() => navigate('/my-vehicles'), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <div className="bg-[#0a0a0a] pt-20 pb-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
          {/* <div className="absolute top-[-10%] left-1/4 w-96 h-96 bg-[#FF7000] rounded-full blur-[150px]"></div> */}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-0 p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-[#FF7000] transition-all text-white border border-white/10 group"
          >
            <ChevronLeft size={20} />
          </button>
          <Heading className="text-white">ADD VEHICLE</Heading>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 pb-20 relative z-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Image Upload Box */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 sticky top-24">
              <div className="relative group overflow-hidden rounded-[2rem] border-2 border-dashed border-gray-200 hover:border-[#FF7000] transition-all aspect-square flex flex-col items-center justify-center bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Upload
                      size={40}
                      className="mb-3 group-hover:text-[#FF7000]"
                    />
                    <span className="text-[10px] font-black uppercase">
                      Cover Photo
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  required
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vehicle Name */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Vehicle Name
                  </label>
                  <div className="relative">
                    <Car
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF7000]"
                      size={18}
                    />
                    <input
                      type="text"
                      name="vehicleName"
                      required
                      value={formData.vehicleName}
                      onChange={handleChange}
                      placeholder="Chevrolet Camaro"
                      className="w-full bg-gray-50 border-none focus:ring-2 ring-[#FF7000]/20 pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Owner Name (Auto-filled but editable) */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Owner Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF7000]"
                      size={18}
                    />
                    <input
                      type="text"
                      name="ownerName"
                      required
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border-none focus:ring-2 ring-[#FF7000]/20 pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Daily Price */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Daily Price ($)
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF7000]"
                      size={18}
                    />
                    <input
                      type="number"
                      name="pricePerDay"
                      required
                      value={formData.pricePerDay}
                      onChange={handleChange}
                      placeholder="350"
                      className="w-full bg-gray-50 border-none focus:ring-2 ring-[#FF7000]/20 pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none px-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none cursor-pointer appearance-none"
                    >
                      <option>Sedan</option>
                      <option>SUV</option>
                      <option>Luxury</option>
                      <option>Sports</option>
                    </select>
                    <ChevronLeft
                      className="absolute right-5 top-1/2 -translate-y-1/2 -rotate-90 text-gray-300 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF7000]"
                      size={18}
                    />
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Miami, FL"
                      className="w-full bg-gray-50 border-none focus:ring-2 ring-[#FF7000]/20 pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Availability Status
                  </label>
                  <div className="relative">
                    <CheckCircle
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF7000]"
                      size={18}
                    />
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none cursor-pointer appearance-none"
                    >
                      <option value="Available">Available Now</option>
                      <option value="Booked">Booked</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8 space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Car Description
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-5 top-6 text-[#FF7000]"
                    size={18}
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Briefly describe your vehicle..."
                    className="w-full bg-gray-50 border-none focus:ring-2 ring-[#FF7000]/20 pl-14 pr-6 py-5 rounded-2xl text-sm font-medium text-gray-600 outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <Buttons
                  type="solid"
                  disabled={loading}
                  className="flex-grow !py-5 text-xs font-black tracking-[0.2em] uppercase shadow-xl shadow-orange-500/20"
                >
                  {loading ? 'Registering...' : 'Confirm Registration'}
                </Buttons>
                <Buttons
                  type="outline"
                  onClick={() => navigate(-1)}
                  className="!py-5 px-10 text-xs font-black tracking-widest uppercase"
                >
                  Cancel
                </Buttons>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
