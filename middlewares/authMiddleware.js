const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect('login');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const rawUser = await User.findById(decoded.id);

    const user = {
      username: rawUser.username,
      email: rawUser.email,
    };
    res.locals.user = JSON.stringify(user);

    return next();
  } catch (err) {
    res.locals.user = null;
    console.log(err);

    return res.redirect('login');
  }
};

module.exports = verifyToken;
