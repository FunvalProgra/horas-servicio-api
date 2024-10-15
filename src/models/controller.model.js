import {pool} from "../libs/pool.js";

export async function allControllers() {
    let user_query = "SELECT id FROM users WHERE role_id = 3";
    let data_query = "SELECT concat(f_name, ' ', s_name, ' ', f_lastname, ' ', s_lastname) as full_name FROM data WHERE user_id = ?";
    try {
        const [users] = await pool.execute(user_query);
        const controllers = [];
        for (const user of users) {
            const [[data]] = await pool.execute(data_query, [user.id]);
            controllers.push({...user, ...data});
        }
        return controllers;
    } catch (error) {
        throw error;
    }

}

export async function getControllerById(id) {
    let user_query = "SELECT id FROM users WHERE role_id = 3 AND id = ?";
    let data_query = "SELECT concat(f_name, ' ', s_name, ' ', f_lastname, ' ', s_lastname) as full_name FROM data WHERE user_id = ?";
    try {
        const [[user]] = await pool.execute(user_query, [id]);

        if (!user) {
            throw {message: "controller not found", status: 404};
        }

        const [[data]] = await pool.execute(data_query, [id]);
        return {...user, ...data};
    } catch (error) {
        throw error;
    }
}