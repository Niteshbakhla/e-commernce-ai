import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from './redux/slices/cartSlice';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import { AnimatePresence } from 'framer-motion';
import Cart from './pages/Cart';
import HomePage from './pages/Home';
import BecomeSellerPage from './pages/BecomeSeller';
import PaymentSuccess from './pages/PaymentSuccess';
import axios from 'axios';
import { setIsLogin, setUserName } from './redux/slices/userSlice';
import SellerDashboard from './pages/Dashborad';
import axiosinstance from './axios/axios';
import MyOrdersPage from './pages/MyOrdersPage';
import ProtectedRoute from './ProtectedRoute.jsx';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const isLogin = async () => {
    try {
      const { data } = await axiosinstance.get("/auth/me", { withCredentials: true });
      dispatch(setIsLogin(data.success));
      dispatch(setUserName(data.user.name));
    } catch (error) {
      console.log("Is me route error:", error);
    }
  }

  useEffect(() => {
    isLogin();
  }, [])


  return (
    <AnimatePresence mode='wait'>
      <BrowserRouter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='seller' element={<BecomeSellerPage />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path='payment' element={<PaymentSuccess />} />
            <Route path='dashboard' element={<SellerDashboard />} />
            <Route path='/order' element={<MyOrdersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AnimatePresence>

  )
}

export default App;