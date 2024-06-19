const revokedTokens = require('../utils/revokedTokens');

const logoutController = {
  logout: (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    // Add the token to the revoked tokens set
    revokedTokens.add(token);

    res.json({ message: 'Logout successful' });
  }
};

module.exports = logoutController;