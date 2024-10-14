import { allUsers, getUserById, createUser, updateUser, removeUser, addstudent } from "../models/user.model.js";
import { user_schema } from "../libs/joi/user.schema.js";
import { hash } from "bcrypt";
import TypeValidation from "../utils/TypeValidation.js";
import { createData } from "../models/data.model.js";


/**
 * @description get all users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function all(req, res, next) {
  // #swagger.tags = ['Users']
  const users = await allUsers();
  res.json(users);
}

/**
 * @description create a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function create(req, res, next) {
  // #swagger.tags = ['Users']
  try {

    await user_schema.validateAsync(req.body);

    if (req.body.role_id === 2) {
      throw { message: "Acceso denegado: Los estudiantes solo pueden ser registrados a través de la ruta /students.", status: 403 }
    }


    const { email, role_id, first_name, middle_name, last_name, second_last_name } = req.body;
    const hashedPassword = await hash("Funval2024", 10);

    const user_id = await createUser(email, hashedPassword, role_id);

    const data_id = await createData(first_name, middle_name, last_name, second_last_name, user_id);

    res.status(201).json({ message: "user created successfully" });

  } catch (error) {
    next(error);
  }

}

/**
 * @description get a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function show(req, res, next) {
  // #swagger.tags = ['Users']
  const { id } = req.params;
  const user = await getUserById(id);
  res.json(user);
}

/**
 * @description update a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function update(req, res, next) {
  // #swagger.tags = ['Users']

  try {
    const { id } = req.params;
    const auth = req.auth;
    if (auth.id !== id && auth.role.id !== 1) {
      throw { message: "You don't have permission to update this user", status: 403 }
    }

    const rules = {
      email: { required: true, email: true },
      registrationCode: { required: true, type: 'string' },
      password: { required: true, type: 'string' },
      role_id: { required: true, type: 'number' },
    }

    TypeValidation(req.body, rules);

    const { email, password, role_id } = req.body;
    const updated = await updateUser(id, email, password, role_id);
    res.json(`User with id ${req.params.id} updated`);
  } catch (error) {
    next(error);
  }

}

/**
 * @description delete a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function remove(req, res, next) {
  // #swagger.tags = ['Users']
  const { id } = req.params;
  const auth = req.auth;
  if (auth.id !== id && auth.role.id !== 1) {
    throw { message: "You don't have permission to update this user", status: 403 }
  }
  const deleted = await removeUser(id);
  res.json(`User with id ${req.params.id} deleted`);
}



export { all, create, show, update, remove };
