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
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, SECRRET_KEY, {
      expiresIn: "2h",
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
  res.json("Register");
}


export { login, logout, register };

