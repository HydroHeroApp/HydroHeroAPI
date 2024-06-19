const jwt = require('jsonwebtoken');
const revokedTokens = require('../utils/revokedTokens');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Check if the token is revoked
  if (revokedTokens.has(token)) {
    return res.status(401).json({ message: 'Token has been revoked' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;