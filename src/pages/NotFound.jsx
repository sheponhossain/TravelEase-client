import React from 'react';
import { useNavigate } from 'react-router';
import { MoveLeft, Home, Compass } from 'lucide-react';
import Buttons from '../components/common/Buttons';
import dogLogo from '../assets/404page.png';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F8F9FA] relative overflow-hidden">
      {/* Background Gradient Layer - #FF7000 Theme */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div
          className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #FF7000 0%, transparent 70%)',
          }}
        ></div>
        <div
          className="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-15 blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #FF7000 0%, transparent 70%)',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Visual Section: Only Dog Image (Larger Size) */}
        <div className="relative flex items-center justify-center select-none pointer-events-none">
          <div className="relative w-72 h-72 md:w-[500px] md:h-[400px] flex items-center justify-center">
            <div
              className="absolute w-[60%] h-[60%] rounded-full opacity-10 blur-[80px]"
              style={{ backgroundColor: '#FF7000' }}
            ></div>

            <img
              src={dogLogo}
              alt="404 Visual"
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>

        {/* Text Section - Directly in Body */}
        <div className="text-center max-w-2xl ">
          <div
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8 shadow-xl shadow-orange-500/20"
            style={{ backgroundColor: '#FF7000' }}
          >
            <Compass size={16} className="text-white" />
            Wrong Direction
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 tracking-tight leading-tight">
            Why are you here?
          </h2>

          <p className="text-gray-500 text-lg md:text-xl font-light mb-12 leading-relaxed opacity-70">
            You've taken a turn into the unknown.{' '}
            <br className="hidden md:block" />
            Let's get you back to the main road before it's too late.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Buttons
              onClick={() => navigate('/')}
              type="solid"
              className="w-full sm:w-auto rounded-2xl font-black shadow-2xl transition-all flex items-center justify-center gap-3"
            >
              <Home size={20} /> Go Home
            </Buttons>

            <Buttons
              onClick={() => navigate(-1)}
              type="outline"
              className="w-full sm:w-auto  border-2 rounded-2xl font-black transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em]"
            >
              <MoveLeft size={20} /> Go Back
            </Buttons>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
