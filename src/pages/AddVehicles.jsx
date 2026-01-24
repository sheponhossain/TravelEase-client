import React, { useContext, useEffect, useState } from 'react';
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
  Zap,
  Users,
  Fuel,
  Settings,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import Buttons from '../components/common/Buttons';
import Heading from '../Heading/Heading';
import { AuthContext } from '../Routers/AuthProvider';

const AddVehicles = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    vehicleName: '',
    owner: user?.displayName || 'Anonymous',
    categories: 'Sedan',
    pricePerDay: '',
    location: '',
    availability: 'Available',
    description: '',
    userEmail: user?.email || '',
    category: 'Luxury',
    rating: 3,
    transmission: 'Manual',
    fuel: 'Petrol',
    capacity: '4 Persons',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        owner: user.displayName,
        userEmail: user.email,
      }));
    }
  }, [user]);

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
    if (!imageFile) return toast.error('Please select an image!');

    setLoading(true);

    try {
      const imgData = new FormData();
      imgData.append('image', imageFile);

      const IMGBB_API_KEY = 'c35f516f0410b5dcd13ebde2c666e10e';

      const imgResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        imgData
      );

      if (imgResponse.data.success) {
        const imageUrl = imgResponse.data.data.display_url;

        const vehicleData = {
          ...formData,
          userEmail: user?.email,
          pricePerDay: Number(formData.pricePerDay),
          coverImage: imageUrl,
          createdAt: new Date().toISOString(),
        };

        const response = await axios.post(
          'http://localhost:5000/api/vehicles',
          vehicleData
        );

        if (response.data) {
          toast.success('Awesome! Data saved with Image URL.');
          setTimeout(() => navigate('/myvehicles'), 2000);
        }
      }
    } catch (error) {
      console.error('Debug Details:', error.response?.data);
      const msg = error.response?.data?.error?.message || 'Check your API Key';
      toast.error(msg);
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
                      className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none"
                    />
                  </div>
                </div>

                {/* category (Luxury) */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Vehicle Class
                  </label>
                  <div className="relative">
                    <Zap
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF7000]"
                      size={18}
                    />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none appearance-none"
                    >
                      <option value="Luxury">Luxury</option>
                      <option value="Standard">Standard</option>
                      <option value="Economy">Economy</option>
                    </select>
                  </div>
                </div>

                {/* Transmission */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Transmission
                  </label>
                  <div className="relative">
                    <Settings
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF7000]"
                      size={18}
                    />
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none appearance-none"
                    >
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                </div>

                {/* Fuel */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Fuel Type
                  </label>
                  <div className="relative">
                    <Fuel
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF7000]"
                      size={18}
                    />
                    <select
                      name="fuel"
                      value={formData.fuel}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none appearance-none"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Capacity
                  </label>
                  <div className="relative">
                    <Users
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF7000]"
                      size={18}
                    />
                    <input
                      type="text"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      placeholder="4 Persons"
                      className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none"
                    />
                  </div>
                </div>

                {/* Price */}
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
                      className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none"
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
                      className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none"
                    />
                  </div>
                </div>

                {/* Availability */}
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

              {/* Description */}
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
                    className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-2xl text-sm font-medium text-gray-600 outline-none transition-all resize-none"
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
