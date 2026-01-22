import React, { useState } from 'react';
import {
  Plus,
  ChevronDown,
  MoreVertical,
  LayoutGrid,
  List,
  Eye,
  Edit3,
  Trash2,
} from 'lucide-react';
import Buttons from '../../common/Buttons';

const AllBookings = () => {
  const [activeFilter, setActiveFilter] = useState('All Bookings');

  const filters = [
    'All Bookings',
    'Upcoming',
    'Inprogress',
    'Completed',
    'Cancelled',
  ];

  // Data accurately mapped from screenshots
  const bookingsData = [
    {
      id: '#1001',
      name: 'Ferrari 458 MM Speciale',
      mode: 'Delivery',
      type: 'Hourly',
      pickup: '45, Avenue, Mark Street,',
      pickupLoc: 'USA 15 Sep 2023, 09:30 AM',
      dropoff: '21, Avenue, Windham,',
      dropoffLoc: 'USA 15 Sep 2023, 11:30 AM',
      bookedOn: '15 Sep 2023, 09:00 AM',
      total: '$300',
      status: 'Upcoming',
      statusClass: 'bg-gray-100 text-gray-600', // Based on "badge-light-secondary"
      img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=100',
    },
    {
      id: '#1002',
      name: 'Toyota Camry SE 350',
      mode: 'Self Pickup',
      type: 'Day',
      pickup: '1646 West St, Grand Rapids',
      pickupLoc: '18 Sep 2023, 09:00 AM',
      dropoff: '26 Platinum Drive, Canonsburg',
      dropoffLoc: '15 Sep 2023, 11:30 AM',
      bookedOn: '18 Sep 2023, 08:10 PM',
      total: '$500',
      status: 'Inprogress',
      statusClass: 'bg-orange-50 text-orange-600',
      img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=100',
    },
    {
      id: '#1003',
      name: 'Kia Soul 2016',
      mode: 'Delivery',
      type: 'Weekly',
      pickup: '14 Straford Park, Pittsburg',
      pickupLoc: '03 Oct 2023, 10:15 AM',
      dropoff: '11 Pleasant Hill, Pittsburg',
      dropoffLoc: '10 Oct 2023, 10:15 AM',
      bookedOn: '21 Sep 2023, 04:15 PM',
      total: '$600',
      status: 'Cancelled',
      statusClass: 'bg-red-50 text-red-500',
      img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=100',
    },
  ];

  return (
    <div className="w-full bg-gray-50/30 py-8 font-sans">
      <div className="mx-auto w-full md:w-11/12 lg:w-10/12">
        {/* Top Filters Control */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeFilter === filter
                    ? 'bg-[#117a8b] text-white shadow-md'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filter}{' '}
                {filter === 'All Bookings' && (
                  <span className="ml-1 opacity-70">40</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select className="bg-white border border-gray-200 px-4 py-2.5 rounded-lg text-sm font-bold text-gray-700 outline-none">
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 30 Days</option>
            </select>

            <select className="bg-white border border-gray-200 px-4 py-2.5 rounded-lg text-sm font-bold text-gray-700 outline-none">
              <option>Sort By Relevance</option>
            </select>

            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button className="p-2.5 bg-orange-100 text-orange-500">
                <LayoutGrid size={18} />
              </button>
              <button className="p-2.5 bg-white text-gray-400">
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Heading & Add Booking Button */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-[#040720]">All Bookings</h2>
            <span className="bg-gray-200 text-[#040720] px-2.5 py-0.5 rounded-full text-xs font-bold">
              40
            </span>
          </div>

          <Buttons
            type="solid"
            className="!py-2.5 !px-6 flex items-center gap-2 shadow-lg shadow-orange-200"
          >
            <Plus size={18} /> Add Booking
          </Buttons>
        </div>

        {/* Bookings Table with Horizontal Scroll */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
            <table className="w-full border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-5 text-left w-12">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 accent-[#117a8b]"
                    />
                  </th>
                  <th className="p-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Booking ID
                  </th>
                  <th className="p-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Car Name
                  </th>
                  <th className="p-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Rental Type
                  </th>
                  <th className="p-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Pickup / Delivery Location
                  </th>
                  <th className="p-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Dropoff Location
                  </th>
                  <th className="p-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Booked On
                  </th>
                  <th className="p-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Total
                  </th>
                  <th className="p-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="p-5 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookingsData.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="p-5">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 accent-[#117a8b]"
                      />
                    </td>
                    <td className="p-5 text-sm font-bold text-[#117a8b]">
                      {item.id}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.img}
                          className="w-12 h-12 rounded-lg object-cover"
                          alt="Booking"
                        />
                        <div>
                          <p className="font-bold text-[#040720] text-sm leading-tight hover:text-[#117a8b] cursor-pointer">
                            {item.name}
                          </p>
                          <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                            {item.mode}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">
                      {item.type}
                    </td>
                    <td className="p-5">
                      <p className="text-[13px] text-gray-700 font-medium">
                        {item.pickup}
                      </p>
                      <span className="text-[12px] text-gray-500 block">
                        {item.pickupLoc}
                      </span>
                    </td>
                    <td className="p-5">
                      <p className="text-[13px] text-gray-700 font-medium">
                        {item.dropoff}
                      </p>
                      <span className="text-[12px] text-gray-500 block">
                        {item.dropoffLoc}
                      </span>
                    </td>
                    <td className="p-5 text-[13px] text-gray-600 font-medium">
                      {item.bookedOn}
                    </td>
                    <td className="p-5 text-sm font-black text-[#040720]">
                      {item.total}
                    </td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1.5 rounded-md text-[11px] font-bold tracking-tight ${item.statusClass}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-5 text-center relative group">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical size={18} className="text-gray-400" />
                      </button>
                      {/* Detailed Dropdown from Screenshot */}
                      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden group-hover:flex flex-col bg-white shadow-xl border border-gray-100 rounded-xl z-10 w-32 py-2">
                        <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50">
                          <Eye size={14} /> View
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50">
                          <Edit3 size={14} /> Edit
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-50 flex justify-end items-center gap-4 bg-white">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-400 hover:bg-gray-50 transition-all">
              Prev
            </button>
            <button className="w-10 h-10 bg-[#117a8b] text-white rounded-lg text-sm font-bold shadow-lg shadow-teal-100">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
