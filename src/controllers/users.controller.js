// import { allUsers, getUserById, createUser, updateUser, removeUser, addstudent } from "../models/user.model.js";
import { User } from "../models/user.model.js";
import { user_schema } from "../libs/joi/user.schema.js";
import { hash } from "bcrypt";
import TypeValidation from "../utils/TypeValidation.js";
import { createData } from "../models/data.model.js";
import joi from "joi";


/**
 * @description get all users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function index(req, res, next) {
  // #swagger.tags = ['Users']
  try {
    const user = new User();
    const rs = await user.all();
    res.status(200).json(rs);
  } catch (error) {
    next(error);
  }

}

/**
 * @description create a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function store(req, res, next) {
  // #swagger.tags = ['Users']
  // #swagger.example = { "account": { "email": "", "role_id": 1 }, "data": { "f_name": "", "s_name" "f_lastname": "", "f_lastname": "" }, "schools": [1, 2] }

  try {
    const { account, data, schools } = req.body;
    const password = await hash('Funval2024', 10);

    if (account.role_id === 2) {
      throw { message: 'You cannot create a user with this role', status: 400 }
    }

    const account_schema = joi.object({ email: joi.string().email().required(), role_id: joi.number().required() });
    const data_schema = joi.object({ f_name: joi.string().required(), s_name: joi.string(), f_lastname: joi.string().required(), s_lastname: joi.string() });
    const schools_schema = joi.array().items(joi.number().required());

    account_schema.validate(account);
    data_schema.validate(data);
    schools_schema.validate(schools);

    const _user = new User();

    await _user.create({ user: { ...account, password }, data, schools });

    res.status(201).json({ message: 'User created successfully' });

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
  // #swagger.parameters['path.id'] = { description: 'User ID' }
  try {
    const { id } = req.params;
    const user = new User();
    const rs = await user.get(id);

    if (!rs) {
      throw { message: 'User not found', status: 404 }
    }

    res.status(200).json(rs);
  } catch (error) {
    next(error);
  }
}

/**
 * @description update a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function update(req, res, next) {
  // #swagger.tags = ['Users']
  // #swagger.parameters['path.id'] = { description: 'User ID' }
  // #swagger.example = { "account": { "email": "", "role_id": 1, "password": "1234567" }, "data": { "f_name": "", "s_name" "f_lastname": "", "f_lastname": "" }, "schools": [1, 2] }

  try {
    const { id } = req.params;
    const auth = req.auth;
    if (auth.id !== id && auth.role.id !== 1) {
      throw { message: "You don't have permission to update this user", status: 403 }
    }

    const { account, data, schools } = req.body;
    const account_schema = joi.object({ email: joi.string().email(), role_id: joi.number() });
    const data_schema = joi.object({ f_name: joi.string(), s_name: joi.string(), f_lastname: joi.string(), s_lastname: joi.string() });
    const schools_schema = joi.array().items(joi.number());

    account_schema.validate(account);
    data_schema.validate(data);
    schools_schema.validate(schools); 

    const _user = new User();
    if(account?.password) {
      account.password = await hash(account.password, 10);
    }
    await _user.update(id, { user: account, data, schools });

    res.status(200).json({ message: 'User updated successfully' });
    
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



export { index, store, show, update, remove };
