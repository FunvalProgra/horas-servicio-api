import { allRoles, getRolById, createRole, updateRole, removeRole} from "../models/role.model.js";
import DataTypeValidation from "../utils/TypeValidation.js";

/**
 * @description get all roles
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function all(req, res, next) {
  // #swagger.tags = ['Roles']
  try {
    const roles = await allRoles();
    res.json(roles);
  } catch (error) {
    next(error);
  }

}

/**
 * @description create a role
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function create(req, res, next) {
  // #swagger.tags = ['Roles']
  try {

    const rule = {
      name: { type: 'string', required: true }
    }

    DataTypeValidation(req.body, rule);

    const { name } = req.body;
    await createRole(name);

    res.status(201).json({ message: `Role ${name} created successfully` });
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
  const rules = {
    name: { type: 'string', required: true }
  }
  DataTypeValidation(req.body, rules);
  await updateRole(id, name);
  res.status(202).json({ message: `Role with id ${id} updated successfully` });
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
  await removeRole(id);
  res.status(202).json({ message: `Role with id ${id} deleted successfully` });
}

export { all, create, show, update, remove };
