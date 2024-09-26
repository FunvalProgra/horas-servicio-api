import { pool } from "../libs/pool.js";

async function allServices() {
  const [res] = await pool.execute("SELECT * FROM services");
  return res;
}
async function getServiceById(id) {
  const [res] = await pool.execute("SELECT * FROM services WHERE id = ?", [id]);
  if (res.length > 0) {
    return res;
  } else {
    return null;
  }
}
async function createService(
  amountReported,
  evidence,
  description,
  userId,
  reviewerId,
  categoryId
) {
  const [res] = await pool.execute(
    "INSERT INTO services (amount_reported, evidence, description, user_id, reviewer_id, categorie_id) VALUES (?, ?, ?, ?, ?, ?)",
    [amountReported, evidence, description, userId, reviewerId, categoryId]
  );
  return {
    id: res.insertId,
    amountReported,
    evidence,
    description,
    userId,
    reviewerId,
    categoryId,
  };
}
async function updateService(
  id,
  amountReported,
  evidence,
  description,
  userId,
  reviewerId,
  categoryId
) {
  const [res] = await pool.execute(
    "UPDATE services SET amount_reported = ?, evidence = ?, description = ?, user_id = ?, reviewer_id = ?, categorie_id = ? WHERE id = ?",
    [amountReported, evidence, description, userId, reviewerId, categoryId, id]
  );
  return res;
}
async function removeService(id) {
  const [res] = await pool.execute("DELETE FROM services WHERE id = ?", [id]);
  return res;
}

export {
  allServices,
  getServiceById,
  createService,
  updateService,
  removeService,
};
