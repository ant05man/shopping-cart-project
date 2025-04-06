import React, { useState } from 'react';

const Checkout = ({ cart, clearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally send to server here
    console.log('Order submitted:', { ...formData, cart });
    clearCart();
    setSubmitted(true);
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
            <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
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
