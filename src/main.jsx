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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
