import React, { useState, useEffect } from 'react';
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
  Tags,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import Buttons from '../components/common/Buttons';
import Heading from '../Heading/Heading';

const AddVehicles = ({ userEmail }) => {
  const staticEmail = 'shepon@gmail.com';
  const userName = 'Shepon';

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    vehicleName: '',
    owner: userName,
    categories: 'Sedan',
    pricePerDay: '',
    location: '',
    availability: 'Available',
    description: '',
    userEmail: staticEmail,
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

    if (!imageFile) return toast.error('Please upload a cover image!');

    setLoading(true);

    try {
      const vehicleData = {
        vehicleName: formData.vehicleName,
        owner: formData.owner,
        categories: formData.categories,
        pricePerDay: Number(formData.pricePerDay),
        location: formData.location,
        availability: formData.availability,
        description: formData.description,
        coverImage: preview,
        userEmail: staticEmail,
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(
        'http://localhost:5000/api/vehicles',
        vehicleData
      );

      if (response.data) {
        toast.success('Vehicle registered successfully!');
        setTimeout(() => navigate('/myvehicles'), 2000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Server Error! Check Port 5000'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-left">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <div className="bg-[#0a0a0a] pt-20 pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-0 p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/20 hover:bg-[#FF4500] transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <Heading className="text-white">ADD VEHICLE</Heading>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-white/60 text-[11px] font-medium tracking-wider uppercase">
              Registering with:{' '}
              <span className="text-white">{staticEmail}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 pb-20 relative z-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Image Upload Area */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-24">
              <div className="relative group overflow-hidden rounded-[2rem] border-2 border-dashed border-gray-200 hover:border-[#FF7000] aspect-square flex flex-col items-center justify-center bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Upload size={40} className="mb-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Upload Cover Image
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

          {/* Form Fields Area */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      placeholder="Tesla Model 3"
                      className="w-full bg-gray-50 border-none focus:ring-2 ring-[#FF7000]/20 pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none"
                    />
                  </div>
                </div>

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
                      name="owner"
                      required
                      value={formData.owner}
                      onChange={handleChange}
                      placeholder="Owner Name"
                      className="w-full bg-gray-50 border-none focus:ring-2 ring-[#FF7000]/20 pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Main Category
                  </label>
                  <div className="relative">
                    <Tags
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF7000]"
                      size={18}
                    />
                    <select
                      name="categories"
                      value={formData.categories}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none appearance-none cursor-pointer"
                    >
                      <option value="Electric">Electric</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Price Per Day ($)
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
                      placeholder="70"
                      className="w-full bg-gray-50 border-none focus:ring-2 ring-[#FF7000]/20 pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none"
                    />
                  </div>
                </div>

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
                      placeholder="Dhaka, Bangladesh"
                      className="w-full bg-gray-50 border-none focus:ring-2 ring-[#FF7000]/20 pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Availability
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
                      className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none appearance-none cursor-pointer"
                    >
                      <option value="Available">Available</option>
                      <option value="Booked">Booked</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Description
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
                    placeholder="Comfortable 5-seater with A/C..."
                    className="w-full bg-gray-50 border-none focus:ring-2 ring-[#FF7000]/20 pl-14 pr-6 py-5 rounded-2xl text-sm font-medium text-gray-600 outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <Buttons
                  type="solid"
                  disabled={loading}
                  className="flex-grow !py-5 text-xs font-black uppercase tracking-widest"
                >
                  {loading ? 'Processing...' : 'Confirm Registration'}
                </Buttons>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicles;
