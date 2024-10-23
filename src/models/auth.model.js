import { Model } from "./model.js";

export class AuthModel extends Model {
    constructor() {
        super();

        this.table = 'users';
    }

    async getUserByEmail(email) {
        try {
            const query = `SELECT u.id, u.email, u.password, r.id as role_id, r.name as role 
                            FROM users u
                            JOIN roles r on r.id = u.role_id
                            WHERE u.email = $1
                         `;
            const values = [email];
            const { rows } = await this.client.query(query, values);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const query = `SELECT u.id, u.email, f_name, s_name, f_lastname, s_lastname, 
                           CONCAT(f_name, ' ', s_name, ' ', f_lastname, ' ', s_lastname) as full_name,
                           json_build_object('id', r.id, 'name', r.name) as role
                            FROM users u
                            JOIN data d ON d.user_id = u.id
                            JOIN roles r on r.id = u.role_id
                            WHERE u.id = $1
                         `;
            const values = [id];
            const { rows } = await this.client.query(query, values);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

}