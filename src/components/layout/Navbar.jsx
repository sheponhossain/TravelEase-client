import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import Buttons from '../common/Buttons';
import { FaLock, FaUser, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const navigator = useNavigate();

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
  );

  return (
    <div className="sticky top-0 z-[100] w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-20 flex items-center justify-between">
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
              className="menu menu-sm dropdown-content mt-4 z-[1] p-6 shadow-2xl bg-white rounded-[2rem] w-[85vw] border border-gray-100 flex flex-col gap-6 animate-in slide-in-from-left duration-300"
            >
              <div className="flex flex-col gap-5 px-2">{navLinks}</div>
              <div className="h-[1px] bg-gray-100 w-full"></div>
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
            </ul>
          </div>
        </div>

        <div className="flex-none lg:flex-1 flex justify-center lg:justify-start">
          <a
            onClick={() => navigator('/')}
            className="text-2xl font-[1000] tracking-tighter text-[#1a1a1a] cursor-pointer"
          >
            Travel<span className="text-[#FF7000]">Ease</span>
          </a>
        </div>

        <div className="hidden lg:flex flex-[2] justify-center">
          <nav className="flex gap-8 items-center">{navLinks}</nav>
        </div>

        <div className="hidden lg:flex flex-1 justify-end gap-3">
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
        </div>
        <div className="flex lg:hidden flex-1 justify-end"></div>
      </div>
    </div>
  );
};

export default Navbar;
