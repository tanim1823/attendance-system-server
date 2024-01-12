const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          return true;
        }

        return false;
      },
    },
    message: (props) => "Invalid email",
  },
  password: {
    type: String,
    required: true,
    minLength: [3, "Password is too short"],
    maxLength: [100, "Password is too long"],
  },
  roles: {
    type: [String],
    required: true,
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
    require: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
