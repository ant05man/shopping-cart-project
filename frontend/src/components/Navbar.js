import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartItemCount }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <Link to="/">🛍️ Shop</Link>
      <Link to="/cart">🛒 Cart ({cartItemCount})</Link>
    </nav>
  );
};

export default Navbar;
