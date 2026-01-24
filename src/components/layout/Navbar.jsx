import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Buttons from '../common/Buttons';
import { FaLock, FaUser, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../Routers/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigator = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigator('/');
      })
      .catch((error) => console.log(error));
  };

  const activeLinkClass = ({ isActive }) =>
    `font-black text-[13px] uppercase tracking-wider transition-all duration-300 ${
      isActive
        ? 'text-[#FF7000] lg:border-b-2 lg:border-[#FF7000] lg:pb-1'
        : 'text-gray-600 hover:text-[#FF7000]'
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={activeLinkClass}>
        Home
      </NavLink>
      <NavLink to="/allvehicles" className={activeLinkClass}>
        All Vehicles
      </NavLink>
      {user && (
        <>
          <NavLink to="/addvehicle" className={activeLinkClass}>
            Add Vehicle
          </NavLink>
          <NavLink to="/myvehicles" className={activeLinkClass}>
            My Vehicles
          </NavLink>
          <NavLink to="/mybookings" className={activeLinkClass}>
            My Bookings
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-[100] w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="flex lg:hidden flex-1">
          <div className="dropdown">
            <label
              tabIndex={0}
              role="button"
              className="p-2 text-[#1a1a1a] hover:bg-gray-100 rounded-xl transition-all"
            >
              <FaBars size={22} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[1] p-6 shadow-2xl bg-white rounded-[2rem] w-[85vw] border border-gray-100 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-5 px-2">{navLinks}</div>
              <div className="h-[1px] bg-gray-100 w-full"></div>
              {!user ? (
                <div className="flex flex-col gap-3">
                  <Buttons
                    onClick={() => navigator('/login')}
                    type="outline"
                    className="w-full !py-4"
                  >
                    Sign In
                  </Buttons>
                  <Buttons
                    onClick={() => navigator('/register')}
                    type="solid"
                    className="w-full !py-4 shadow-lg shadow-orange-100"
                  >
                    Sign Up
                  </Buttons>
                </div>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center gap-2 text-red-500 font-bold py-4 bg-red-50 rounded-2xl"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              )}
            </ul>
          </div>
        </div>

        {/* Logo */}
        <div className="flex-none lg:flex-1 flex justify-center lg:justify-start">
          <a
            onClick={() => navigator('/')}
            className="text-2xl font-[1000] tracking-tighter text-[#1a1a1a] cursor-pointer"
          >
            Travel<span className="text-[#FF7000]">Ease</span>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex flex-[2] justify-center">
          <nav className="flex gap-8 items-center">{navLinks}</nav>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden lg:flex flex-1 justify-end gap-3 items-center">
          {!user ? (
            <>
              <Buttons
                onClick={() => navigator('/login')}
                className="text-sm cursor-pointer"
                type="outline"
              >
                <FaUser className="mr-2" size={12} /> Sign In
              </Buttons>
              <Buttons
                onClick={() => navigator('/register')}
                className="text-sm cursor-pointer"
                type="solid"
              >
                <FaLock className="mr-2" size={12} /> Sign Up
              </Buttons>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* Profile Image with Tooltip Name */}
              <div className="group relative cursor-pointer">
                <div className="w-11 h-11 rounded-full border-2 border-[#FF7000] p-0.5 transition-transform group-hover:scale-110">
                  <img
                    src={user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                {/* Custom Hover Name Tooltip */}
                <div className="absolute top-full right-0 mt-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[11px] font-bold px-3 py-1 rounded-md whitespace-nowrap pointer-events-none">
                  {user?.displayName || 'User'}
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-500 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border border-gray-100"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
