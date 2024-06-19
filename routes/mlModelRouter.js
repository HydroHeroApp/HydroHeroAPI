const express = require('express');
const mlModelController = require('../controllers/mlModelController');

const router = express.Router();

router.post('/', mlModelController.predict);

module.exports = router;
