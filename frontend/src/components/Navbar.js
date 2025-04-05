import React from 'react';

const Navbar = ({ cartItemCount }) => {
  return (
    <nav>
      <h2>My Shopping Cart</h2>
      <div>Cart: {cartItemCount} items</div>
    </nav>
  );
};

export default Navbar;
