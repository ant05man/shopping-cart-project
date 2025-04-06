import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode

const Checkout = ({ cart, clearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Calculate the total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      return;  // If no token is found, return early
    }

    try {
      // Decode the token and check if it is expired
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp < Date.now() / 1000;
      if (isExpired) {
        console.error('Token has expired. Please log in again.');
        return;  // If the token is expired, stop further execution
      }

      // Send the POST request to the server with the token in the header
      const response = await axios.post(
        'http://localhost:5000/api/orders/checkout',
        { cart, shippingAddress: formData.address },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );

      if (response.status === 201) {
        console.log('Order placed successfully:', response.data.order);
        clearCart(); // Clear the cart after the order is placed
        setSubmitted(true); // Set the submitted state to true
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (submitted) {
    return <h2>✅ Thank you, {formData.name}! Your order has been placed.</h2>;
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label><br />
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <h3>Order Summary</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
        <strong>Total: ${total}</strong>

        <br /><br />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
