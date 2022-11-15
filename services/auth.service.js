require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./user.service");
const error = require("../utils/error");

const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserByProperty("email", email);

  if (user) throw error("User already exist", 400);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return createNewUser({ name, email, password: hash, roles, accountStatus });
};

const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw error("Please fulfill your request", 400);
  }

  let user = await findUserByProperty("email", email);
  if (!user) throw error("Invalid Credential", 400);

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw error("Invalid Credential", 400);

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  return jwt.sign(payload, process.env.JWT_Secret_Key, {
    expiresIn: "2h",
  });
};

module.exports = { registerService, loginService };
