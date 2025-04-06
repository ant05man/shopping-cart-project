const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from 'Bearer <token>'
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    console.log(process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure your JWT_SECRET is correct here
    req.user = decoded.user; // Make sure this matches what you expect from the token
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
