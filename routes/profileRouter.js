const express = require('express');
const { body, validationResult } = require('express-validator');
const profileController = require('../controllers/profileController');
const waterIntakeController = require('../controllers/waterIntakeController');
const authenticateToken = require('../middleware/authMiddleware');
const checkProfileExists = require('../middleware/checkProfileExists');

const router = express.Router();

router.post('/create', authenticateToken, checkProfileExists, [
    body('name').notEmpty().withMessage('Nama wajib di isi'),
    body('age').notEmpty().withMessage('Umur wajib di isi'),
    body('gender').notEmpty().withMessage('Jenis Kelamin wajib di isi'),
    body('height').notEmpty().withMessage('Tingi Badan wajib di isi'),
    body('weight').notEmpty().withMessage('Berat Badan wajib di isi')
], profileController.importProfile);

router.put('/profiles/:id', authenticateToken, profileController.updateProfile);
router.get('/profiles/:id', authenticateToken, profileController.getProfile);
router.post('/profiles/:id/water-intake', authenticateToken, waterIntakeController.addWaterIntake);

module.exports = router;
