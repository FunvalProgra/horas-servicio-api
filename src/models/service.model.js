import { pool } from "../libs/pool.js";

async function allServices() {
  const [res] = await pool.execute("SELECT * FROM services");
  return res;
}

async function getServicesByUserId(userId) {
  try {
    const [res] = await pool.execute("SELECT * FROM services WHERE user_id = ?", [
      userId,
    ]);
    return res;
  } catch (error) {
    throw (error)
  }


};

/**
 * @description: get a service by id
 * @param {Number} id 
 * @returns {Promise:<Object>}
 */
async function getServiceById(id) {
  const [[res]] = await pool.execute("SELECT * FROM services WHERE id = ?", [id]);
  return res;

}

/**
 * @description: create a service
 * @param {Number} amountReported - the amount reported
 * @param {String} evidence - the evidence
 * @param {String} description - the description
 * @param {Number} userId - the user id
 * @param {Number} categoryId - the category id
 * @returns {Promise:<Object>} - the id of the created service
 */
async function createService(amountReported, evidence, description, userId, categoryId) {
  const query = "INSERT INTO services (amount_reported, evidence, description, user_id, category_id) VALUES (?, ?, ?, ?, ?)";
  const [res] = await pool.execute(query, [amountReported, evidence, description, userId, categoryId]);
  return { id: res.insertId };
}

/**
 * @description: update a service
 * @param {Object} values 
 * @param {Number} id 
 * @returns {Promise:<Boolean>}
 */
async function updateService(values, id) {
  const fields = Object.keys(values);
  const sets = fields.map((field) => `${field} = ?`).join(", ");
  const query = `UPDATE services SET ${sets} WHERE id = ?`;
  const [res] = await pool.execute(query, [...Object.values(values), id]);
  return res;
}
async function removeService(id) {
  const [res] = await pool.execute("DELETE FROM services WHERE id = ?", [id]);
  return res;
}

export {
  allServices,
  getServicesByUserId,
  getServiceById,
  createService,
  updateService,
  removeService,
};
