const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/signup', authController.getSignUp);
router.post('/signup', authController.postSignUp);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

module.exports = router;
