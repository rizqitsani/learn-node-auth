const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect('login');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log(decoded);
    return next();
  } catch (err) {
    console.log(err);
    return res.redirect('login');
  }
};

module.exports = verifyToken;
