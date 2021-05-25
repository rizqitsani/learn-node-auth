const getSignUp = (req, res) => {
  res.render('signup');
};

const getLogin = (req, res) => {
  res.render('login');
};

const postSignUp = (req, res) => {
  res.send('new signup');
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
