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

    res.status(201).json({
      status: 'success',
      message: 'User created',
      data: {
        user,
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

module.exports = {
  getSignUp,
  getLogin,
  postSignUp,
  postLogin,
};
