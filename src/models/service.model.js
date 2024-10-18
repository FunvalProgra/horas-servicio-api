import { pg } from "../libs/pg.js"
import { Model } from "./model.js";
// import { pool } from "../libs/pool.js";

// async function allServices() {
//   const [res] = await pool.execute("SELECT * FROM services");
//   return res;
// }

// async function getServicesByUserId(userId) {
//   try {
//     const [res] = await pool.execute("SELECT * FROM services WHERE user_id = ?", [
//       userId,
//     ]);
//     return res;
//   } catch (error) {
//     throw (error)
//   }


// };

// /**
//  * @description: get a service by id
//  * @param {Number} id 
//  * @returns {Promise:<Object>}
//  */
// async function getServiceById(id) {
//   const [[res]] = await pool.execute("SELECT * FROM services WHERE id = ?", [id]);
//   return res;

// }

// /**
//  * @description: create a service
//  * @param {Number} amountReported - the amount reported
//  * @param {String} evidence - the evidence
//  * @param {String} description - the description
//  * @param {Number} userId - the user id
//  * @param {Number} categoryId - the category id
//  * @returns {Promise:<Object>} - the id of the created service
//  */
// async function createService(amountReported, evidence, description, userId, categoryId) {
//   const query = "INSERT INTO services (amount_reported, evidence, description, user_id, category_id) VALUES (?, ?, ?, ?, ?)";
//   const [res] = await pool.execute(query, [amountReported, evidence, description, userId, categoryId]);
//   return { id: res.insertId };
// }

// /**
//  * @description: update a service
//  * @param {Object} values 
//  * @param {Number} id 
//  * @returns {Promise:<Boolean>}
//  */
// async function updateService(values, id) {
//   const fields = Object.keys(values);
//   const sets = fields.map((field) => `${field} = ?`).join(", ");
//   const query = `UPDATE services SET ${sets} WHERE id = ?`;
//   const [res] = await pool.execute(query, [...Object.values(values), id]);
//   return res;
// }
// async function removeService(id) {
//   const [res] = await pool.execute("DELETE FROM services WHERE id = ?", [id]);
//   return res;
// }

// export {
//   allServices,
//   getServicesByUserId,
//   getServiceById,
//   createService,
//   updateService,
//   removeService,
// };


export class Service extends Model {
  constructor() {
    super()
  }

  async all(status) {
    try {
      let query = `SELECT s.*, 
                      json_build_object(
                      'id', u.id,
                      'email', u.email,
                      'registration_code', u.registration_code,
                      'name', concat(d.f_name, ' ', d.s_name, ' ', d.f_lastname, ' ', d.s_lastname), 
                      'controller', concat(co.f_name, ' ', co.s_name, ' ', co.f_lastname, ' ', co.s_lastname), 
                      'recruiter', concat(re.f_name, ' ', re.s_name, ' ', re.f_lastname, ' ', re.s_lastname)
                      ) as student 
                      FROM services s
                      JOIN users u ON s.user_id = u.id
                      JOIN data d ON  s.user_id = d.user_id
                      JOIN students st ON s.user_id = st.user_id 
                      JOIN data re ON st.controller_id = re.user_id
                      JOIN data co ON st.recruiter_id = co.user_id
                      `
      if (status) {
        query += `WHERE s.status = '${status}'`
      }
      const services = await this.client.query(query);
      return services.rows;
    } catch (error) {
      throw error;
    }
  }

  async userServices(userId) {
    try {
      const query = "SELECT * FROM services WHERE user_id = $1";
      const services = await this.client.query(query, [userId]);
      return services.rows;
    } catch (error) {
      throw error;
    }

  }


}

