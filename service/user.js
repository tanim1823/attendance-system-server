const User = require("../models/User");
const error = require("../utils/error");

const findUsers = () => {
  return User.find();
};

const findUserByProperties = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  } else {
    return User.findOne({ [key]: value });
  }
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

const deleteUser = (userID) => {
  return User.findOneAndDelete(userID);
};

const updateUser = async (id, data) => {
  const user = await findUserByProperties("email", data.email);
  if (user) {
    throw error(400, "User already in used!");
  }
  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = {
  findUserByProperties,
  createNewUser,
  findUsers,
  deleteUser,
  updateUser,
};
