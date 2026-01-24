/* eslint-disable no-unused-vars */
import React, { use, useContext } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Image, ArrowRight, UserPlus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { toast, Toaster } from 'react-hot-toast';
import Buttons from '../components/common/Buttons';
import { updateProfile } from 'firebase/auth';
import AuthProvider, { AuthContext } from '../Routers/AuthProvider';

const Register = () => {
  const { createUser, signinGoogle, auth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // পাসওয়ার্ড ভ্যালিডেশন
    if (password.length < 6)
      return toast.error('Password must be at least 6 characters.');
    if (!/[A-Z]/.test(password))
      return toast.error('Password needs an uppercase letter.');
    if (!/[a-z]/.test(password))
      return toast.error('Password needs a lowercase letter.');

    try {
      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      toast.success(`Welcome, ${name}! 🎉`);
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (error) {
      toast.error(
        error.message === 'auth/email-already-in-use'
          ? 'এই ইমেইলটি অলরেডি ব্যবহার করা হয়েছে।'
          : error.message
      );
    }
  };

  const handleGoogleLogin = () => {
    signinGoogle()
      .then((result) => {
        toast.success(`Welcome ${result.user.displayName}! 🚀`);
        setTimeout(() => navigate(from, { replace: true }), 1500);
      })
      .catch((error) => toast.error('গুগল রেজিস্ট্রেশন সফল হয়নি।'));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] px-4 font-sans py-12">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#FF7000]/10 rounded-2xl mb-4">
            <div className="w-9 h-9 bg-[#FF7000] rounded-xl flex items-center justify-center shadow-lg shadow-[#FF7000]/30">
              <UserPlus className="text-white w-5 h-5" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Join <span className="text-[#FF7000] font-bold">TravelEase</span>{' '}
            today
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 ml-1 mb-1.5 block tracking-widest">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7000] transition-colors w-5 h-5" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#FF7000] focus:bg-white transition-all outline-none text-gray-700 text-sm"
                />
              </div>
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 ml-1 mb-1.5 block tracking-widest">
                Photo URL
              </label>
              <div className="relative group">
                <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7000] transition-colors w-5 h-5" />
                <input
                  name="photo"
                  type="url"
                  required
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#FF7000] focus:bg-white transition-all outline-none text-gray-700 text-sm"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 ml-1 mb-1.5 block tracking-widest">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7000] transition-colors w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#FF7000] focus:bg-white transition-all outline-none text-gray-700 text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 ml-1 mb-1.5 block tracking-widest">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7000] transition-colors w-5 h-5" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#FF7000] focus:bg-white transition-all outline-none text-gray-700 text-sm"
                />
              </div>
            </div>

            {/* Register Button */}
            <Buttons
              type="solid"
              className="w-full !py-4 !rounded-2xl shadow-lg shadow-[#FF7000]/20 mt-2"
            >
              Create Account <ArrowRight className="w-5 h-5" />
            </Buttons>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold text-gray-400 tracking-tighter bg-white px-4">
              Or Register with
            </div>
          </div>

          <div className="space-y-4">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-50 py-3 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-[0.99] text-sm"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-5 h-5"
                alt="google"
              />
              Sign up with Google
            </button>

            {/* Login Link - Now using Buttons component for consistency */}
            <div className="pt-2 text-center">
              <p className="text-gray-400 text-xs mb-2">
                Already have an account?
              </p>
              <Buttons
                type="outline"
                onClick={() => navigate('/login')}
                className="w-full !rounded-2xl !py-3.5 border-gray-100"
              >
                Log in here
              </Buttons>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
