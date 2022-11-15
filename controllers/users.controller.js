const User = require("../models/User.model");
const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const error = require("../utils/error");

const getUsers = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */

  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};


const getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      /**
       * TODO: error function can't working
       */
      throw error("User not found", 404);
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


const createUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const patchUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, roles, accountStatus } = req.body;

  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


const putUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, email, roles, accountStatus } = req.body;
  try {
    const user = await userService.updateUser(userId, {
      name,
      email,
      roles,
      accountStatus,
    });


    if(!user) {
        throw error("User not found", 404)
    }
    return res.status(200).json(user)
  } catch (error) {
    next(error);
  }
};


const deleteUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    await user.remove();
    return res.status(203).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUserById,
  putUserById,
  deleteUserById,
};
 