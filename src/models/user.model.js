import { pool } from "../libs/pool.js";

async function allUsers() {
  let query = "SELECT * FROM users";
  const [res] = await pool.execute(query);
  return res;
}

async function getUserById(id) {
  const [res] = await pool.execute("SELECT * FROM users WHERE id=?", [id]);
  if (res.length > 0) {
    return res;
  } else {
    return null;
  }
}

async function createUser(email, registrationCode, password, roleId) {
  const [res] = await pool.execute(
    "INSERT INTO users (email, registration_code, password, roles_id) VALUES (?, ?, ?, ?)",
    [email, registrationCode, password, roleId]
  );
  return { id: res.insertId, email, registrationCode, password, roleId };
}

async function updateUser(id, email, registrationCode, password, roleId) {
  const [res] = await pool.execute(
    "UPDATE users SET email = ?, registration_code = ?, password = ?, roles_id = ? WHERE id = ?",
    [email, registrationCode, password, roleId, id]
  );
  return res;
}
async function removeUser(id) {
  const [res] = await pool.execute("DELETE FROM users WHERE id = ?", [id]);

  return res;
}

export { allUsers, getUserById, createUser, updateUser, removeUser };
