/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Image,
  ArrowRight,
  UserPlus,
  Loader2,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { toast, Toaster } from 'react-hot-toast';
import Buttons from '../components/common/Buttons';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../Routers/AuthProvider';

const Register = () => {
  // loading and setLoading extracted from AuthContext
  const { createUser, signinGoogle, loading, setLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // Password Validation
    if (password.length < 6)
      return toast.error('Password must be at least 6 characters.');
    if (!/[A-Z]/.test(password))
      return toast.error('Password needs an uppercase letter.');
    if (!/[a-z]/.test(password))
      return toast.error('Password needs a lowercase letter.');

    setLoading(true); // Start Loader
    try {
      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      toast.success(`Welcome, ${name}! 🎉`);
      setTimeout(() => {
        navigate(from, { replace: true });
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false); // Stop Loader on error
      toast.error(
        error.code === 'auth/email-already-in-use'
          ? 'Email already in use.'
          : error.message
      );
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    signinGoogle()
      .then((result) => {
        toast.success(`Welcome ${result.user.displayName}! 🚀`);
        setTimeout(() => {
          navigate(from, { replace: true });
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Google registration failed.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] dark:bg-[#0a0a0a] px-4 font-sans py-12 transition-colors duration-300">
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
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Join <span className="text-[#FF7000] font-bold">DriveEase</span>{' '}
            today
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-[#141414] p-8 rounded-[2rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 transition-colors">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 ml-1 mb-1.5 block tracking-widest">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7000] transition-colors w-5 h-5" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-[#1a1a1a] border-none rounded-2xl focus:ring-2 focus:ring-[#FF7000] outline-none text-gray-700 dark:text-gray-200 text-sm"
                />
              </div>
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 ml-1 mb-1.5 block tracking-widest">
                Photo URL
              </label>
              <div className="relative group">
                <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7000] transition-colors w-5 h-5" />
                <input
                  name="photo"
                  type="url"
                  required
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-[#1a1a1a] border-none rounded-2xl focus:ring-2 focus:ring-[#FF7000] outline-none text-gray-700 dark:text-gray-200 text-sm"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 ml-1 mb-1.5 block tracking-widest">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7000] transition-colors w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-[#1a1a1a] border-none rounded-2xl focus:ring-2 focus:ring-[#FF7000] outline-none text-gray-700 dark:text-gray-200 text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 ml-1 mb-1.5 block tracking-widest">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7000] transition-colors w-5 h-5" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-[#1a1a1a] border-none rounded-2xl focus:ring-2 focus:ring-[#FF7000] outline-none text-gray-700 dark:text-gray-200 text-sm"
                />
              </div>
            </div>

            {/* Register Button with Loader */}
            <Buttons
              type="solid"
              disabled={loading}
              className={`w-full !py-4 !rounded-2xl shadow-lg shadow-[#FF7000]/20 mt-2 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Buttons>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100 dark:border-gray-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold text-gray-400 dark:text-gray-500 tracking-tighter bg-white dark:bg-[#141414] px-4 transition-colors">
              Or Register with
            </div>
          </div>

          <div className="space-y-4">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1a1a1a] border-2 border-gray-50 dark:border-gray-800 py-3 rounded-2xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#202020] transition-all text-sm"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-5 h-5"
                alt="google"
              />
              Sign up with Google
            </button>

            <div className="pt-2 text-center">
              <p className="text-gray-400 dark:text-gray-500 text-xs mb-2">
                Already have an account?
              </p>
              <Buttons
                type="outline"
                onClick={() => navigate('/login')}
                className="w-full !rounded-2xl !py-3.5 border-gray-100 dark:border-gray-800 dark:text-gray-400"
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
