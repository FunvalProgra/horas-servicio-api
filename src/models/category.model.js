import { pool } from "../libs/pool.js";

async function allCategories() {
  const [res] = await pool.execute("SELECT * FROM categories");
  return res;
}
async function getCategoryById(id) {
  const [res] = await pool.execute("SELECT * FROM categories WHERE id = ?", [
    id,
  ]);
  if (res.length > 0) {
    return res;
  } else {
    return null;
  }
}
async function createCategory(name, description) {
  const [res] = await pool.execute(
    "INSERT INTO categories (name, description) VALUES (?, ?)",
    [name, description]
  );
  return { id: res.insertId, name, description };
}
async function updateCategory(id, name, description) {
  const [res] = await pool.execute(
    "UPDATE categories SET name = ?, description = ? WHERE id = ?",
    [name, description, id]
  );
  return res;
}
async function removeCategory(id) {
  const [res] = await pool.execute("DELETE FROM categories WHERE id = ?", [id]);
  return res;
}

export {
  allCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
};
