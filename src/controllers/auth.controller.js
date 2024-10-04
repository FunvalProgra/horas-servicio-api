import { getUserByEmail } from "../models/auth.model.js";
import { SECRRET_KEY } from "../config/app.config.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

/**
 *@description user login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 */
async function login(req, res, next) {
  // #swagger.tags = ['Auth']
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  console.log(user);
  try {
    if (!user) {
      throw { message: "User not found", status: 404 };
    }

   /*  const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw { message: "Invalid password", status: 401 };
    } */

    const payload = {
      id: user.id,
      role: {
        id: user.role_id,
        name: user.role,
      },
    };
    const token = jwt.sign(payload, SECRRET_KEY, {
      expiresIn: "24h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

/**
 *@description user logout
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 */
function logout(req, res, next) {
  // #swagger.tags = ['Auth']
  res.json("Logout");
}

/**
 *@description user register
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 */
function register(req, res, next) {
  // #swagger.tags = ['Auth']
  res.json("Register");
}

export { login, logout, register };
