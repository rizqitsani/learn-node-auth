const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const getSignUp = (req, res) => {
  if (req.cookies.jwt) {
    return res.redirect('/home');
  }

  res.render('signup');
};

const getLogin = (req, res) => {
  if (req.cookies.jwt) {
    return res.redirect('/home');
  }

  res.render('login');
};

const getLogout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
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

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: 259200000 });

        res.status(200).json({
          status: 'success',
          message: 'Login success',
          data: {
            user: user._id,
          },
        });
        return;
      }

      res.status(404).json({
        status: 'fail',
        message: 'Password is incorrect',
      });
      return;
    }

    res.status(404).json({
      status: 'fail',
      message: 'Email is incorrect',
    });
    return;
  } catch (error) {
    console.log(error);
  }
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
  getLogout,
  postSignUp,
  postLogin,
};
