const express = require('express');
const authController = require('../controllers/authController');

const validate = require('../middlewares/validators/validate.js');

const signUpValidator = require('../middlewares/validators/signUpValidator');

const router = express.Router();

router.get('/signup', authController.getSignUp);
router.post('/signup', validate(signUpValidator), authController.postSignUp);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

module.exports = router;
