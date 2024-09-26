import { pool } from "../libs/pool.js";

async function allRoles() {
  let query = "SELECT * FROM roles";
  const [res] = await pool.execute(query);
  return res;
}

async function getRolById(id) {
  const [res] = await pool.execute("SELECT * FROM roles WHERE id=?", [id]);
  if (res.length > 0) {
    return res;
  } else {
    return null;
  }
}

async function createRole(name) {
  const [res] = await pool.execute("INSERT INTO roles (name) VALUES (?)", [
    name,
  ]);
  return { id: res.insertId, name };
}

async function updateRole(id, name) {
  const [res] = await pool.execute("UPDATE roles SET name = ? WHERE id = ?", [
    name,
    id,
  ]);
  return res;
}
async function removeRole(id) {
  const [res] = await pool.execute("DELETE FROM roles WHERE id = ?", [id]);
  return res;
}

export { allRoles, getRolById, createRole, updateRole, removeRole };
