const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getSignUp = (req, res) => {
  res.render('signup');
};

const getLogin = (req, res) => {
  res.render('login');
};

const postSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);

    res.cookie('jwt', token, { httpOnly: true, maxAge: 259200000 });

    res.status(201).json({
      status: 'success',
      message: 'User created',
      data: {
        user: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: 'Error when creating user',
    });
  }
};

const postLogin = (req, res) => {
  console.log(req.body);
  res.send('user logged in');
};

// HELPER
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: 259200,
  });
};

module.exports = {
  getSignUp,
  getLogin,
  postSignUp,
  postLogin,
};
