import {
  allRoles,
  getRolById,
  createRole,
  updateRole,
  removeRole,
} from "../models/rol.model.js";

/**
 * @description get all roles
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

function all(req, res, next) {
    // #swagger.tags = ['Roles']
  const roles = await allRoles();
  res.json(roles);
}

/**
 * @description create a role
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

async function create(req, res, next) {
    // #swagger.tags = ['Roles']
    res.json("Role created");
  const { name } = req.body;
  const newRole = await createRole(name);
  res.json({ role: newRole });
}

/**
 * @description get a role
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function show(req, res, next) {
    // #swagger.tags = ['Roles']
  const { id } = req.params;
  const role = await getRolById(id);
  res.json(role);
}

/**
 * @description update a role
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
 
async function update(req, res, next) {
    // #swagger.tags = ['Roles']
  const { id } = req.params;
  const { name } = req.body;
  const updated = await updateRole(id, name);
  res.json(`Role with id ${req.params.id} updated`);
 
}

/**
 * @description delete a role
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function remove(req, res, next) {
    // #swagger.tags = ['Roles']
  const { id } = req.params;
  const deleted = await removeRole(id);
  res.json(`Role with id ${req.params.id} deleted`);
}

export { all, create, show, update, remove };
