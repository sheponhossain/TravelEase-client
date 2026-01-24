import React, { useState, useEffect, useContext } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../Routers/AuthProvider';

const BookingsAndTransactions = () => {
  const { user } = useContext(AuthContext);
  // const [selected, setSelected] = useState('last-30-days');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/my-bookings/${user.email}`
        );
        const data = await response.json();

        const latestFive = data.reverse().slice(0, 5);
        setBookings(latestFive);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user?.email]);

  const recentTransactions = [
    {
      name: 'Ferrari 458 MM Speciale',
      type: 'Hourly',
      date: 'On 15 Sep 2023, 11:30 PM',
      status: 'Upcoming',
      statusColor: 'text-blue-600 bg-blue-50',
      img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=100',
    },
    {
      name: 'Chevrolet Pick Truck 3.5L',
      type: 'Day',
      date: 'Yet to recieve',
      status: 'Refund started',
      statusColor: 'text-orange-500 bg-orange-50',
      img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=100',
    },
    {
      name: 'Toyota Tacoma 4WD',
      type: 'Weekly',
      date: 'On 15 Sep 2023, 11:30 PM',
      status: 'Cancelled',
      statusColor: 'text-red-500 bg-red-50',
      img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=100',
    },
  ];

  return (
    <div className="w-full bg-gray-50/30 py-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Last 5 Bookings Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#040720]">
              Last 5 Bookings
            </h3>
            <button
              onClick={() => navigate('/mybooking')}
              className="text-sm font-bold text-teal-600 hover:underline flex items-center gap-1"
            >
              View all Bookings <ArrowRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td className="p-10 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-4 flex items-center gap-4 min-w-[250px]">
                        <img
                          src={booking.vehicleImage}
                          className="w-14 h-14 rounded-lg object-cover"
                          alt={booking.vehicleName}
                        />
                        <div>
                          <p className="font-bold text-[#040720] text-sm">
                            {booking.vehicleName}
                          </p>
                          <p className="text-xs text-gray-400 font-medium">
                            Mode: {booking.deliveryMode}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">
                          Booking Schedule
                        </p>
                        <div className="flex flex-col">
                          <p className="text-xs font-bold text-gray-600">
                            {new Date(booking.pickupDate).toLocaleDateString(
                              'en-GB',
                              {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                          </p>
                          <p className="text-[10px] font-medium text-[#FF7000] mt-0.5">
                            Time: {booking.pickupTime}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">
                          Price
                        </p>
                        <p className="text-sm font-black text-red-500">
                          ${booking.price}
                        </p>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1.5 rounded-md text-[11px] font-bold 
                        ${booking.status === 'Upcoming' ? 'text-blue-600 bg-blue-50' : 'text-green-600 bg-green-50'}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transaction Section (Static) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-gray-50">
            <h3 className="text-xl font-bold text-[#040720]">
              Recent Transaction
            </h3>
          </div>
          <div className="p-4 space-y-4">
            {recentTransactions.map((tx, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={tx.img}
                      className="w-12 h-12 rounded-lg object-cover"
                      alt=""
                    />
                    <div>
                      <p className="font-bold text-[#040720] text-[13px]">
                        {tx.name}
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium">
                        Rent Type: {tx.type}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold ${tx.statusColor}`}
                  >
                    {tx.status}
                  </span>
                </div>
                <div className="bg-gray-50 p-2 rounded-md">
                  <p className="text-[11px] text-gray-500 font-bold">
                    Status: <span className="text-[#040720]">{tx.date}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsAndTransactions;
