import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast, Toaster } from 'react-hot-toast';
import {
  Trash2,
  Edit3,
  Eye,
  Car,
  MapPin,
  DollarSign,
  Plus,
} from 'lucide-react';
import Buttons from '../components/common/Buttons';
import Heading from '../Heading/Heading'; // আপনার হেডিং ইম্পোর্ট করুন

const MyVehicles = ({ userEmail }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyVehicles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/my-vehicles/${userEmail}`
        );
        setVehicles(response.data);
      } catch (error) {
        toast.error('Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    };
    if (userEmail) fetchMyVehicles();
  }, [userEmail]);

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

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Toaster position="top-right" />

      {/* 1. Hero Section - ছবির মতো ডার্ক থিম */}
      <div className="bg-[#0a0a0a] pt-24 pb-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        {/* অরেঞ্জ গ্লো ইফেক্ট */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-1/3 w-[500px] h-[500px] bg-[#FF7000] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <Heading className="text-white">MY GARAGE</Heading>
          {/* <p className="text-gray-500 font-[1000] uppercase text-[10px] tracking-[0.5em] mt-6 flex items-center gap-3">
            Dashboard{' '}
            <span className="w-1.5 h-1.5 bg-[#FF7000] rounded-full shadow-[0_0_8px_#FF7000]"></span>
            Manage{' '}
            <span className="w-1.5 h-1.5 bg-[#FF7000] rounded-full shadow-[0_0_8px_#FF7000]"></span>
            Inventory
          </p> */}
        </div>
      </div>

      {/* 2. Content Section - ফ্লোটিং স্টাইল */}
      <div className="max-w-7xl mx-auto px-6 -mt-14 relative z-20 pb-20">
        {/* Summary Bar */}
        <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-black/5 border border-gray-100 mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 ml-4">
            <div className="bg-orange-50 p-3 rounded-2xl">
              <Car className="text-[#FF7000]" size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Total Assets
              </p>
              <h4 className="text-xl font-black text-[#1a1a1a]">
                {vehicles.length} Units Listed
              </h4>
            </div>
          </div>
          <Buttons
            onClick={() => navigate('/add-vehicle')}
            type="solid"
            className="!rounded-2xl !py-4 !px-8 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 flex items-center gap-2"
          >
            <Plus size={16} /> Add New Vehicle
          </Buttons>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white rounded-[2.5rem] p-7 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 group"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full bg-gray-50 rounded-[2rem] overflow-hidden mb-8">
                <img
                  src={
                    vehicle.coverImage || 'https://via.placeholder.com/400x300'
                  }
                  alt={vehicle.vehicleName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5 bg-[#1a1a1a]/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em]">
                  {vehicle.category}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-[1000] text-[#1a1a1a] uppercase tracking-tight truncate">
                    {vehicle.vehicleName}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin size={14} className="text-[#FF7000]" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {vehicle.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-5 border-y border-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Daily Rate
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-[1000] text-[#1a1a1a]">
                      ${vehicle.pricePerDay}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      /Day
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => navigate(`/vehicle-details/${vehicle._id}`)}
                    className="flex-1 bg-gray-50 hover:bg-[#1a1a1a] hover:text-white p-4 rounded-2xl transition-all duration-300 flex justify-center text-gray-400"
                    title="View"
                  >
                    <Eye size={20} />
                  </button>

                  <button
                    onClick={() => navigate(`/update-vehicle/${vehicle._id}`)}
                    className="flex-1 bg-gray-50 hover:bg-orange-50 hover:text-[#FF7000] p-4 rounded-2xl transition-all duration-300 flex justify-center text-gray-400"
                    title="Edit"
                  >
                    <Edit3 size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="flex-1 bg-red-50 hover:bg-red-500 hover:text-white p-4 rounded-2xl transition-all duration-300 flex justify-center text-red-500"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {vehicles.length === 0 && !loading && (
            <div className="col-span-full py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Car size={40} className="text-gray-200" />
              </div>
              <p className="text-gray-400 font-[1000] uppercase tracking-widest text-sm">
                Your garage is empty
              </p>
              <Buttons
                onClick={() => navigate('/add-vehicle')}
                type="solid"
                className="mt-8 !px-10 rounded-2xl shadow-xl shadow-orange-500/10"
              >
                Add Your First Vehicle
              </Buttons>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyVehicles;
