require('dotenv').config();
const express = require('express')
const cors = require('cors')
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const profileRouter = require('./routes/profileRouter');
const db = require('./models');
const waterintakeRouter = require('./routes/waterintakeRouter');
const protectedRouter = require('./routes/protectedRouter');
const logoutRouter = require('./routes/logoutRouter');
const authenticateToken = require('./middleware/authMiddleware'); // Added this line
const mlModelRouter = require('./routes/mlModelRouter');

const app = express()

// Tambahkan ini untuk mengurai JSON dari body request
app.use(express.json());

// Tambahkan ini untuk mengurai x-www-form-urlencoded dari body request
app.use(express.urlencoded({ extended: true }));

// Middleware untuk memeriksa token kecuali untuk rute login dan register
app.use((req, res, next) => {
    if (req.path === '/api/login' || req.path === '/api/register') {
        return next();
    }
    authenticateToken(req, res, next);
});

app.use('/api/register', registerRouter)
app.use('/api/login', loginRouter)
app.use('/api/profile', profileRouter)
app.use('/api/water-intake', waterintakeRouter); 
app.use('/api/protected', protectedRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/predict', mlModelRouter);

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await db.sequelize.sync({ alter: true });
        console.log("Database synchronized.");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = app;