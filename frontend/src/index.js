import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import HomePage from './landing page/home_page/HomePage';
import SignUp from './landing page/signup/SignUp.js';
import Login from './landing page/login/Login.js';
import AboutPage from './landing page/about/Aboutpage.js';
import Product from './landing page/products/Product.js';
import PricingPage from './landing page/pricing/Pricingpage.js';
import SupportPage from './landing page/support/SupportPage.js';
import Navbar from './landing page/Navbar.js';
import Footer from './landing page/Footer.js';
import NotFoundPage from './landing page/NotFoundPage.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </AuthProvider>
);
