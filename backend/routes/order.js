const express = require('express');
const Order = require('../models/Order');
const authenticate = require('../middleware/authenticate'); // Import the JWT middleware
const router = express.Router();

// Create an order
router.post('/checkout', authenticate, async (req, res) => {
  const { cart, shippingAddress } = req.body;
  if (!cart || cart.length === 0 || !shippingAddress) {
    return res.status(400).json({ message: 'Cart and shipping address are required' });
  }

  try {
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create a new order and associate it with the authenticated user
    const order = new Order({
      user: req.user.id,
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      shippingAddress,
    });

    await order.save(); // Save the order to the database
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
