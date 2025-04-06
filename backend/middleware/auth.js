const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Log the entire authorization header for debugging
  console.log("Authorization Header:", authHeader);

  const token = authHeader && authHeader.split(' ')[1];

  // Log the token itself to check if it's extracted correctly
  console.log("Extracted Token:", token);

  if (!token) {
    console.log("No token found in the Authorization header");
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Try to decode the token and log the decoded token for debugging
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);  // Log the decoded payload to verify it

    req.user = decoded;  // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    // Log error details for better debugging
    console.error("Invalid token:", error);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
