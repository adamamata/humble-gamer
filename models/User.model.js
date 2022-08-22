const { Schema, model } = require("mongoose");

// const validatePassword = function(password) {
//   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
//   return re.test(password);
// }

const userSchema = new Schema(
  {
    username: {type: String, trim: true, required: true},
    email: {type: String, required: true},
    displayName: {type: String, trim: true, required: true},
    password: {
      type: String, required: true,
      // validate: [validatePassword, 'Please input a valid password'],
      match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/, 'Please input a valid password']
    },
    isAdmin: {type: Boolean, default: false}
  }
);

const User = model("User", userSchema);

module.exports = User;
