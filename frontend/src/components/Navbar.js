import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartItemCount }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
    <Link to="/">🛍️ Shop</Link>
    <Link to="/cart">🛒 Cart ({cartItemCount})</Link>
    <Link to="/checkout">✅Checkout</Link>
    <Link to="/signup">Sign Up</Link>
    <Link to="login">Log In</Link>
</nav>
  );
};

export default Navbar;
