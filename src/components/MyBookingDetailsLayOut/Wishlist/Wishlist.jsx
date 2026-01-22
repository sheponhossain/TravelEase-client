import React from 'react';
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
} from 'lucide-react';
import Buttons from '../../common/Buttons';

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: 'BMW 640 XI Gran Turismo',
      category: 'BMW',
      rating: '5.0',
      price: '60',
      location: 'Pattaya, Thailand',
      img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
      specs: {
        transmission: 'Manual',
        mileage: '4600 KM',
        fuel: 'Petrol',
        drive: 'Normal',
        year: '2021',
        capacity: '6 Persons',
      },
    },
    {
      id: 2,
      name: 'Ferrari 458 MM Speciale',
      category: 'Ferrari',
      rating: '5.0',
      price: '100',
      location: 'Newyork, USA',
      img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=500',
      specs: {
        transmission: 'Auto',
        mileage: '10 KM',
        fuel: 'Petrol',
        drive: 'Power',
        year: '2018',
        capacity: '5 Persons',
      },
    },
  ];

  return (
    <div className="w-full bg-gray-50/30 py-8">
      <div className="mx-auto w-full md:w-11/12 lg:w-10/12">
        <h2 className="text-3xl font-black text-[#040720] mb-8 px-2">
          Wishlist
        </h2>

        <div className="space-y-6">
          {wishlistItems.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative w-full md:w-72 h-48 flex-shrink-0">
                <img
                  src={car.img}
                  alt={car.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button className="absolute top-3 left-3 bg-[#117a8b] p-1.5 rounded-full text-white shadow-lg">
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>

              {/* Content Section */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <h3 className="text-xl font-bold text-[#040720]">
                      {car.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-orange-400 fill-current"
                        />
                      ))}
                      <span className="text-red-500 font-bold ml-1">
                        ({car.rating})
                      </span>
                      <span className="text-2xl font-black text-[#040720] ml-2">
                        ${car.price}{' '}
                        <span className="text-sm font-medium text-gray-400">
                          / Day
                        </span>
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-400 mb-4">
                    Category : {car.category}
                  </p>

                  {/* Gray Specs Bar */}
                  <div className="bg-gray-50 rounded-lg p-3 flex flex-wrap items-center gap-y-3 gap-x-6 mb-4">
                    <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500">
                      <Settings2 size={16} className="text-gray-400" />{' '}
                      {car.specs.transmission}
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500">
                      <Gauge size={16} className="text-gray-400" />{' '}
                      {car.specs.mileage}
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500">
                      <Fuel size={16} className="text-gray-400" />{' '}
                      {car.specs.fuel}
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500">
                      <Settings2 size={16} className="text-gray-400" />{' '}
                      {car.specs.drive}
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500">
                      <Calendar size={16} className="text-gray-400" />{' '}
                      {car.specs.year}
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500">
                      <Users size={16} className="text-gray-400" />{' '}
                      {car.specs.capacity}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 text-gray-500 font-bold text-sm">
                    <MapPin size={18} className="text-gray-400" />{' '}
                    {car.location}
                  </div>

                  <Buttons
                    type="solid"
                    className="!bg-[#1a1a1a] !py-2.5 !px-8 flex items-center gap-2 rounded-xl text-white"
                  >
                    <CalendarDays size={18} /> Rent Now
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
