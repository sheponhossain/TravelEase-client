import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
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

const Footer = () => {
  // Reusable Link Component with Hover Zoom/Lift
  const FooterLink = ({ children }) => (
    <li className="hover:text-[#FF7000] cursor-pointer transition-all duration-500 hover:translate-x-1 hover:-translate-y-1 inline-block w-full text-gray-400">
      {children}
    </li>
  );

  return (
    <footer className="bg-black text-white pt-16 pb-8 px-6 md:px-12 font-sans overflow-hidden">
      {/* Eikhane 'motion.div' bebohar kora hoyeche jate shudhu ei section-ti 
          niche theke upore uthe ashe. Main footer background 'black' thakbe.
      */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Company */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 relative">
              About Company
              <span className="absolute left-0 -bottom-2 h-1 w-10 bg-[#FF7000]"></span>
            </h3>
            <ul className="space-y-3">
              {[
                'Our Company',
                'Shop Toyota',
                'Dreamsrentals USA',
                'Dreamsrentals Worldwide',
              ].map((item) => (
                <FooterLink key={item}>{item}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Vehicles Type */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 relative">
              Vehicles Type
              <span className="absolute left-0 -bottom-2 h-1 w-10 bg-[#FF7000]"></span>
            </h3>
            <ul className="space-y-3">
              {['All Vehicles', 'SUVs', 'Trucks', 'Cars'].map((item) => (
                <FooterLink key={item}>{item}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 relative">
              Quick Links
              <span className="absolute left-0 -bottom-2 h-1 w-10 bg-[#FF7000]"></span>
            </h3>
            <ul className="space-y-3">
              {[
                'My Account',
                'Champaigns',
                'Deals and Incentive',
                'Financial Services',
              ].map((item) => (
                <FooterLink key={item}>{item}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 relative">
              Contact Info
              <span className="absolute left-0 -bottom-2 h-1 w-10 bg-[#FF7000]"></span>
            </h3>
            <div className="space-y-4 mb-6 text-gray-400">
              <div className="flex items-center gap-3 group cursor-pointer transition-transform ">
                <div className="bg-[#FF7000] p-2.5 rounded-md text-white">
                  <FaPhoneAlt size={14} />
                </div>
                <span className="group-hover:text-white transition-colors">
                  +1 (888) 760 1940
                </span>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer transition-transform ">
                <div className="bg-[#FF7000] p-2.5 rounded-md text-white">
                  <FaEnvelope size={14} />
                </div>
                <span className="group-hover:text-white transition-colors">
                  support@example.com
                </span>
              </div>
            </div>

            {/* Newsletter Input Box */}
            <div className="relative mt-6 group">
              <input
                type="email"
                placeholder="Enter Your Email Here"
                className="w-full bg-white py-3 px-4 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#FF7000] transition-all"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-[#FF7000] text-white px-4 rounded-md hover:bg-orange-600 transition-all">
                <FaPaperPlane />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                (Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#FF7000] hover:border-[#FF7000] text-white transition-all cursor-pointer"
                  >
                    <Icon size={14} />
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500">
            © 2026 Dreams Rent. All Rights Reserved.
          </p>

          {/* Pure Text Logos for Payments */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white px-3 py-1 rounded cursor-pointer flex items-center justify-center"
            >
              <span className="text-[#D12053] font-black text-xs italic tracking-tighter">
                bKash
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white px-3 py-1 rounded cursor-pointer flex items-center justify-center"
            >
              <span className="text-[#F47321] font-bold text-xs uppercase">
                Nagad
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white px-3 py-1 rounded cursor-pointer flex items-center justify-center"
            >
              <span className="text-[#8C3494] font-extrabold text-xs italic">
                Rocket
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white px-3 py-1 rounded cursor-pointer flex items-center justify-center"
            >
              <span className="text-[#1A1F71] font-black text-xs italic">
                VISA
              </span>
            </motion.div>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#FF7000] p-3 rounded-md text-white hover:bg-orange-600 transition-all shadow-lg hover:-translate-y-1"
          >
            <FaArrowUp />
          </button>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
