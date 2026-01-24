import React, { useContext } from 'react';
import Navbar from '../components/layout/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/layout/Footer';
import Loader from '../components/Loader/Loader';
import { AuthContext } from '../Routers/AuthProvider';

const Root = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
