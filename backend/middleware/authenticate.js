const jwt = require('jsonwebtoken');  // Import jsonwebtoken

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    console.log(process.env.JWT_SECRET);  // Make sure you have a valid JWT_SECRET in your .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded.user; // Attach the user information to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });  // Handle errors if token verification fails
  }
};

module.exports = authenticate;
