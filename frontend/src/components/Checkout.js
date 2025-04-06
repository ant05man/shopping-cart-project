import React, { useState } from 'react';
import axios from 'axios';

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

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ No token found. Please log in.');
      return;
    }

    try {
      // 🟡 Transform cart to only send productId and quantity
      const orderItems = cart.map(item => ({
        productId: item.id, // Ensure _id exists on each item
        quantity: item.quantity || 1,
      }));

      // 🛠️ Console logs for debugging
      console.log("🛒 Full cart:", cart);
      console.log("📝 Transformed order items:", orderItems);
      console.log("📦 Final order data to be sent:", {
        items: orderItems,
        shippingAddress: formData.address,
      });

      // 📡 Make API call
      const response = await axios.post(
        'http://localhost:5000/api/orders/checkout',
        {
          items: orderItems,
          shippingAddress: formData.address,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log('✅ Order placed successfully:', response.data.order);
        clearCart();
        setSubmitted(true);
      }
    } catch (error) {
      console.error('❌ Error placing order:', error.response?.data || error.message);
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
