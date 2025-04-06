const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // adjust path if needed
const authMiddleware = require('../middleware/auth'); // adjust path if needed

// POST /api/orders/checkout
router.post('/checkout', authMiddleware, async (req, res) => {
  try {
    const { cart, shippingAddress } = req.body;

    // Make sure user is authenticated
    const userId = req.user._id;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or invalid.' });
    }

    // Transform cart items into the format your Mongoose model expects
    const items = cart.map(item => {
      if (!item._id || !item.quantity) {
        throw new Error('Each cart item must have _id and quantity.');
      }

      return {
        productId: item._id,
        quantity: item.quantity,
      };
    });

    const newOrder = new Order({
      user: userId,
      items,
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
