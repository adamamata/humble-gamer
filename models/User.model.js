const { Schema, model } = require("mongoose");

// const validatePassword = function(password) {
//   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
//   return re.test(password);
// }

function arrayLimit(val) {
  return val.length <= 12;
}

const userSchema = new Schema(
  {
    username: {type: String, trim: true, required: true},
    email: {type: String, required: true},
    displayName: {type: String, trim: true, required: true},

    password: { type: String, required: true },
    isAdmin: {type: Boolean, default: false},
    image: {type: String, default: ""},
    // favouriteGames:[{type: Schema.Types.ObjectId, ref: "Game"}]
    favouriteGames: {
      type: [{type: Schema.Types.ObjectId, ref: 'Game'}],
      validate: [arrayLimit, 'Limit is 12.']
    }
  }
);

const User = model("User", userSchema);

module.exports = User;
