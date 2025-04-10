const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if Authorization header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; // Get token string after "Bearer"

  try {
    // Decode the token using your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded JWT:', decoded);
    // Make sure decoded payload contains userId (set in your login/signup route)
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    // Attach user info to the request object
    req.user = { _id: decoded.userId };
    console.log('✅ Authenticated User ID:', req.user);

    next(); // Continue to the next middleware/route
  } catch (err) {
    console.error('❌ JWT verification error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
