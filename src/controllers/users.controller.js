import { allUsers, getUserById, createUser, updateUser, removeUser, addstudent } from "../models/user.model.js";
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
    // const rules = {
    //   first_name: { required: true, type: 'string' },
    //   middle_name: { type: 'string' },
    //   last_name: { required: true, type: 'string' },
    //   second_last_name: { type: 'string' },
    //   email: { required: true, email: true },
    //   registration_code: { required: true, type: 'string' },
    //   password: { required: true, type: 'string' },
    //   role_id: { required: true, type: 'number' },
    //   controller_id: { type: 'number' },
    //   recruiter_id: { type: 'number' },
    //   country_id: { type: 'number' },
    //   school_id: { type: 'number' },
    // }

    // TypeValidation(req.body, rules);



    const { first_name, middle_name, last_name, second_last_name, email, registration_code, password, role_id, controller_id, recruiter_id, country_id, school_id } = req.body;
    if (role_id === 2) {
      const hashPassword = await hash(password, 10);
      await createStudent(first_name, middle_name, last_name, second_last_name, email, registration_code, hashPassword, role_id, controller_id, recruiter_id, country_id, school_id);
      res.status(201).json({ message: 'User created successfully' });
    }


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

async function createStudent(first_name, middle_name, last_name, second_last_name, email, registration_code, password, role, controller_id, recruiter_id, country_id, school_id) {
  try {
    await addstudent(first_name, middle_name, last_name, second_last_name, email, registration_code, password, role, controller_id, recruiter_id, country_id, school_id);
    return true;
  } catch (error) {
    throw error;
  }

}
export { all, create, show, update, remove };
