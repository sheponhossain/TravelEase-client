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
} from 'lucide-react';
import { useNavigate } from 'react-router';
import Buttons from '../components/common/Buttons';

const AddVehicle = ({ userEmail }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicleName: '',
    ownerName: '',
    category: 'Sedan',
    pricePerDay: '',
    location: '',
    availability: 'Available',
    description: '',
  });
  // eslint-disable-next-line no-unused-vars
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ইমেজ আপলোড লজিক এখানে হবে
      const finalData = {
        ...formData,
        coverImage: 'https://example.com/image.jpg', // Placeholder URL
        userEmail: userEmail,
      };

      const response = await axios.post(
        'http://localhost:5000/api/vehicles',
        finalData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success('Vehicle Added Successfully!', {
          style: { background: '#1a1a1a', color: '#fff', borderRadius: '15px' },
        });
        setTimeout(() => navigate('/dashboard'), 2000);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Failed to store data in MongoDB');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10">
      <Toaster position="top-right" />

      <div className="mx-auto w-full md:w-11/12 lg:w-8/12 px-4">
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white rounded-2xl shadow-sm hover:bg-gray-50 transition-all border border-gray-100"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-[#040720] ">
              Add New Vehicle
            </h2>
            <p className="text-sm font-light text-gray-400 uppercase tracking-widest mt-1">
              Fill in the details to list your car
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* বাম পাশ: ইমেজ আপলোড (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 block text-center">
                Vehicle Cover Image
              </label>

              <div className="relative group overflow-hidden rounded-[2rem] border-2 border-dashed border-gray-200 hover:border-[#FF7000] transition-all aspect-square flex flex-col items-center justify-center bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    alt="Preview"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Upload
                      size={40}
                      className="mb-3 group-hover:text-[#FF7000] transition-colors"
                    />
                    <span className="text-[10px] font-black uppercase">
                      Upload Photo
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>

              <p className="text-[10px] text-gray-400 mt-4 text-center font-bold leading-relaxed">
                * Upload high quality PNG or JPG for better visibility.
              </p>
            </div>
          </div>

          {/* ডান পাশ: ফর্ম ডিটেইলস (8 Columns) */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
              {/* General Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Vehicle Name
                  </label>
                  <div className="relative">
                    <Car
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="vehicleName"
                      required
                      onChange={handleChange}
                      placeholder="e.g. Chevrolet Camaro"
                      className="w-full bg-gray-50 border border-transparent focus:border-[#FF7000]/20 focus:ring-4 ring-[#FF7000]/5 pl-14 pr-5 py-4 rounded-2xl text-[15px] font-black text-[#040720] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Owner Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="ownerName"
                      required
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-gray-50 border border-transparent focus:border-[#FF7000]/20 focus:ring-4 ring-[#FF7000]/5 pl-14 pr-5 py-4 rounded-2xl text-[15px] font-black text-[#040720] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Price & Category Grid */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Category
                  </label>
                  <select
                    name="category"
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none px-5 py-4 rounded-2xl text-sm font-black text-[#040720] outline-none appearance-none cursor-pointer"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Truck">Truck</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">
                    Daily Price ($)
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="number"
                      name="pricePerDay"
                      required
                      onChange={handleChange}
                      placeholder="300"
                      className="w-full bg-gray-50 border border-transparent focus:border-[#FF7000]/20 focus:ring-4 ring-[#FF7000]/5 pl-14 pr-5 py-4 rounded-2xl text-[15px] font-black text-[#040720] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="location"
                    required
                    onChange={handleChange}
                    placeholder="Miami St, Destin, FL"
                    className="w-full bg-gray-50 border border-transparent focus:border-[#FF7000]/20 focus:ring-4 ring-[#FF7000]/5 pl-14 pr-5 py-4 rounded-2xl text-[15px] font-black text-[#040720] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">
                  Description
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-5 top-6 text-gray-400"
                    size={18}
                  />
                  <textarea
                    name="description"
                    rows="4"
                    onChange={handleChange}
                    placeholder="Write details about the car features, condition..."
                    className="w-full bg-gray-50 border border-transparent focus:border-[#FF7000]/20 focus:ring-4 ring-[#FF7000]/5 pl-14 pr-5 py-4 rounded-2xl text-[15px] font-medium text-gray-600 outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Buttons
                  type="solid"
                  className="flex-grow cursor-pointer font-black rounded-2xl shadow-xl shadow-orange-100 flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing...' : 'Register Vehicle'}
                </Buttons>
                <Buttons
                  type="outline"
                  onClick={() => navigate(-1)}
                  className="cursor-pointer "
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
