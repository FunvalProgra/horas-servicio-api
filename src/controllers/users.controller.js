import { User } from "../models/user.model.js";
import { hash } from "bcrypt";
import joi from "joi";


async function index(req, res, next) {
  //#swagger.summary = 'Get all users'
  //#swagger.description = 'Endpoint to get all users can be filtered by role with the query parameter r = (admin, controller, recruiter)'
  try {
    const { r } = req.query;

    const user = new User();
    let role_id = 2;
    if (r) {
      role_id = getRolId(r);
    }
    const rs = await user.all(role_id);
    res.status(200).json(rs);
  } catch (error) {
    next(error);
  }

}


async function store(req, res, next) {

  /*   #swagger.auto = false
        #swagger.summary = 'Create a new user'
        #swagger.description = 'Endpoint to create a new user with the role of admin, controller or recruiter'
       #swagger.method = 'Post'
       #swagger.produces = ['form-data']
       #swagger.consumes = ['application/json']
 

       #swagger.parameters['body'] = {
           in: 'body',
           description: 'User data.',
           required: true,
           schema:  {
               "data": {
                   "f_name": "Monkey",
                   "s_name": "",
                   "f_lastname": "D.",
                   "s_lastname": "Lufy"
               },
               "account": {
                   "email": "monke_D@mail.com",
                   "role_id": 3
               },
               "schools": [
                   1
               ]
           }
       }
         
   */

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
    //#swagger.responses[201] = {message: 'User created successfully'}
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    next(error);
  }

}


async function show(req, res, next) {
  /* 
    #swagger.summary = 'Get user by id'
    #swagger.description = 'Endpoint to get a user by id'
    #swagger.parameters['id'] = { description: 'User id' }
  */

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
  /*   #swagger.auto = false
        #swagger.summary =  'Update a user'
        #swagger.description =  'Endpoint to update a user with the role of admin, controller or recruiter, can update wathever field you send in the body of the request. If you send the password field it will be hashed, do not send a field if you do not want to update it'
       #swagger.method = 'PUT'
 
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'User data.',
           required: true,
           schema:  {
               "data": {
                   "f_name": "",
                   "s_name": "",
                   "f_lastname": "",
                   "s_lastname": ""
               },
               "account": {
                   "email": "",
                   "role_id": 1
               },
               "schools": [
                   1
               ]
           }
       }
         
   */
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
    if (account?.password) {
      account.password = await hash(account.password, 10);
    }
    await _user.update(id, { user: account, data, schools });

    res.status(200).json({ message: 'User updated successfully' });

  } catch (error) {
    next(error);
  }

}
/**
 * @description get the role id 
 * @param {STRING} role
 * @returns {NUMBER}
 */
function getRolId(role) {
  switch (role.toLowerCase()) {
    case 'admin':
      return 1;
    case 'controller':
      return 3;
    case 'recruiter':
      throw { message: 'You can not use this route for students', status: 400 }
    case 'recruiter':
      return 4;
    default:
      throw { message: 'Invalid role', status: 400 }

  }

}


export { index, store, show, update };
