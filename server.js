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
const axios = require('axios');
const iplocation = require('iplocation').default;

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
const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get('/api/weather', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.socket.remoteAddress;

  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (!ipv4Regex.test(ip)) {
    return res.status(400).json({ error: 'Invalid IP address' });
  }

  try {
    const location = await iplocation(ip);
    if (!location || !location.city) {
      return res.status(404).json({ error: 'City not found from IP location' });
    }

    const city = location.city;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const weatherResponse = await axios.get(weatherUrl);

    if (!weatherResponse.data || weatherResponse.data.cod !== 200) {
      console.error('OpenWeatherMap API error:', weatherResponse.data.message);
      return res.status(500).json({ error: 'Error from OpenWeatherMap API' });
    }

    res.json({
      city: weatherResponse.data.name,
      weather: weatherResponse.data.weather.map(w => ({
        main: w.main,
        description: w.description,
        icon: w.icon
      })),
      temperature: weatherResponse.data.main.temp,
      wind: weatherResponse.data.wind.speed,
      clouds: weatherResponse.data.clouds.all,
      visibility: weatherResponse.data.visibility
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

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