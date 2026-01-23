import React from 'react';
import Navbar from '../components/layout/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/layout/Footer';

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-calc-[100vh-200px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
