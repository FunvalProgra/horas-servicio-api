import { Role } from "../models/role.model.js";

/**
 * @description get all roles
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function all(req, res, next) {
  // #swagger.summary = 'Get all roles
  // #swagger.description = 'Endpoint to get all roles'


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
  // #swagger.summary = 'Get a role'
  // #swagger.description = 'Endpoint to get a role by id'
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
