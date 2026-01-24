import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { X, Upload, Loader2 } from 'lucide-react';
import { AuthContext } from '../../Routers/AuthProvider';

const AddVehicleModal = ({ isOpen, onClose, userEmail }) => {
  const { loading, setLoading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    vehicleName: '',
    ownerName: '',
    category: 'Sedan',
    pricePerDay: '',
    location: '',
    availability: 'Available',
    description: '',
  });
  const [coverImage, setCoverImage] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalData = {
        ...formData,
        coverImage: 'https://example.com/image.jpg',
        userEmail: userEmail,
      };

      const response = await axios.post(
        'http://localhost:5000/api/vehicles',
        finalData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success('Vehicle Added Successfully!');
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      toast.error('Failed to store data in MongoDB');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm p-4 transition-all duration-300">
      <Toaster />
      <div className="bg-white dark:bg-[#141414] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border dark:border-gray-800">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
          <h2 className="text-2xl font-bold text-[#040720] dark:text-white">
            Add New Vehicle
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[80vh] custom-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Vehicle Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Vehicle Name
              </label>
              <input
                type="text"
                name="vehicleName"
                required
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg p-3 outline-none focus:border-[#FF7000] transition-all"
                placeholder="e.g. Chevrolet Camaro"
              />
            </div>

            {/* Owner Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                required
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg p-3 outline-none focus:border-[#FF7000] transition-all"
                placeholder="e.g. John Doe"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Category
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg p-3 outline-none focus:border-[#FF7000] transition-all cursor-pointer"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Price Per Day ($)
              </label>
              <input
                type="number"
                name="pricePerDay"
                required
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg p-3 outline-none focus:border-[#FF7000] transition-all"
                placeholder="300"
              />
            </div>

            {/* Location */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Location
              </label>
              <input
                type="text"
                name="location"
                required
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg p-3 outline-none focus:border-[#FF7000] transition-all"
                placeholder="Miami St, Destin, FL"
              />
            </div>

            {/* Upload Image */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 block">
                Cover Image
              </label>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 dark:bg-[#1a1a1a] rounded-xl p-6 text-center hover:border-[#FF7000] dark:hover:border-[#FF7000] transition-colors cursor-pointer group">
                <input
                  type="file"
                  className="hidden"
                  id="img-upload"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
                <label htmlFor="img-upload" className="cursor-pointer block">
                  <Upload className="mx-auto mb-2 text-gray-400 group-hover:text-[#FF7000] transition-colors" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {coverImage
                      ? coverImage.name
                      : 'Click to upload cover image'}
                  </p>
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg p-3 outline-none focus:border-[#FF7000] transition-all"
                placeholder="Write details about the car..."
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 font-bold text-white bg-[#FF7000] rounded-xl hover:bg-[#e66500] shadow-lg shadow-orange-100 dark:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                </>
              ) : (
                'Add Vehicle'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;
