import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Star,
  Heart,
  MapPin,
  Calendar,
  Users,
  Settings2,
  Fuel,
  Gauge,
  CalendarDays,
  Trash2,
} from 'lucide-react';
import Buttons from '../../common/Buttons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../Routers/AuthProvider';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchWishlist = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/wishlist/${user.email}`
      );
      setWishlistItems(response.data);
      console.log(response);
    } catch (error) {
      console.error('Wishlist Fetch Error:', error);
      toast.error('Failed to load wishlist items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${id}`);
      setWishlistItems(wishlistItems.filter((item) => item._id !== id));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 font-bold text-gray-400">
        Loading Wishlist...
      </div>
    );

  return (
    <div className="w-full bg-gray-50/30 py-8 min-h-screen">
      <div className="mx-auto w-full md:w-11/12 lg:w-10/12">
        <h2 className="text-3xl font-black text-[#040720] mb-8 px-2">
          Wishlist ({wishlistItems.length})
        </h2>

        <div className="space-y-6">
          {wishlistItems.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-[2rem] p-4 md:p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500"
            >
              <div className="relative w-full md:w-80 h-52 flex-shrink-0 group overflow-hidden rounded-[1.8rem]">
                <img
                  src={car.image || car.img}
                  alt={car.vehicleName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl text-gray-400 hover:text-red-500 transition-all shadow-lg active:scale-90"
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex-grow flex flex-col py-2">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[#FF7000] font-black text-[10px] uppercase tracking-widest mb-1 block">
                      {car.category || 'Premium'}
                    </span>
                    <h3 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-tight">
                      {car.vehicleName || car.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 bg-[#F8F9FA] px-5 py-2.5 rounded-[20px] border border-gray-100">
                    <span className="text-[#D94343] font-bold text-2xl tracking-tighter">
                      ${car.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[#9CA3AF] text-xl font-light italic transform -rotate-12">
                        /
                      </span>
                      <span className="text-[#9CA3AF] font-black text-[11px] uppercase tracking-wider mt-1">
                        Day
                      </span>
                    </div>
                  </div>
                </div>

                {/* স্পেক্স বার */}
                <div className="flex flex-wrap items-center gap-6 mb-8 mt-2">
                  {/* ১. ট্রান্সমিশন (Manual/Auto) */}
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl">
                    <Settings2 size={14} className="text-[#3D707A]" />{' '}
                    {car.transmission ? car.transmission : 'Auto'}
                  </div>

                  {/* ২. ফুয়েল টাইপ (Petrol/Diesel/Electric) */}
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl">
                    <Fuel size={14} className="text-[#3D707A]" />{' '}
                    {car.fuel ? car.fuel : 'Petrol'}
                  </div>

                  {/* ৩. লোকেশন */}
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl">
                    <MapPin size={14} className="text-[#3D707A]" />{' '}
                    {car.location ? car.location : 'Spain'}
                  </div>
                </div>

                <div className="mt-auto flex justify-end">
                  <Buttons
                    type="solid"
                    onClick={() => navigate(`/VehicleDetails/${car.vehicleId}`)}
                    className="cursor-pointer"
                  >
                    <CalendarDays size={18} />
                    Book Now
                  </Buttons>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
