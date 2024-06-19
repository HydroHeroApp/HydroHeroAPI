require('dotenv').config();

const jwt = require('jsonwebtoken');

const revokedTokens = require('../utils/revokedTokens');

const secret = process.env.JWT_SECRET;



const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];



    if (token == null) return res.sendStatus(401);



    // Periksa apakah token ada di blacklist

    if (revokedTokens.has(token)) {

        return res.status(403).json({ message: 'Token has been revoked' });

    }



    jwt.verify(token, secret, (err, user) => {

        if (err) return res.sendStatus(403);

        req.user = user;

        next();

    });

};



module.exports = authenticateToken;