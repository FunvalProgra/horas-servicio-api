import { pool } from "../libs/pool.js";

async function allData() {
    const [res] = await pool.execute("SELECT * FROM data");
    return res;
}

async function getDataById(id) {
    const [[res]] = await pool.execute("SELECT * FROM data WHERE id = ?", [id]);
    return res;

}

async function getDataByUserId(userId) {
    const [[res]] = await pool.execute("SELECT * FROM data WHERE user_id = ?", [userId]);
    return res;

}

/* f_name, s_name, f_lastname, s_lastname, user_id, */

async function createData(f_name, s_name, f_lastname, s_lastname, user_id) {
    const query = "INSERT INTO data (f_name, s_name, f_lastname, s_lastname, user_id) VALUES (?, ?, ?, ?, ?)";
    const [rs] = await pool.execute(query, [f_name, s_name, f_lastname, s_lastname, user_id]);
    return rs.insertId;
}

async function updateData(id, f_name, s_name, f_lastname, s_lastname, user_id) {
    const query = "UPDATE data SET f_name = ?, s_name = ?, f_lastname = ?, s_lastname = ?, user_id = ? WHERE id = ?";
    const [res] = await pool.execute(query, [f_name, s_name, f_lastname, s_lastname, user_id, id]);
    return res;
}


async function removeData(id) {
    const [res] = await pool.execute("DELETE FROM data WHERE id = ?", [id]);
    return res;
}

export { allData, getDataById, getDataByUserId, createData, updateData, removeData };