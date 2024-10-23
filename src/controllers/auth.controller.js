import { AuthModel } from "../models/auth.model.js";
import { SECRRET_KEY } from "../config/app.config.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";


async function login(req, res, next) {
  /*   #swagger.auto = false
      #swagger.summary = 'Login into the system'
      #swagger.description = 'Endpoint to login into the system'
     #swagger.method = 'Post'
 
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User information',
        required: true,
        schema: { $ref: "#/components/loginRequest" }
      }
 */
  const { email, password } = req.body;
  const authModel = new AuthModel();
  const user = await authModel.getUserByEmail(email);

  try {
    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const payload = {
      id: user.id,
      role: {
        id: user.role_id,
        name: user.role
      }
    };
    const token = jwt.sign(payload, SECRRET_KEY, {
      expiresIn: "24h",
    });

    const profile = await authModel.getUserById(user.id);

    res.status(200).json({ ...profile, token });

  } catch (error) {
    next(error);
  }

}

async function profile(req, res, next) {
  /*  
      #swagger.summary = 'Login into the system'
      #swagger.description = 'Endpoint to login into the system'
      #swagger.method = 'get'
      #swagger.security = [{ "authorization": [] }]
      #swagger.responses[200] = {
        schema: { $ref: "#/components/profileResponse" }
      }
 */


  try {
    const { id } = req.auth;
    const authModel = new AuthModel();
    const user = await authModel.getUserById(id);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    res.status(200).json(user);
  } catch (error) {
    next(error)

  }

}



export { login, profile };

