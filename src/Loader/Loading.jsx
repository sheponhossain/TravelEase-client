import React from 'react';
import carlogo from '../assets/carLoading.jpg';

const Loading = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* ১. মেইন ইমেজ */}
      <img
        src={carlogo}
        alt="Car Loading"
        className="w-full h-full object-cover opacity-90"
      />

      {/* ২. হেডলাইট অ্যানিমেশন সেকশন */}
      <div className="absolute top-[48.5%] left-[64.5%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* ক) মেইন লাইট সোর্স (Core) */}
        <div className="w-10 h-10 bg-white rounded-full blur-[2px] opacity-100 z-30"></div>

        {/* খ) ইনার গ্লো (Inner Glow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-orange-200 rounded-full blur-md animate-headlight-warm z-20"></div>

        {/* গ) আউটার বিম (Outer Beam/Flare) - এটাই মেইন ড্রামাটিক লুক দিবে */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-500 rounded-full blur-[40px] animate-headlight-flare z-10 opacity-60"></div>

        {/* ঘ) রোডের ওপর হালকা রিফ্লেকশন (Ground Glow) */}
        <div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-60 h-20 bg-orange-600/20 rounded-[100%] blur-3xl animate-headlight-flare"></div>
      </div>

      <style jsx>{`
        @keyframes headlight-warm {
          0%,
          100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes headlight-flare {
          0%,
          100% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(0.8);
            filter: blur(50px);
          }
          50% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1.2);
            filter: blur(70px);
          }
        }

        .animate-headlight-warm {
          animation: headlight-warm 2s infinite ease-in-out;
        }
        .animate-headlight-flare {
          animation: headlight-flare 2s infinite ease-in-out;
        }
      `}</style>

      {/* ৩. লোডিং টেক্সট (নিচে ছোট করে) */}
      <div className="absolute bottom-10 flex flex-col items-center">
        <div className="text-white/50 text-xs font-black tracking-[0.3em] uppercase animate-pulse">
          System Initializing
        </div>
      </div>
    </div>
  );
};

export default Loading;
