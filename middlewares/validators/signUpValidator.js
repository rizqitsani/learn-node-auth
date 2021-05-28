const { body } = require('express-validator');
const User = require('../../models/User');

const signUpValidator = [
  body('username')
    .isLength({ min: 6 })
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error('Username already in use');
      }
    }),
  body('email')
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email already in use');
      }
    })
    .normalizeEmail(),
  body('password').isLength({ min: 6 }),
];

module.exports = signUpValidator;
