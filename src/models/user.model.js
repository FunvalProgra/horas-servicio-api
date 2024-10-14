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

async function createUser(email, password, roleId) {
  const query = "INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)";
  const [res] = await pool.execute(query, [email, password, roleId]);
  return res.insertId;
}

async function updateUser(id, email, password, roleId) {
  const query = "UPDATE users SET email = ?, password = ?, roles_id = ? WHERe id = ?";
  const [res] = await pool.execute(query, [email, password, roleId, id]);
  return res;
}

async function removeUser(id) {
  const query = "UPDATE users SET status = 0 WHERE id = ?";
  const [res] = await pool.execute(query, [id]);
  return res;
}


/**
 * @description create a new student
 * @param {Object} body 
 * @returns 
 */
async function addstudent(body) {
  try {
    !body.middle_name && (body.middle_name = '');
    !body.second_last_name && (body.second_last_name = '');

    const values = [
      body.first_name,
      body.middle_name,
      body.last_name,
      body.second_last_name,
      body.email,
      body.registration_code,
      body.password,
      body.role_id,
      body.controller_id,
      body.recruiter_id,
      body.country_id,
      body.school_id
    ]

    const query = "CALL create_new_student(?,?,?,?,?,?,?,?,?,?,?,?)";
    const [res] = await pool.execute(query, values);

    return res;

  } catch (error) {
    throw error;
  }

}

export { allUsers, getUserById, createUser, updateUser, removeUser, addstudent };
