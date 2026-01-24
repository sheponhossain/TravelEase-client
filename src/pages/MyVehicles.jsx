import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { toast, Toaster } from 'react-hot-toast';
import {
  Trash2,
  Edit3,
  Eye,
  Car,
  MapPin,
  Plus,
  Heart,
  Star,
  Settings,
  Fuel,
  User,
} from 'lucide-react';
import Buttons from '../components/common/Buttons';
import Heading from '../Heading/Heading';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../Routers/AuthProvider';

const MyVehicles = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyVehicles = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/my-vehicles/${user.email}`
        );
        setVehicles(response.data);
      } catch (error) {
        console.error('Fetch Error:', error.response);
        toast.error('Failed to load vehicles from server');
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMyVehicles();
    }
  }, [user?.email]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="font-black text-sm text-[#1a1a1a] uppercase tracking-tight">
            Confirm Deletion?
          </p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await axios.delete(
                    `http://localhost:5000/api/vehicles/${id}`
                  );
                  setVehicles(vehicles.filter((v) => v._id !== id));
                  toast.success('Vehicle removed!');
                  // eslint-disable-next-line no-unused-vars
                } catch (err) {
                  toast.error('Delete failed!');
                }
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000, style: { borderRadius: '20px', padding: '16px' } }
    );
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setPreview(null);
    setImageFile(null);
    setSelectedVehicle(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <div className="bg-[#0a0a0a] pt-24 pb-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-1/3 w-[500px] h-[500px] bg-[#FF7000] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <Heading className="text-white">MY GARAGE</Heading>
          <span className="text-white/30 text-[9px] font-bold uppercase tracking-[0.3em] mt-4">
            User: {user?.email}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-14 relative z-20 pb-20">
        {/* Header Stats */}
        <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-black/5 border border-gray-100 mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 ml-4">
            <div className="bg-orange-50 p-3 rounded-2xl">
              <Car className="text-[#FF7000]" size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Total Assets
              </p>
              <h4 className="text-xl font-black text-[#1a1a1a] ">
                {vehicles.length} Units Listed
              </h4>
            </div>
          </div>
          <Buttons
            onClick={() => navigate('/addvehicle')}
            type="solid"
            className="!rounded-2xl !py-4 cursor-pointer text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20"
          >
            <Plus size={16} /> Add New Vehicle
          </Buttons>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-20 text-center uppercase text-[10px] font-black text-gray-400 tracking-widest animate-pulse">
            Checking your assets...
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence>
              {vehicles.map((car) => (
                <motion.div
                  key={car._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 border border-gray-50 overflow-hidden transition-all duration-500 flex flex-col h-full"
                >
                  {/* Image Section */}
                  <div className="relative h-56 group overflow-hidden">
                    <img
                      src={car.coverImage}
                      alt={car.vehicleName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <span
                      className={`absolute top-5 left-5 text-white text-[9px] px-3 py-1.5 rounded-full uppercase font-black tracking-widest shadow-lg ${car.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                      {car.availability}
                    </span>
                    <button className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-gray-400 hover:text-red-500 transition-all shadow-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content Section */}
                  <div className="p-7 flex flex-col flex-grow text-left">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#FF7000] font-black text-[10px] uppercase tracking-widest">
                        {car.category || car.categories}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full text-[#FFB800] text-[10px] font-black">
                        <Star size={12} className="fill-[#FFB800]" />{' '}
                        {car.rating || 3}
                      </div>
                    </div>
                    <h3 className="font-black text-[#1a1a1a] text-xl mb-6 tracking-tight truncate">
                      {car.vehicleName}
                    </h3>
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      <div className="flex flex-col items-center justify-center bg-[#F8F9FA] border border-gray-100/50 p-3.5 rounded-[1.5rem] hover:bg-white hover:shadow-md transition-all duration-300">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                          <Settings size={16} className="text-blue-500" />
                        </div>
                        <span className="text-[11px] font-[1000] text-[#1a1a1a] mt-0.5 uppercase">
                          {car.transmission || 'N/A'}
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center bg-[#F8F9FA] border border-gray-100/50 p-3.5 rounded-[1.5rem] hover:bg-white hover:shadow-md transition-all duration-300">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mb-2">
                          <Fuel size={16} className="text-[#FF7000]" />
                        </div>
                        <span className="text-[11px] font-[1000] text-[#1a1a1a] mt-0.5 uppercase">
                          {car.fuel || 'N/A'}
                        </span>
                      </div>

                      {/* Capacity */}
                      <div className="flex flex-col items-center justify-center bg-[#F8F9FA] border border-gray-100/50 p-3.5 rounded-[1.5rem] hover:bg-white hover:shadow-md transition-all duration-300">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mb-2">
                          <User size={16} className="text-green-600" />
                        </div>
                        <span className="text-[11px] font-[1000] text-[#1a1a1a] mt-0.5 uppercase">
                          {car.capacity?.split(' ')[0] || '4'} Persons
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
                            ${car.pricePerDay}
                          </span>
                          <span className="text-gray-400 font-bold text-xs">
                            /day
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/VehicleDetails/${car._id}`)}
                          className="bg-blue-50 text-blue-500 p-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all group/eye"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedVehicle(car);
                            setIsEditModalOpen(true);
                          }}
                          className="bg-orange-50 text-[#FF7000] p-3 rounded-xl hover:bg-[#FF7000] hover:text-white transition-all"
                          title="Edit"
                        >
                          <Edit3 size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(car._id)}
                          className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      {isEditModalOpen && selectedVehicle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a0a0a]/70 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md">
              <div>
                <h2 className="text-xl font-[1000] text-[#1a1a1a] uppercase tracking-tight">
                  Update Vehicle
                </h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Modify your asset details
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-red-50 text-red-400 rounded-full transition-colors"
              >
                <Plus className="rotate-45" size={24} />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  let finalImageUrl = selectedVehicle.coverImage;

                  if (imageFile) {
                    const imgData = new FormData();
                    imgData.append('image', imageFile);
                    const IMGBB_API_KEY = 'YOUR_REAL_API_KEY';
                    const imgRes = await axios.post(
                      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                      imgData
                    );
                    finalImageUrl = imgRes.data.data.display_url;
                  }

                  const updatedVehicle = {
                    ...selectedVehicle,
                    coverImage: finalImageUrl,
                  };

                  await axios.put(
                    `http://localhost:5000/api/vehicles/${selectedVehicle._id}`,
                    updatedVehicle
                  );

                  setVehicles(
                    vehicles.map((v) =>
                      v._id === selectedVehicle._id ? updatedVehicle : v
                    )
                  );

                  toast.success('Updated successfully!');
                  setIsEditModalOpen(false);
                  setImageFile(null);
                } catch (err) {
                  console.error(err);
                  toast.error('Update failed! Check console or API Key.');
                } finally {
                  setLoading(false);
                }
              }}
              className="p-8 space-y-6"
            >
              <div className="flex flex-col items-center gap-4 py-4 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-inner bg-white">
                  <img
                    src={preview || selectedVehicle.coverImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white text-[10px] font-bold uppercase">
                    Change Image
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setImageFile(file);
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                </div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Click photo to upload new
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Vehicle Name
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedVehicle.vehicleName}
                    onChange={(e) =>
                      setSelectedVehicle({
                        ...selectedVehicle,
                        vehicleName: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none ring-[#FF7000]/20 focus:ring-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Category
                  </label>
                  <select
                    value={selectedVehicle.categories}
                    onChange={(e) =>
                      setSelectedVehicle({
                        ...selectedVehicle,
                        categories: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none appearance-none cursor-pointer"
                  >
                    <option value="Electric">Electric</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Van">Van</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Price Per Day ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={selectedVehicle.pricePerDay}
                    onChange={(e) =>
                      setSelectedVehicle({
                        ...selectedVehicle,
                        pricePerDay: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedVehicle.location}
                    onChange={(e) =>
                      setSelectedVehicle({
                        ...selectedVehicle,
                        location: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl text-sm font-black text-[#1a1a1a] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={selectedVehicle.description}
                  onChange={(e) =>
                    setSelectedVehicle({
                      ...selectedVehicle,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-gray-50 border-none p-4 rounded-2xl text-sm font-medium text-gray-600 outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 sticky bottom-0 bg-white">
                <Buttons
                  type="solid"
                  disabled={loading}
                  className="flex-grow !py-5 font-black uppercase text-xs tracking-[0.2em]"
                >
                  {loading ? 'Uploading & Saving...' : 'Update Records'}
                </Buttons>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false), closeModal();
                  }}
                  className="px-8 py-5 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase text-xs tracking-[0.2em]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
