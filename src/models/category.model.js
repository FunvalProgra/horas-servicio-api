import { pool } from "../libs/pool.js";

async function allCategories() {
  try {
    const [res] = await pool.execute("SELECT * FROM categories");
    return res;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw new Error("Error fetching categories");
  }
}
async function getCategoryById(id) {
  try {
    const [res] = await pool.execute("SELECT * FROM categories WHERE id = ?", [
      id,
    ]);
    if (res.length > 0) {
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching category with id ${id}`, error);
    throw new Error("Error fetching category");
  }
}
async function createCategory(name, description) {
  try {
    const [res] = await pool.execute(
      "INSERT INTO categories (name, description) VALUES (?, ?)",
      [name, description]
    );
    return { id: res.insertId, name, description };
  } catch (error) {
    console.error("Error creating category", error);
    throw new Error("Error creating category");
  }
}

async function updateCategory(id, name, description) {
  try {
    const [res] = await pool.execute(
      "UPDATE categories SET name = ?, description = ? WHERE id = ?",
      [name, description, id]
    );
    if (res.affectedRows > 0) {
      return { id, name, description };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error updating category with id ${id}`, error);
    throw new Error("Error updating category");
  }
}
async function removeCategory(id) {
  try {
    const [res] = await pool.execute("DELETE FROM categories WHERE id = ?", [
      id,
    ]);
    if (res.affectedRows > 0) {
      return { message: `Category with id ${id} deleted` };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error deleting category with id ${id}`, error);
    throw new Error("Error deleting category");
  }
}

export {
  allCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
};
