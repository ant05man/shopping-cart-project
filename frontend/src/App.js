import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <Navbar cartItemCount={cart.length} />
      <Routes>
      <Route path="/" element={<ProductList addToCart={addToCart} />} />
      <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
