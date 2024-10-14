import { allUsers, getUserById, createUser, updateUser, removeUser, addstudent } from "../models/user.model.js";
import { studen_schema } from "../libs/joi/student.schema.js";
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
  // #swagger.description = 'Endpoint para crear un nuevo usuario'
  // #swagger.parameters['first_name'] = { description: 'Nombre del usuario', type: 'string', required: true }
  // #swagger.parameters['middle_name'] = { description: 'Segundo nombre del usuario', type: 'string', required: false }
  // #swagger.parameters['last_name'] = { description: 'Apellido del usuario', type: 'string', required: true }
  // #swagger.parameters['second_last_name'] = { description: 'Segundo apellido del usuario', type: 'string', required: false }
  // #swagger.parameters['email'] = { description: 'Correo del usuario', type: 'string', required: true }
  // #swagger.parameters['registration_code'] = { description: 'Código de registro del usuario', type: 'string', required: true }
  // #swagger.parameters['password'] = { description: 'Contraseña del usuario', type: 'string', required: true }
  // #swagger.parameters['role_id'] = { description: 'Id del rol del usuario', type: 'number', required: true }
  // #swagger.parameters['controller_id'] = { description: 'Id del controlador del usuario', type: 'number', required: true }
  // #swagger.parameters['recruiter_id'] = { description: 'Id del reclutador del usuario', type: 'number', required: true }
  // #swagger.parameters['country_id'] = { description: 'Id del país del usuario', type: 'number', required: true }
  // #swagger.parameters['school_id'] = { description: 'Id de la escuela del usuario', type: 'number', required: true }

  try {

    const { body } = req;

    const { error } = studen_schema.validate(body);

    if (error) {
      throw { message: error.message, status: 400 };
    }

    const hashPassword = await hash('Funval2024', 10);
    if (body.role_id === 2) {
      await addstudent({ body, password: hashPassword });
      res.status(201).json({ message: 'User created successfully' });
    }

    const { first_name, middle_name, last_name, second_last_name, email, registration_code, role_id } = body;

    const id = await createUser(email, registration_code, hashPassword, role_id);

    await createData(first_name, middle_name, last_name, second_last_name, id);

    res.status(201).json({ message: 'User created successfully', id });

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
