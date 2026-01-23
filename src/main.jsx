import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import AuthProvider from './Routers/AuthProvider.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/Hero/Hero.jsx';
import AllVehicles from './pages/AllVehicles.jsx';
import TopCategories from './components/Top Categories/TopCategories.jsx';
import FeaturedOwner from './components/Featured Owner/FeaturedOwner.jsx';
import Login from './Auth/Login.jsx';
import Register from './Auth/Register.jsx';
import MyBookings from './pages/MyBookings.jsx';
import UpdateVehicle from './components/Update Vehicle/UpdateVehicle.jsx';
import Page404 from './pages/NotFound.jsx';
import Root from './Root/Root.jsx';
import VehicleDetails from './pages/VehiclesDetails.jsx';
import AddVehicles from './pages/AddVehicles.jsx';
import { ToastContainer } from 'react-toastify';
import MyVehicles from './pages/MyVehicles.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <>
            <Hero />
            <TopCategories />
            <FeaturedOwner />
          </>
        ),
      },
      {
        path: '/allvehicles',
        element: <AllVehicles />,
      },
      {
        path: '/addvehicle',
        element: <AddVehicles />,
      },
      {
        path: '/MyVehicles',
        element: <MyVehicles />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/vehicle/:id',
        element: <VehicleDetails />,
      },
      {
        path: '/mybookings',
        element: <MyBookings />,
      },
      {
        path: '/updatevehicle/:id',
        element: <UpdateVehicle />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
      {
        path: 'VehicleDetails',
        element: <VehicleDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
