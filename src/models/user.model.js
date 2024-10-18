import { Model } from "./model.js";

export class User extends Model {
  constructor() {
    super();
  }

  async all(role_id) {
    try {
      let where = role_id ===2 ? `WHERE role_id <> $1`: `WHERE role_id = $1`;
   
      const user_query = `SELECT  u.id,  u.email,  u.role_id,  d.f_name,  d.s_name,  d.f_lastname,  d.s_lastname,
          json_build_object('id', r.id, 'name', r.name) as role,
          COALESCE((SELECT json_agg(s.name) FROM school_user us 
          INNER JOIN schools s ON us.school_id = s.id WHERE us.user_id = u.id), '[]') as schools
          FROM  users u  
          INNER JOIN  data d ON u.id = d.user_id
          INNER JOIN  roles r ON u.role_id = r.id
          ${where}
      `;
      const res = await this.client.query(user_query, [role_id]);

      return res.rows;
    } catch (error) {
      throw error;
    }
  }

  async create({ user, data, schools }) {

    try {
      const user_fields = Object.keys(user).join(',');
      const user_values = Object.values(user).map((_, i) => `$${i + 1}`).join(',');
      const user_query = `INSERT INTO users (${user_fields}) VALUES (${user_values}) RETURNING *`;

      const data_fields = Object.keys(data).join(',');
      const data_values = Object.values(data).map((_, i) => `$${i + 1}`).join(',');
      const data_query = `INSERT INTO data (${data_fields}, user_id) VALUES (${data_values},$${Object.keys(data).length + 1} ) RETURNING *`;

      const schools_query = `INSERT INTO school_user (user_id, school_id) VALUES ($1, $2) RETURNING *`;

      await this.client.query('BEGIN');

      const user_res = await this.client.query(user_query, Object.values(user));
      //inserted id 
      let user_id = user_res.rows[0].id;
      const data_res = await this.client.query(data_query, [...Object.values(data), user_id]);

      schools.forEach(async school_id => {
        await this.client.query(schools_query, [user_id, school_id]);
      });

      await this.client.query('COMMIT');

    } catch (error) {
      await this.client.query('ROLLBACK');
      throw error;
    }

  }

  async get(id) {
    try {
      const user_query = `SELECT  u.id,  u.email,  u.role_id,  d.f_name,  d.s_name,  d.f_lastname,  d.s_lastname,
      json_build_object('id', r.id, 'name', r.name) as role,
      COALESCE((SELECT json_agg(s.name) FROM school_user us 
      INNER JOIN schools s ON us.school_id = s.id WHERE us.user_id = u.id), '[]') as schools
      FROM  users u  
      INNER JOIN  data d ON u.id = d.user_id
      INNER JOIN  roles r ON u.role_id = r.id
      WHERE role_id <> 2
      AND u.id = $1
  `;

      const user_res = await this.client.query(user_query, [id]);
      return user_res.rows[0];

    } catch (error) {
      throw error;
    }
  }

  async update(id, { user, data, schools }) {
    try {

      await this.client.query('BEGIN');

      if (user) {
        const user_fields = Object.keys(user).map((field, i) => `${field} = $${i + 1}`).join(',');
        const user_query = `UPDATE users SET ${user_fields} WHERE id = $${Object.keys(user).length + 1} RETURNING *`;
        const user_res = await this.client.query(user_query, [...Object.values(user), id]);
      }

      if (data) {
        const data_fields = Object.keys(data).map((field, i) => `${field} = $${i + 1}`).join(',');
        const data_query = `UPDATE data SET ${data_fields} WHERE user_id = $${Object.keys(data).length + 1} RETURNING *`;
        const data_res = await this.client.query(data_query, [...Object.values(data), id]);
      }

      if (schools) {
        const schools_query = `INSERT INTO school_user (user_id, school_id) VALUES ($1, $2) RETURNING *`;
        await this.client.query('DELETE FROM school_user WHERE user_id = $1', [id]);
        schools.forEach(async school_id => {
          await this.client.query(schools_query, [id, school_id]);
        });
      }

      await this.client.query('COMMIT');

    } catch (error) {
      await this.client.query('ROLLBACK');
      throw error;
    }
  }


}