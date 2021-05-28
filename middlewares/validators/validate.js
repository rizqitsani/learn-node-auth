const { validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const formattedError = {};
    errors
      .array()
      .forEach((error) => (formattedError[error.param] = error.msg));

    res.status(400).json({ status: 'fail', errors: formattedError });
  };
};

module.exports = validate;
