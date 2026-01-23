import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import Buttons from '../common/Buttons';
import { FaLock, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const navigator = useNavigate();

  // একটিভ লিঙ্কের জন্য স্টাইলিশ ক্লাস
  const activeLinkClass = ({ isActive }) =>
    `font-black text-sm uppercase tracking-wider transition-all duration-300 ${
      isActive
        ? 'text-[#FF7000] underline decoration-2 underline-offset-8'
        : 'text-gray-600 hover:text-[#FF7000]'
    }`;

  const link = (
    <>
      <li>
        <NavLink to="/" className={activeLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allvehicles" className={activeLinkClass}>
          All Vehicles
        </NavLink>
      </li>
      <li>
        <NavLink to="/addvehicle" className={activeLinkClass}>
          Add Vehicle
        </NavLink>
      </li>
      <li>
        <NavLink to="/myvehicles" className={activeLinkClass}>
          My Vehicles
        </NavLink>
      </li>
      <li>
        <NavLink to="/mybookings" className={activeLinkClass}>
          My Bookings
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white/80 backdrop-blur-md sticky top-0 z-[100] shadow-sm py-4 px-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-white rounded-2xl z-1 mt-3 w-52 p-4 shadow-xl border border-gray-50 gap-3"
          >
            {link}
          </ul>
        </div>
        <a className="text-2xl font-black tracking-tighter text-[#1a1a1a]">
          Travel<span className="text-[#FF7000]">Ease</span>
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-8 items-center px-1">{link}</ul>
      </div>

      <div className="navbar-end">
        <nav className="flex gap-4 items-center">
          <Buttons
            onClick={() => navigator('/login')}
            className="text-xs !py-3 !px-6 cursor-pointer font-black"
            type="outline"
          >
            <FaUser className="mr-1" /> Sign In
          </Buttons>
          <NavLink to="/register">
            <Buttons
              className="text-xs !py-3 !px-6 cursor-pointer font-black"
              type="solid"
            >
              <FaLock className="mr-1" /> Sign Up
            </Buttons>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
