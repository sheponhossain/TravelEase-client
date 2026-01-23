import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast, Toaster } from 'react-hot-toast';
import { Trash2, Edit3, Eye, Car, MapPin, DollarSign } from 'lucide-react';
import Buttons from '../components/common/Buttons';

const MyVehicles = ({ userEmail }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ১. লগইন করা ইউজারের ডাটা ফেচ করা
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

  // ২. ডিলিট লজিক (কনফার্মেশন টোস্ট সহ)
  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-bold text-[#1a1a1a]">
            Are you sure you want to delete this?
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
                  toast.success('Vehicle deleted successfully!');
                } catch (err) {
                  toast.error('Delete failed!');
                }
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-100 px-4 py-2 rounded-lg text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  //   if (loading)
  //     return (
  //       <div className="text-center py-20 font-black text-gray-400">
  //         Loading your garage...
  //       </div>
  //     );

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-6">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-[1000] text-[#040720] tracking-tight">
              My Vehicles
            </h2>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.3em] mt-2">
              Manage your listed cars
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-sm font-black text-[#1a1a1a]">
              Total: {vehicles.length} Units
            </span>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
            >
              {/* Image Section */}
              <div className="relative h-52 w-full bg-gray-50 rounded-[2rem] overflow-hidden mb-6">
                <img
                  src={
                    vehicle.coverImage || 'https://via.placeholder.com/400x300'
                  }
                  alt={vehicle.vehicleName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                  {vehicle.category}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-[#1a1a1a] truncate">
                  {vehicle.vehicleName}
                </h3>

                <div className="flex items-center justify-between text-gray-500 font-bold text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#FF7000]" />
                    <span>{vehicle.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#1a1a1a]">
                    <DollarSign size={16} />
                    <span className="text-lg font-black">
                      {vehicle.pricePerDay}
                    </span>
                    <span className="text-[10px] uppercase text-gray-400">
                      / day
                    </span>
                  </div>
                </div>

                <hr className="border-gray-50" />

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => navigate(`/vehicle-details/${vehicle._id}`)}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl transition-colors flex justify-center text-gray-600"
                    title="View Details"
                  >
                    <Eye size={20} />
                  </button>

                  <button
                    onClick={() => navigate(`/update-vehicle/${vehicle._id}`)}
                    className="flex-1 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 p-4 rounded-2xl transition-colors flex justify-center text-gray-600"
                    title="Edit"
                  >
                    <Edit3 size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="flex-1 bg-red-50 hover:bg-red-500 hover:text-white p-4 rounded-2xl transition-all flex justify-center text-red-500"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {vehicles.length === 0 && (
            <div className="col-span-full py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center">
              <Car size={64} className="text-gray-100 mb-4" />
              <p className="text-gray-400 font-bold">
                You haven't added any vehicles yet.
              </p>
              <Buttons
                onClick={() => navigate('/add-vehicle')}
                type="solid"
                className="mt-6 !bg-[#1a1a1a] px-8 rounded-xl"
              >
                Add Your First Car
              </Buttons>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyVehicles;
