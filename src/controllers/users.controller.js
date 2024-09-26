import {
  allUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
} from "../models/user.model.js";

/**
 * @description get all users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function all(req, res, next) {
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
  const { email, registrationCode, password, roleId } = req.body;
  const newUser = await createUser(email, registrationCode, password, roleId);
  res.json({
    user: newUser,
  });
}

/**
 * @description get a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function show(req, res, next) {
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
  const { id } = req.params;
  const { email, registrationCode, password, roleId } = req.body;
  const updated = await updateUser(
    id,
    email,
    registrationCode,
    password,
    roleId
  );
  res.json(`User with id ${req.params.id} updated`);
}

/**
 * @description delete a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function remove(req, res, next) {
  const { id } = req.params;
  const deleted = await removeUser(id);
  res.json(`User with id ${req.params.id} deleted`);
}

export { all, create, show, update, remove };
