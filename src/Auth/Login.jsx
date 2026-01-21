import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { toast, Toaster } from 'react-hot-toast';
import Buttons from '../components/common/Buttons';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === 'admin@travelease.com' && password === '123456') {
      toast.success('Successfully logged in! 🎉');
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    toast.success('Connecting to Google...');
    setTimeout(() => navigate(from, { replace: true }), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] px-4 font-sans py-12">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#FF7000]/10 rounded-2xl mb-4">
            <div className="w-9 h-9 bg-[#FF7000] rounded-xl flex items-center justify-center shadow-lg shadow-[#FF7000]/30">
              <LogIn className="text-white w-5 h-5" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Login
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Journey with{' '}
            <span className="text-[#FF7000] font-bold">TravelEase</span>
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 ml-1 mb-2 block tracking-widest">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7000] transition-colors w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#FF7000] focus:bg-white transition-all outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 ml-1 mb-2 block tracking-widest">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7000] transition-colors w-5 h-5" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#FF7000] focus:bg-white transition-all outline-none text-gray-700"
                />
              </div>
              {/* Forget Password - Placed below the input */}
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="text-xs font-bold text-[#FF7000] hover:text-orange-700 transition-colors"
                >
                  Forget Password?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Buttons
              type="solid"
              className="w-full !py-4 !rounded-2xl shadow-lg shadow-[#FF7000]/20 mt-2"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </Buttons>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold text-gray-400 tracking-tighter bg-white px-4">
              Or connect with
            </div>
          </div>

          <div className="space-y-4">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-50 py-3.5 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-[0.99]"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-5 h-5"
                alt="google"
              />
              Continue with Google
            </button>

            {/* Register Button - Inside the card */}
            <Buttons
              type="outline"
              onClick={() => navigate('/register')}
              className="w-full !rounded-2xl !py-4 border-gray-100"
            >
              Create new account
            </Buttons>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
