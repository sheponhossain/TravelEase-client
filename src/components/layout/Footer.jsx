import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import BkashLogo from '../../assets/Bkash.png';
import nagadlogo from '../../assets/Nagad.png';
import rocketlogo from '../../assets/rocket.png';
import visalogo from '../../assets/visa.png';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaArrowUp,
} from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { AuthContext } from '../../Routers/AuthProvider';
import { toast } from 'react-hot-toast';

const Footer = () => {
  const { loading, setLoading } = useContext(AuthContext);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Subscribed to newsletter!');
    }, 1500);
  };

  const FooterLink = ({ children }) => (
    <li className="hover:text-[#FF7000] dark:hover:text-[#FF7000] cursor-pointer transition-all duration-500 hover:translate-x-1 inline-block w-full text-gray-600 dark:text-gray-400 font-medium">
      {children}
    </li>
  );

  return (
    <footer className="bg-gray-50 dark:bg-black text-[#1a1a1a] dark:text-white pt-16 pb-8 px-6 md:px-12 font-sans overflow-hidden border-t border-gray-200 dark:border-none transition-colors duration-500">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex justify-start mb-4">
              <a className="text-2xl font-black tracking-tighter text-[#1a1a1a] dark:text-white cursor-pointer uppercase italic">
                Travel<span className="text-[#FF7000]">Ease</span>
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              Experience the ultimate freedom of the road with DriveEase. We
              provide premium car rentals tailored for your comfort and style.
            </p>
          </div>

          <div>
            <h3 className="text-[#1a1a1a] dark:text-white text-xl font-black mb-6 relative uppercase italic tracking-wider">
              Vehicles Type
              <span className="absolute left-0 -bottom-2 h-1 w-10 bg-[#FF7000]"></span>
            </h3>
            <ul className="space-y-3">
              {['All Vehicles', 'SUVs', 'Trucks', 'Luxury Cars'].map((item) => (
                <FooterLink key={item}>{item}</FooterLink>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#1a1a1a] dark:text-white text-xl font-black mb-6 relative uppercase italic tracking-wider">
              Quick Links
              <span className="absolute left-0 -bottom-2 h-1 w-10 bg-[#FF7000]"></span>
            </h3>
            <ul className="space-y-3">
              {[
                'My Account',
                'Deals & Incentives',
                'Financial Services',
                'Privacy Policy',
              ].map((item) => (
                <FooterLink key={item}>{item}</FooterLink>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#1a1a1a] dark:text-white text-xl font-black mb-6 relative uppercase italic tracking-wider">
              Contact Info
              <span className="absolute left-0 -bottom-2 h-1 w-10 bg-[#FF7000]"></span>
            </h3>
            <div className="space-y-4 mb-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3 group cursor-pointer transition-all">
                <div className="bg-[#FF7000] p-2.5 rounded-xl text-white shadow-lg shadow-orange-500/20">
                  <FaPhoneAlt size={12} />
                </div>
                <span className="group-hover:text-[#FF7000] font-bold transition-colors">
                  +1 (888) 760 1940
                </span>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer transition-all">
                <div className="bg-[#FF7000] p-2.5 rounded-xl text-white shadow-lg shadow-orange-500/20">
                  <FaEnvelope size={12} />
                </div>
                <span className="group-hover:text-[#FF7000] font-bold transition-colors">
                  support@travelease.com
                </span>
              </div>
            </div>

            {/* Newsletter with Loading State */}
            <form onSubmit={handleSubscribe} className="relative mt-6">
              <input
                type="email"
                required
                placeholder="Enter Your Email"
                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 py-4 px-4 rounded-2xl text-[#1a1a1a] dark:text-white focus:outline-none focus:border-[#FF7000] transition-all shadow-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#FF7000] text-white px-5 rounded-xl hover:bg-orange-600 transition-all flex items-center justify-center disabled:opacity-50 shadow-lg shadow-orange-500/30"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <FaPaperPlane size={16} />
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500 dark:text-gray-500 font-bold">
            © 2026 <span className="text-[#FF7000]">TravelEase</span>. All
            Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            {[
              { logo: BkashLogo, alt: 'bKash' },
              { logo: nagadlogo, alt: 'Nagad' },
              { logo: rocketlogo, alt: 'Rocket' },
              { logo: visalogo, alt: 'Visa' },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-white/90 px-3 cursor-pointer py-1.5 rounded-xl flex items-center justify-center border border-gray-100 dark:border-transparent shadow-sm h-10 w-16 md:w-20 overflow-hidden"
              >
                <img
                  src={item.logo}
                  alt={item.alt}
                  className="h-full w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-[#FF7000] hover:border-[#FF7000] dark:hover:border-[#FF7000] transition-all cursor-pointer text-gray-600 dark:text-gray-400 hover:text-white"
                >
                  <Icon size={14} />
                </div>
              ))}
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white dark:bg-[#1a1a1a] p-3 rounded-xl text-[#FF7000] hover:bg-[#FF7000] hover:text-white transition-all shadow-xl border border-gray-100 dark:border-gray-800 active:scale-90"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
