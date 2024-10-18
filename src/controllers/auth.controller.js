import { AuthModel } from "../models/auth.model.js";
import { SECRRET_KEY } from "../config/app.config.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

 
async function login(req, res, next) {
    /*   #swagger.auto = false
        #swagger.summary = 'Login into the system'
        #swagger.description = 'Endpoint to login into the system'
       #swagger.method = 'Post'
 
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'School Data',
           required: true,
           schema:  {
                email: 'user email',
                password: 'user password'
           }
       }
         
   */
  const { email, password } = req.body;
  const user = await AuthModel.getUserByEmail(email);

  try {
    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw { message: "Invalid password", status: 401 };
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

    return res.status(200).json({ token });

  } catch (error) {
    next(error);
  }

}
 


export { login };

