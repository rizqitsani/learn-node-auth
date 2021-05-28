const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      // minLength: 6,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
