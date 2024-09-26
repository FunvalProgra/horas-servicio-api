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
  // #swagger.tags = ['Categories']
  try {
    const categories = await allCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Error fetching categories" });
  }
}

/**
 * @description create a category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function create(req, res, next) {
  // #swagger.tags = ['Categories']
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }

    const newCategory = await createCategory(name, description);
    res.status(201).json({ category: newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Error creating category" });
  }
}

/**
 * @description get a category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function show(req, res, next) {
  // #swagger.tags = ['Categories']
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    const category = await getCategoryById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Error fetching category" });
  }
}

/**
 * @description update a category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function update(req, res, next) {
  // #swagger.tags = ['Categories']
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }

    const updated = await updateCategory(id, name, description);

    if (!updated) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(`Category with id ${req.params.id} updated`);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Error updating category" });
  }
}

/**
 * @description delete a category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function remove(req, res, next) {
  // #swagger.tags = ['Categories']
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    const deleted = await removeCategory(id);

    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(`Category with id ${req.params.id} deleted`);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Error deleting category" });
  }
}

export { all, create, show, update, remove };
