import { allUsers, getUserById, createUser, updateUser, removeUser } from "../models/user.model.js";
import { hash } from "bcrypt";
import { createData } from "../models/data.model.js"
import TypeValidation from "../utils/TypeValidation.js";
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
    const rules = {
      email: { required: true, email: true },
      registrationCode: { required: true, type: 'string' },
      password: { required: true, type: 'string' },
      roleId: { required: true, type: 'number' },
      f_name: { required: true, type: 'string', },
      s_name: { required: true, type: 'string', },
      f_lastname: { required: true, type: 'string' },
      s_lastname: { required: true, type: 'string' },
    }
    const { email, registrationCode, password, roleId, f_name, s_name, f_lastname, s_lastname } = req.body;
    TypeValidation(req.body, rules);
    const hashedPassword = await hash(password, 10);

    const user_id = await createUser(email, registrationCode, hashedPassword, roleId);
    const data_id = await createData(f_name, s_name, f_lastname, s_lastname, user_id);

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
      roleId: { required: true, type: 'number' },
    }
    TypeValidation(req.body, rules);

    const { email, password, roleId } = req.body;
    const updated = await updateUser(id, email, password, roleId);
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
