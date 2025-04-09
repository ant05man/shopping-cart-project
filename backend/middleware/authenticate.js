const jwt = require('jsonwebtoken');
const User = require('../models/User'); // import your User model

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password'); // optionally remove password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    console.log('Authenticated User:', req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
