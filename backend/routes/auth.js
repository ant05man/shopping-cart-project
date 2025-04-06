const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');  // Add dotenv to load environment variables

dotenv.config();  // Initialize dotenv to load .env file

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    // Send error response in case of an exception
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });

    // Send the token and user info in the response
    res.json({
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (err) {
    // Send error response if there's an exception
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
