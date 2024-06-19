const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.get('/profile', verifyToken, (req, res) => {
  // Access the user data from req.user
  res.json({ user: req.user });
});

module.exports = router;
