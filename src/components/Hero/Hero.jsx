import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import carVideo from '../../assets/car-drift.mp4';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Routers/AuthProvider';
import { Loader2 } from 'lucide-react';
import Buttons from '../common/Buttons';

const Hero = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 800);
  };

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover opacity-60 dark:opacity-40 transition-opacity duration-500"
        >
          <source src={carVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent dark:from-black dark:via-black/70"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h1 className="text-white text-6xl md:text-8xl font-black italic uppercase tracking-tighter">
            Travel{' '}
            <span className="text-[#FF7000] drop-shadow-[0_0_15px_rgba(255,112,0,0.3)]">
              Ease
            </span>
          </h1>

          <p className="text-gray-300 dark:text-gray-400 mt-6 max-w-lg text-lg leading-relaxed">
            Experience the freedom of the open road with our premium vehicle
            rentals. Whether you're seeking adventure or business travel, we
            have the perfect ride for you.
          </p>

          <div className="flex gap-4 items-center mt-10">
            <button
              onClick={() => handleNavigate('/allvehicles')}
              disabled={loading}
              className="relative overflow-hidden"
            >
              <Buttons
                className="text-sm cursor-pointer flex items-center gap-2 min-w-[150px] justify-center"
                type="solid"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : (
                  'All Vehicles'
                )}
              </Buttons>
            </button>
            <NavLink to="/about">
              <button className="text-white border-b-2 border-white/20 hover:border-[#FF7000] py-2 transition-all font-bold uppercase text-xs tracking-widest">
                Learn More
              </button>
            </NavLink>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent z-10 transition-colors duration-500"></div>
    </section>
  );
};

export default Hero;
