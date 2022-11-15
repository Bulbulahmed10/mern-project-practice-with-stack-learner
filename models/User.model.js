const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    minlength: [3, "name is too short"],
    maxlength: [20, "name is too long"],
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          v
        );
      },
      message: (prop) => `Invalid email: ${prop.value}`,
    },
  },
  password: {
    type: String,
    minlength: [4, "password is too short"],
    required: true,
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
    required: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
