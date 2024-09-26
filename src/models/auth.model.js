import { pool } from '../libs/pool.js'


/**
 * @description Method to check if the user exists
 * @param {string} email - Email of the user
 * @returns {object} - User details
 */
export async function getUserByEmail(email) {
    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        const values = [email];
        const  [rows]  = await pool.query(query, values);
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
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

export default { getUserByEmail, getUserById };
