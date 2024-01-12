const User = require("../models/User");
const jwt = require("jsonwebtoken");
const error = require("../utils/error");

const {
  hashWithKeccak256,
  compareHashAndPassword,
} = require("node-hash-password");
const { findUserByProperties, createNewUser } = require("./user");

const registerService = async ({
  email,
  name,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserByProperties("email", email);

  if (user) {
    throw error(400, "User already exist");
  }
  const hashPassword = hashWithKeccak256({
    password,
  });

  return createNewUser({
    email,
    name,
    password: hashPassword,
    roles,
    accountStatus,
  });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperties("email", email);
  if (!user) {
    throw error(400, "Invalid Credintial");
  }
  // try compare pure password with hash method keccak256
  const resultCompare = compareHashAndPassword({
    method: "keccak256",
    hash: user.password,
    password,
  });
  if (!resultCompare) {
    throw error(400, "Invalid Credintial");
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  return jwt.sign(payload, "secret", {
    expiresIn: "1h",
  });
};

module.exports = {
  registerService,
  loginService,
};
