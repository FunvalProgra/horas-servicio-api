import {
  allCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
} from "../models/category.model.js";

/**
 * @description get all categories
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function all(req, res, next) {
  const categories = await allCategories();
  res.json(categories);
}

/**
 * @description create a category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function create(req, res, next) {
  const { name, description } = req.body;
  const newCategory = await createCategory(name, description);
  res.json({ category: newCategory });
}

/**
 * @description get a category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function show(req, res, next) {
  const { id } = req.params;
  const category = await getCategoryById(id);
  res.json(category);
}

/**
 * @description update a category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function update(req, res, next) {
  const { id } = req.params;
  const { name, description } = req.body;
  const updated = await updateCategory(id, name, description);
  res.json(`Category with id ${req.params.id} updated`);
}
/**
 * @description delete a category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function remove(req, res, next) {
  const { id } = req.params;
  const deleted = await removeCategory(id);
  res.json(`Category with id ${req.params.id} deleted`);
}

export { all, create, show, update, remove };
