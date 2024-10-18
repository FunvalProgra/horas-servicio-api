import { Model } from "./model.js";
// import { pool } from '../libs/pool.js'


// /**
//  * @description Method to check if the user exists
//  * @param {string} email - Email of the user
//  * @returns {object} - User details
//  */
// export async function getUserByEmail(email) {
//     try {

//         const query = `
//             SELECT u.id, u.email, u.password, r.id as role_id, r.name as role 
//             FROM users u
//             JOIN roles r on r.id = u.role_id
//             WHERE u.email = ?
//         `;
//         const values = [email];
//         const [[rows]] = await pool.query(query, values);
//         return rows;
//     } catch (error) {
//         throw error;
//     }
// }

// /**
//  * @description Method to check if the user exists
//  * @param {string} id - ID of the user
//  * @returns {object} - User details
//  */
// export async function getUserById(id) {
//     try {
//         const query = `
//             SELECT u.id, u.email,  u.password, r.id as role_id, r.name as _role 
//             FROM users u
//             JOIN roles r on r.id = u.roles_id
//             WHERE u.id = ?
//         `;
//         const values = [id];
//         const [[row]] = await pool.query(query, values);
//         return row;
//     } catch (error) {
//         throw error;
//     }
// }

// export default { getUserByEmail, getUserById };


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