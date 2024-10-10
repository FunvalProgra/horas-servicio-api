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
  const query = "INSERT INTO users (email, registration_code, password, roles_id) VALUES (?, ?, ?, ?)";
  const [res] = await pool.execute(query, [email, registrationCode, password, roleId]);
  return res.insertId;
}

async function updateUser(id, email, registrationCode, password, roleId) {
  const query = "UPDATE users SET email = ?, registration_code = ?, password = ?, roles_id = ? WHERe id = ?";
  const [res] = await pool.execute(query, [email, registrationCode, password, roleId, id]);
  return res;
}
async function removeUser(id) {
  const [res] = await pool.execute("DELETE FROM users WHERE id = ?", [id]);

  return res;
}

async function addstudent(first_name, middle_name = "", last_name, second_last_name = "", email, registration_code, password, role, controller_id, recruiter_id, country_id, school_id) {
  try {
    const query = "CALL create_new_student(?,?,?,?,?,?,?,?,?,?,?,?)";
    const [res] = await pool.execute(query, [first_name, middle_name, last_name, second_last_name, email, registration_code, password, role, controller_id, recruiter_id, country_id, school_id]);

    return res;
    
  } catch (error) {
    throw error;
  }
}

export { allUsers, getUserById, createUser, updateUser, removeUser, addstudent };
