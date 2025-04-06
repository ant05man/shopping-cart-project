import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartItemCount }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', gap: '1rem' }}>
      <Link to="/">🛍️ Shop</Link>
      <Link to="/cart">🛒 Cart ({cartItemCount})</Link>

      {user && <Link to="/checkout">✅ Checkout</Link>}

      {user ? (
        <>
          <span>👋 {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
