const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');

// POST /api/orders/checkout
router.post('/checkout', authMiddleware, async (req, res) => {
  console.log("Received order data:", req.body);
  
  try {
    const { items, shippingAddress } = req.body;

    // Make sure user is authenticated
    const userId = req.user._id;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or invalid.' });
    }

    // Transform items into the format your Mongoose model expects
    const transformedItems = items.map(item => {
      if (!item.productId || !item.quantity) {
        throw new Error('Each item must have productId and quantity.');
      }

      return {
        productId: item.productId,
        quantity: item.quantity,
      };
    });

    const newOrder = new Order({
      user: req.user._id,
      items: transformedItems,
      shippingAddress,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Checkout error:', err.message);
    res.status(400).json({ message: 'Error placing order', error: err.message });
  }
});

module.exports = router;
