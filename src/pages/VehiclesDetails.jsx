import React, { useEffect, useRef, useState } from 'react';
import {
  MapPin,
  Eye,
  Car,
  Calendar,
  ArrowLeftRight,
  Heart,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Fuel,
  MessageSquare,
  Plus,
  Minus,
  Gauge,
  Fingerprint,
  DoorOpen,
  CalendarDays,
  Layers,
  Activity,
  Waypoints,
  Fan,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import Buttons from '../components/common/Buttons';
import confetti from 'canvas-confetti';
import Flatpickr from 'react-flatpickr';
import AddVehicleModal from '../components/common/AddVehicleModal';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const VehicleDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      zIndex: 9999,
      colors: ['#FF7000', '#0a0a0a', '#ffffff'],
    });
  };

  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(
    new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  );
  const defaultFeatures = [
    'Multi-zone A/C',
    'Premium sound system',
    '6 Cylinders',
    'Heated front seats',
    'Bluetooth',
    'Adaptive Cruise Control',
    'Andriod Auto',
    'Keyless Start',
    'Intermittent wipers',
    'Navigation system',
    'Memory seat',
    '4 power windows',
  ];

  const defaultSpecs = [
    {
      label: 'Body',
      value: 'Sedan',
      icon: <Car size={22} className="text-blue-500" strokeWidth={1.5} />,
    },
    {
      label: 'Make',
      value: 'Nissan',
      icon: <Layers size={22} className="text-orange-500" strokeWidth={1.5} />,
    },
    {
      label: 'Transmission',
      value: 'Automatic',
      icon: (
        <Activity size={22} className="text-purple-500" strokeWidth={1.5} />
      ),
    },
    {
      label: 'Fuel Type',
      value: 'Diesel',
      icon: <Fuel size={22} className="text-green-600" strokeWidth={1.5} />,
    },
    {
      label: 'Mileage',
      value: '16 Km',
      icon: <Gauge size={22} className="text-red-500" strokeWidth={1.5} />,
    },
    {
      label: 'Drivetrain',
      value: 'Front Wheel',
      icon: (
        <Waypoints size={22} className="text-indigo-500" strokeWidth={1.5} />
      ),
    },
    {
      label: 'Year',
      value: '2018',
      icon: (
        <CalendarDays size={22} className="text-cyan-600" strokeWidth={1.5} />
      ),
    },
    {
      label: 'AC',
      value: 'Air Condition',
      icon: <Fan size={22} className="text-sky-400" strokeWidth={1.5} />,
    },
    {
      label: 'VIN',
      value: '45456444',
      icon: (
        <Fingerprint size={22} className="text-gray-700" strokeWidth={1.5} />
      ),
    },
    {
      label: 'Door',
      value: '4 Doors',
      icon: <DoorOpen size={22} className="text-amber-700" strokeWidth={1.5} />,
    },
    {
      label: 'Brake',
      value: 'ABS',
      icon: (
        <ShieldCheck size={22} className="text-emerald-500" strokeWidth={1.5} />
      ),
    },
    {
      label: 'Engine (Hp)',
      value: '3,000',
      icon: <Cpu size={22} className="text-rose-600" strokeWidth={1.5} />,
    },
  ];

  const displayData = defaultSpecs;

  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef(null);

  // --- Logic for Fetching Description ---
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        // এখানে id ব্যবহার করুন (যা useParams থেকে আসছে)
        const response = await fetch(
          `http://localhost:5000/api/vehicles/${id}`
        );
        if (!response.ok) throw new Error('Vehicle not found');
        const data = await response.json();
        setVehicle(data);
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchVehicleDetails();
  }, [id]);

  // --- Logic for Show More/Less Button Visibility ---
  useEffect(() => {
    if (!loading && contentRef.current) {
      const hasOverflow = contentRef.current.scrollHeight > 48;
      setShowButton(hasOverflow);
    }
  }, [content, loading]);
  // images ডিফাইন করার লাইনটি এভাবে লিখুন
  const images =
    vehicle?.gallery && vehicle.gallery.length > 0
      ? vehicle.gallery
      : [vehicle?.coverImage || 'https://via.placeholder.com/800x450'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [deliveryMode, setDeliveryMode] = useState('delivery');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBooking = async () => {
    try {
      const bookingData = {
        vehicleId: vehicle?._id,
        vehicleName: vehicle?.vehicleName,
        vehicleImage: images[0],
        price: vehicle?.pricePerDay,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
        deliveryMode: deliveryMode,
        location: vehicle?.location,
        status: 'Upcoming',
        createdAt: new Date(),
      };

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      // এখানে আমরা প্রথমে চেক করছি রেসপন্স JSON কি না
      const contentType = response.headers.get('content-type');

      if (
        response.ok &&
        contentType &&
        contentType.includes('application/json')
      ) {
        setBookingSuccess(true);
        fireConfetti();
        toast.success(`Booking successful for ${vehicle?.vehicleName}!`);
        setTimeout(() => {
          setBookingSuccess(false);
          navigate('/mybookings');
        }, 2000);
      } else {
        const errorText = await response.text();
        console.error('Server returned non-JSON response:', errorText);
        toast.error('Booking failed. Route not found or Server error.');
      }
    } catch (error) {
      console.error('Network or Syntax Error:', error);
      toast.error('Something went wrong! Check your Server Connection.');
    }
  };
  if (loading) {
    return <div>Loading...</div>; // লোডিং স্ক্রিন
  }

  if (!vehicle) {
    return <div>Vehicle Not Found!</div>; // ডাটা না থাকলে এই মেসেজ
  }
  return (
    <div className="w-7xl mx-auto px-4 pt-6">
      <div className="flex items-center gap-3 mb-4 ">
        <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
          <Car size={16} className="text-gray-700" />
          <span className="text-sm font-medium text-gray-700">
            {vehicle?.vehicleName}
          </span>
        </div>

        <span className="bg-[#117a8b] text-white text-sm font-bold px-3 py-1 rounded-md">
          {vehicle?.year || '2024'}
        </span>

        <div className="flex items-center gap-1 ml-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-orange-400 text-lg">
              ★
            </span>
          ))}
          <span className="text-gray-500 text-sm ml-1">(5.0)</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
          <h1 className="text-3xl font-black text-gray-900">
            {vehicle?.vehicleName}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1a747e] hover:bg-[#155e66] text-white px-5 py-2.5 rounded-md transition-colors font-medium">
            <Calendar size={18} />
            Total Booking : 300
          </button>
        </div>
      </div>

      {/* Bottom Row: Location and Stats */}
      <div className="flex flex-wrap items-center gap-y-2 text-gray-500 text-sm">
        <div className="flex items-center gap-1.5 pr-4 border-r border-gray-300 last:border-0">
          <MapPin size={16} className="text-gray-400" />
          <span>
            Location : {vehicle?.location || 'Location not available'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-4 border-r border-gray-300 last:border-0">
          <Eye size={16} className="text-gray-400" />
          <span>Views : 250</span>
        </div>

        <div className="flex items-center gap-1.5 pl-4">
          <Car size={16} className="text-gray-400" />
          <span>Listed on: 01 Jan, 2024</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen relative font-sans">
        {/* Success Toast */}
        {bookingSuccess && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 size={20} />
            <span className="font-bold">
              Booking Request Sent Successfully!
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="relative group mb-4 overflow-hidden rounded-lg">
                <img
                  src={images[currentIndex]}
                  className="w-full h-[450px] object-cover transition-all duration-500"
                  alt="Car"
                />

                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all z-10 text-gray-800"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all z-10 text-gray-800"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute top-4 left-4">
                  <button className="bg-white/90 p-2 rounded-full text-gray-500 hover:text-red-500 shadow-sm">
                    <Heart size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-all ${currentIndex === i ? 'ring-2 ring-[#040720]' : 'opacity-50 hover:opacity-100'}`}
                    alt={`Thumbnail ${i}`}
                  />
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#040720] mb-1">
                Description of Listing
              </h3>
              <div className="w-10 h-1 bg-[#FF7000] mb-6"></div>
              <div
                className="relative transition-all duration-700 ease-in-out overflow-hidden"
                style={{
                  maxHeight: isExpanded
                    ? `${contentRef.current?.scrollHeight}px`
                    : '48px',
                }}
              >
                <div
                  ref={contentRef}
                  className="text-gray-500 text-sm leading-6 text-justify"
                >
                  {/* এখানে ডাইনামিক ডেসক্রিপশন আসবে */}
                  {vehicle?.description ||
                    'No description available for this vehicle.'}
                </div>

                {!isExpanded && showButton && (
                  <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                )}
              </div>

              {showButton && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-4 flex items-center gap-1.5 text-[#117a8b] font-bold text-sm transition-colors hover:text-[#0d6371] group"
                >
                  <span className="p-0.5 rounded-full border-2 border-[#117a8b] group-hover:bg-[#117a8b] group-hover:text-white transition-all">
                    {isExpanded ? (
                      <Minus size={14} strokeWidth={4} />
                    ) : (
                      <Plus size={14} strokeWidth={4} />
                    )}
                  </span>
                  {isExpanded ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-6">
              <h3 className="text-xl font-bold text-[#040720] mb-1">
                Specifications
              </h3>
              <div className="w-10 h-1 bg-[#FF7000] mb-8 rounded-full"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                {displayData.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-14 h-14 flex-shrink-0 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm group-hover:border-orange-200 group-hover:bg-orange-50 transition-all duration-300">
                      <span className="text-gray-600 group-hover:text-[#FF7000] transition-colors">
                        {item.icon}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </span>
                      <span className="text-[15px] font-bold text-[#040720] tracking-tight">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Car Features */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-6">
              <h3 className="text-xl font-bold text-[#040720] mb-1">
                Car Features
              </h3>
              <div className="w-10 h-1 bg-[#FF7000] mb-8 rounded-full"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8">
                {defaultFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 text-[#1a747e] transition-transform group-hover:scale-110 duration-300">
                      <CheckCircle2 size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-[15px] font-medium text-gray-600 group-hover:text-[#040720] transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-6">
            <h3 className="text-xl font-bold text-[#040720] mb-1">Pricing</h3>
            <div className="w-10 h-1 bg-[#FF7000] mb-6"></div>

            <div className="space-y-3 mb-6">
              <span className="text-2xl font-black text-[#040720]">
                ${vehicle.pricePerDay}
              </span>
            </div>

            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
              <button
                onClick={() => setDeliveryMode('delivery')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${deliveryMode === 'delivery' ? 'bg-[#040720] text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
              >
                Delivery
              </button>
              <button
                onClick={() => setDeliveryMode('pickup')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${deliveryMode === 'pickup' ? 'bg-[#040720] text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
              >
                Self Pickup
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-2 uppercase tracking-wide">
                  {deliveryMode === 'delivery'
                    ? 'Delivery Location'
                    : 'Pickup Location'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    /* ডাটাবেস থেকে আসা লোকেশন এখানে বসবে */
                    defaultValue={vehicle?.location || 'Loading location...'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:ring-2 ring-[#040720]/10 outline-none transition-all"
                  />
                  <MapPin
                    size={16}
                    className="absolute right-3 top-3.5 text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* তারিখ সিলেক্টর */}
                <Flatpickr
                  value={pickupDate}
                  options={{
                    dateFormat: 'Y-m-d',
                    minDate: 'today', // আজকের আগের তারিখ সিলেক্ট করা যাবে না
                  }}
                  onChange={(dates) => {
                    setPickupDate(dates[0]);
                  }}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#FF7000] focus:outline-none bg-white"
                />

                {/* সময় সিলেক্টর */}
                <Flatpickr
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: 'H:i',
                    time_24hr: true,
                  }}
                  value={pickupTime} // বর্তমান সময় দেখাবে
                  onChange={(dates) => {
                    // সময়টি HH:mm ফরম্যাটে সেভ করবে
                    const selectedTime = dates[0].toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                    setPickupTime(selectedTime);
                  }}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#FF7000] focus:outline-none bg-white"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 relative">
                <Buttons
                  type="solid"
                  onClick={handleBooking}
                  className="w-full !py-4 shadow-lg shadow-orange-200"
                >
                  Book Now
                </Buttons>

                <Buttons type="outline" className="w-full !py-3">
                  Enquire Us
                </Buttons>
              </div>
            </div>

            <div className="bg-white my-6 p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#040720] mb-1">
                Listing Owner Details
              </h3>
              <div className="w-10 h-1 bg-[#FF7000] mb-6"></div>

              <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?u=brooklyn"
                    className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
                    alt="Owner"
                  />
                  <div className="absolute bottom-0 right-0 bg-green-500 border-2 border-white w-4 h-4 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-[#040720]">Brooklyn Cars</h4>
                  <div className="flex text-orange-400 text-xs mt-1">
                    ★★★★★{' '}
                    <span className="text-gray-400 ml-1 text-[10px]">
                      (5.0)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium">Email</span>
                  <span className="text-[#040720] font-semibold">
                    info@example.com
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium">
                    Phone Number
                  </span>
                  <span className="text-[#040720] font-semibold">
                    +1 14XXX XXX78
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 font-medium">Location</span>
                  <span className="text-[#040720] font-semibold">
                    4635 Pheasant Ridge Road, City Hollywood, USA
                  </span>
                </div>
              </div>

              <Buttons
                type="outline"
                className="w-full !bg-[#040720] !text-white hover:!text-[#040720]"
              >
                <MessageSquare size={18} /> Message to owner
              </Buttons>

              <button className="w-full flex items-center justify-center gap-2 mt-4 text-[#117a8b] font-bold text-sm hover:underline">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  className="w-5 h-5"
                  alt="WA"
                />
                Chat Via Whatsapp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
