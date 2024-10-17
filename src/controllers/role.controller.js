/* import { allRoles, getRolById, createRole, updateRole, removeRole} from "../models/role.model.js"; */
import { Role } from "../models/role.model.js";

/**
 * @description get all roles
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function all(req, res, next) {
  // #swagger.tags = ['Roles']
  // #swagger.description = 'Endpoint to get all roles'
  // #swagger.example =  [{"id": 1, "name": "Admin"}, {"id": 2, "name": "User"}] 

  try {
    const role = new Role();
    const roles = await role.all();
    res.json(roles);
  } catch (error) {
    next(error);
  }

}

/**
 * @description get a role
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function show(req, res, next) {
  // #swagger.tags = ['Roles']

  // #swagger.description = 'Endpoint to get a role'
  // #swagger.parameters['id'] = { description: 'Role ID' }
  // #swagger.responses[200] = { description: 'Role found' }
  // #swagger.responses[404] = { description: 'Role not found' }

  // #swagger.example = {"id": 1, "name": "Admin"}
  try {
    const role = new Role();
    const { id } = req.params;
    const response = await role.get(id);
    if (!response) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }

}



export { all, show };
