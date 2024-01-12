const User = require("../models/User");
const userService = require("../service/user");
const authService = require("../service/auth");

const error = require("../utils/error");

const getUsers = async (req, res, next) => {
  /**
   * TODO filter , sort , pagination , select
   */
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserByID = async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const user = await userService.findUserByProperties("_id", userID);
    if (!user) {
      throw error(404, "User not found");
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    delete user._doc.password;
    res.status(201).json({ message: "User created successfully...", user });
  } catch (e) {
    next(e);
  }
};

const putUserByID = async (req, res, next) => {
  const { name, email, roles, accountStatus } = req.body;
  const { userID } = req.params;
  try {
    const user = await userService.updateUser(userID, {
      name,
      email,
      roles,
      accountStatus,
    });

    if (!user) {
      throw error(404, "User not found!");
    }

    return res.status(200).json({
      message: "User update successfully...",
      user,
    });
  } catch (e) {
    next(e);
  }
};

const patchUserByID = async (req, res, next) => {
  const { name, roles, accountStatus } = req.body;
  const { userID } = req.params;
  try {
    const user = await userService.findUserByProperties("_id", userID);

    if (!user) {
      throw error(404, "User not found!");
    }

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();

    delete user._doc.password;

    return res.status(200).json({
      message: "User update successfully...",
      user,
    });
  } catch (e) {
    next(e);
  }
};

const deleteUserByID = async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const user = await userService.findUserByProperties("_id", userID);

    if (!user) {
      throw error(404, "User not found!");
    }

    await user.deleteOne();

    return res.status(203).json({
      message: "User delete successfully",
    });

    // TODO call delete user service
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUsers,
  getUserByID,
  postUser,
  putUserByID,
  patchUserByID,
  deleteUserByID,
};
