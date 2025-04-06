import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/Signup';
import Login from './components/Login';

import './App.css';


function App() {
  // Load Cart from LocalStorage or start with an empty array
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
});

// whenever cart changes, save it to LocalStorage
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((item, index) => index !== productToRemove));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Navbar cartItemCount={cart.length} />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        } 
        />
        <Route path="/cart" 
        element={
        <Cart
         cart={cart}
         removeFromCart={removeFromCart}
         clearCart={clearCart}
         />
        }
        />
      </Routes>
    </Router>
  );
}

export default App;
