import { Model } from "./model.js";


export class Student extends Model {
    constructor() {
        super();
    }

    async all() {
        try {
            const query = `SELECT 
                    u.id, u.email, u.registration_code, st.level,
                    concat(d.f_name, ' ', d.s_name, ' ', d.f_lastname, ' ', d.s_lastname) as name,
                    json_build_object(
                        'id', re.id, 
                        'name', concat(re.f_name, ' ', re.s_name, ' ', re.f_lastname, ' ', re.s_lastname)
                    ) AS recruiter, 
                    json_build_object(
                        'id', co.id, 
                        'name', concat(co.f_name, ' ', co.s_name, ' ', co.f_lastname, ' ', co.s_lastname)
                    ) AS controller
                FROM 
                    students st
                JOIN 
                    users u ON st.user_id = u.id
                JOIN 
                    data d ON st.user_id = d.user_id
                JOIN 
                    data re ON st.recruiter_id = re.user_id
                JOIN 
                    data co ON st.controller_id = co.user_id;
            `
            const res = await this.client.query(query);

            return res.rows;

        } catch (error) {
            throw error;
        }
    }

    async create({ user, data, student }) {

        try {
            const user_fields = Object.keys(user).join(',');
            const user_values = Object.values(user).map((_, i) => `$${i + 1}`).join(',');
            const user_query = `INSERT INTO users (${user_fields}, role_id) VALUES (${user_values}, $${Object.keys(user).length + 1}) RETURNING *`;

            const data_fields = Object.keys(data).join(',');
            const data_values = Object.values(data).map((_, i) => `$${i + 1}`).join(',');
            const data_query = `INSERT INTO data (${data_fields}, user_id) VALUES (${data_values},$${Object.keys(data).length + 1} ) RETURNING *`;

            const student_fields = Object.keys(student).join(',');
            const student_values = Object.values(student).map((_, i) => `$${i + 1}`).join(',');
            const student_query = `INSERT INTO students (${student_fields}, user_id) VALUES (${student_values},$${Object.keys(student).length + 1} ) RETURNING *`;


            await this.client.query('BEGIN');

            const user_res = await this.client.query(user_query, [...Object.values(user), 2]);

            let user_id = user_res.rows[0].id;
            const data_res = await this.client.query(data_query, [...Object.values(data), user_id]);

            const student_res = await this.client.query(student_query, [...Object.values(student), user_id]);

            await this.client.query('COMMIT');

            return true;
        } catch (error) {
            await this.client.query('ROLLBACK');
            throw error;
        }

    }

    async find(id) {
        try {
            const query = `SELECT 
                    u.id, u.email, st.level, u.registration_code, 
                    concat(d.f_name, ' ', d.s_name, ' ', d.f_lastname, ' ', d.s_lastname) as name,
                    json_build_object(
                        'id', re.id, 
                        'name', concat(re.f_name, ' ', re.s_name, ' ', re.f_lastname, ' ', re.s_lastname)
                    ) AS recruiter, 
                    json_build_object(
                        'id', co.id, 
                        'name', concat(co.f_name, ' ', co.s_name, ' ', co.f_lastname, ' ', co.s_lastname)
                    ) AS controller
                FROM 
                    students st
                JOIN 
                    users u ON st.user_id = u.id
                JOIN 
                    data d ON st.user_id = d.user_id
                JOIN 
                    data re ON st.recruiter_id = re.user_id
                JOIN 
                    data co ON st.controller_id = co.user_id
                WHERE
                    u.id = $1;
            `

            const res = await this.client.query(query, [id]);

            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(id, { user, data, student }) {
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

            if (student) {
                const student_fields = Object.keys(student).map((field, i) => `${field} = $${i + 1}`).join(',');
                const student_query = `UPDATE students SET ${student_fields} WHERE user_id = $${Object.keys(student).length + 1} RETURNING *`;
                const student_res = await this.client.query(student_query, [...Object.values(student), id]);
            }



            await this.client.query('COMMIT');

            return true;

        } catch (error) {
            throw error;
        }
    }



}
