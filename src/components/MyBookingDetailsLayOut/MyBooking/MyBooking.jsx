import React, { useState, useEffect } from 'react';
import {
  Plus,
  LayoutGrid,
  Eye,
  Edit3,
  Trash2,
  MoreVertical,
  CalendarDays,
  Wallet,
  ArrowRightLeft,
  Heart,
} from 'lucide-react';
import Buttons from '../../common/Buttons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Bookings');
  const [openDropdown, setOpenDropdown] = useState(null); // ড্রপডাউন ট্র্যাক করার জন্য
  const navigate = useNavigate();

  // ১. ডাটা ফেচ করা
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/bookings');
      const data = await response.json();
      setBookings(data.reverse());
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ২. ডিলিট লজিক
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/${id}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          toast.success('Booking deleted successfully!');
          setBookings(bookings.filter((b) => b._id !== id));
        } else {
          toast.error('Failed to delete booking.');
        }
      } catch (error) {
        toast.error('Server error. Try again.');
      }
    }
    setOpenDropdown(null);
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeFilter === 'All Bookings') return true;
    return b.status?.toLowerCase() === activeFilter.toLowerCase();
  });

  // স্ট্যাটাস কার্ড লজিক...
  const totalBookings = bookings.length;
  const totalSpent = bookings.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0
  );

  const stats = [
    {
      title: 'My Bookings',
      value: totalBookings,
      icon: <CalendarDays />,
      color: 'bg-[#3D707A]',
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent}`,
      icon: <Wallet />,
      color: 'bg-[#F5A64B]',
    },
    {
      title: 'Transactions',
      value: totalBookings,
      icon: <ArrowRightLeft />,
      color: 'bg-[#6BC051]',
    },
    { title: 'Wishlist', value: '24', icon: <Heart />, color: 'bg-[#EF4444]' },
  ];

  return (
    <div className="w-full bg-gray-50/30 py-8 font-sans">
      <div className="mx-auto w-full md:w-11/12 lg:w-10/12">
        {/* Stats Cards (আগের মতই থাকবে) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center"
            >
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                  {item.title}
                </p>
                <h3 className="text-2xl font-black text-[#040720]">
                  {loading ? '...' : item.value}
                </h3>
              </div>
              <div
                className={`${item.color} text-white p-3 rounded-xl shadow-lg`}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Filters Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              'All Bookings',
              'Upcoming',
              'Inprogress',
              'Completed',
              'Cancelled',
            ].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeFilter === f ? 'bg-[#117a8b] text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <Buttons
            type="solid"
            className="!py-2 !px-6 flex items-center gap-2 shadow-lg shadow-orange-200"
          >
            <Plus size={18} /> Add Booking
          </Buttons>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[1200px]">
              <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase">
                <tr>
                  <th className="p-5 text-left">Booking ID</th>
                  <th className="p-5 text-left">Car Name</th>
                  <th className="p-5 text-left">Rental Type</th>
                  <th className="p-5 text-left">Location / Schedule</th>
                  <th className="p-5 text-left">Booked On</th>
                  <th className="p-5 text-left">Total</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="p-20 text-center text-gray-400">
                      Loading Data...
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-5 text-sm font-bold text-[#117a8b]">
                        #{item._id.slice(-4).toUpperCase()}
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.vehicleImage}
                            className="w-12 h-12 rounded-lg object-cover"
                            alt=""
                          />
                          <div>
                            <p className="font-bold text-[#040720] text-sm leading-tight">
                              {item.vehicleName}
                            </p>
                            <p className="text-[11px] text-gray-400 font-bold">
                              {item.deliveryMode}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-[13px] font-bold text-gray-600">
                        Hourly
                      </td>
                      <td className="p-5">
                        <p className="text-[12px] text-gray-700 font-bold leading-tight">
                          {item.location}
                        </p>
                        <p className="text-[11px] text-teal-600 font-black mt-1">
                          {new Date(item.pickupDate).toLocaleDateString(
                            'en-GB',
                            { day: '2-digit', month: 'short' }
                          )}{' '}
                          | {item.pickupTime}
                        </p>
                      </td>
                      <td className="p-5 text-[12px] text-gray-500 font-bold">
                        {new Date(
                          item.createdAt || Date.now()
                        ).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </td>
                      <td className="p-5 text-sm font-black text-[#040720]">
                        ${item.price}
                      </td>
                      <td className="p-5">
                        <span
                          className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-tighter
                        ${
                          item.status === 'Cancelled'
                            ? 'bg-red-50 text-red-500'
                            : item.status === 'Completed'
                              ? 'bg-green-50 text-green-600'
                              : item.status === 'Inprogress'
                                ? 'bg-orange-50 text-orange-500'
                                : 'bg-blue-50 text-blue-600'
                        }`}
                        >
                          {item.status || 'Upcoming'}
                        </span>
                      </td>

                      {/* অ্যাকশন বাটন লজিক */}
                      <td className="p-5 text-center relative">
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === item._id ? null : item._id
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <MoreVertical size={18} className="text-gray-400" />
                        </button>

                        {openDropdown === item._id && (
                          <div className="absolute right-12 top-10 w-40 bg-white border border-gray-100 shadow-xl rounded-xl z-50 py-2">
                            <button
                              onClick={() => {
                                console.log(
                                  'Navigating to Vehicle ID:',
                                  item.vehicleId
                                );
                                navigate(`/VehicleDetails/${item.vehicleId}`);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50"
                            >
                              <Eye size={14} className="text-teal-500" /> View
                              Details
                            </button>
                            <div className="h-[1px] bg-gray-50 my-1"></div>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
                            >
                              <Trash2 size={14} /> Delete Booking
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
