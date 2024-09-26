import { pool } from '../libs/pool.js'


/**
 * @description Method to check if the user exists
 * @param {string} email - Email of the user
 * @returns {object} - User details
 */
export async function getUserByEmail(email) {
    try {

        const query = `
            SELECT u.id, u.email, u.password, r.id as role_id, r.name as role 
            FROM users u
            JOIN roles r on r.id = u.roles_id
            WHERE u.email = ?
        `;
        const values = [email];
        const [[rows]] = await pool.query(query, values);
        return rows;
    } catch (error) {
        throw error;
    }
}

/**
 * @description Method to check if the user exists
 * @param {string} id - ID of the user
 * @returns {object} - User details
 */
export async function getUserById(id) {
    try {
        const query = `
            SELECT u.id, u.email,  u.password, r.id as role_id, r.name as _role 
            FROM users u
            JOIN roles r on r.id = u.roles_id
            WHERE u.id = ?
        `;
        const values = [id];
        const [[row]] = await pool.query(query, values);
        return row;
    } catch (error) {
        throw error;
    }
}

export default { getUserByEmail, getUserById };
