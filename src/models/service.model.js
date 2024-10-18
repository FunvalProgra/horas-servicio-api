import { Model } from "./model.js";
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

