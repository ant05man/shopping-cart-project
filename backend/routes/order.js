const express = require('express');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT token and get user info
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // User information is added to req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create an order
router.post('/checkout', authenticate, async (req, res) => {
  const { cart, shippingAddress } = req.body;
  if (!cart || cart.length === 0 || !shippingAddress) {
    return res.status(400).json({ message: 'Cart and shipping address are required' });
  }

  try {
    // Calculate the total amount
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create a new order
    const order = new Order({
      user: req.user.id, // Associating the order with the authenticated user
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      shippingAddress,
    });

    // Save the order to the database
    await order.save();

    // Send a response with the created order
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
