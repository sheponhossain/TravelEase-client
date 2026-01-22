import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const BookingsAndTransactions = () => {
  const lastBookings = [
    {
      id: 1,
      name: 'Ferrari 458 MM Speciale',
      type: 'Hourly',
      start: '15 Sep 2023, 11:30 PM',
      end: '15 Sep 2023, 1:30 PM',
      price: '$200',
      status: 'Upcoming',
      statusColor: 'text-blue-600 bg-blue-50',
      img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=100',
    },
    {
      id: 2,
      name: 'Kia Soul 2016',
      type: 'Hourly',
      start: '15 Sep 2023, 09:00 AM',
      end: '15 Sep 2023, 1:30 PM',
      price: '$300',
      status: 'Upcoming',
      statusColor: 'text-blue-600 bg-blue-50',
      img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=100',
    },
    {
      id: 3,
      name: 'Toyota Camry SE 350',
      type: 'Day',
      start: '18 Sep 2023, 09:00 AM',
      end: '18 Sep 2023, 05:00 PM',
      price: '$600',
      status: 'Inprogress',
      statusColor: 'text-orange-600 bg-orange-50',
      img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=100',
    },
    {
      id: 4,
      name: 'Audi A3 2019 new',
      type: 'Weekly',
      start: '10 Oct 2023, 10:30 AM',
      end: '16 Oct 2023, 10:30 AM',
      price: '$800',
      status: 'Completed',
      statusColor: 'text-green-600 bg-green-50',
      img: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=100',
    },
    {
      id: 5,
      name: '2018 Chevrolet Camaro',
      type: 'Hourly',
      start: '14 Nov 2023, 02:00 PM',
      end: '14 Nov 2023, 04:00 PM',
      price: '$240',
      status: 'Completed',
      statusColor: 'text-green-600 bg-green-50',
      img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=100',
    },
  ];

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
        {/* Last 5 Bookings Section - 2/3 Width */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#040720]">
              Last 5 Bookings
            </h3>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600 border border-gray-100">
                Last 30 Days <ChevronDown size={16} />
              </button>
              <a
                href="#"
                className="text-sm font-bold text-teal-600 hover:underline"
              >
                View all Bookings
              </a>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-50">
                {lastBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 flex items-center gap-4 min-w-[250px]">
                      <img
                        src={booking.img}
                        className="w-14 h-14 rounded-lg object-cover"
                        alt=""
                      />
                      <div>
                        <p className="font-bold text-[#040720] text-sm">
                          {booking.name}
                        </p>
                        <p className="text-xs text-gray-400 font-medium">
                          Rent Type : {booking.type}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">
                        Start date
                      </p>
                      <p className="text-xs font-bold text-gray-600">
                        {booking.start}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">
                        End Date
                      </p>
                      <p className="text-xs font-bold text-gray-600">
                        {booking.end}
                      </p>
                    </td>
                    <td className="p-4 text-center">
                      <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">
                        Price
                      </p>
                      <p className="text-sm font-black text-red-500">
                        {booking.price}
                      </p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1.5 rounded-md text-[11px] font-bold ${booking.statusColor}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transaction Section - 1/3 Width */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#040720]">
              Recent Transaction
            </h3>
            <button className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-600 border border-gray-100">
              Last 30 Days <ChevronDown size={16} />
            </button>
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
                        Rent Type : {tx.type}
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
                    Status : <span className="text-[#040720]">{tx.date}</span>
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
