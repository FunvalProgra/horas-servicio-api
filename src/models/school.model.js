import { pool } from "../libs/pool.js";

export async function allSchools() {
    try {
        const query = `SELECT * FROM schools`;
        const [result] = await pool.query(query);
        return result
    } catch (error) {
        throw error;
    }
}

export async function getSchoolById(id) {
    try {
        const query = `SELECT * FROM schools WHERE id = ?`;
        const [[result]] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function createSchool(name) {
    try {
        const query = `INSERT INTO schools (name) VALUES (?)`;
        const [result] = await pool.query(query, [name]);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function updateSchool(id, name) {
    try {
        const query = `UPDATE schools SET name = ? WHERE id = ?`;
        const [result] = await pool.query(query, [name, id]);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function removeSchool(id) {
    try {
        const query = `DELETE FROM schools WHERE id = ?`;
        const [result] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

export default { allSchools, getSchoolById, createSchool, updateSchool, removeSchool };