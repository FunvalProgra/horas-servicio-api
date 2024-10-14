import { pool } from "../libs/pool.js";

export async function allStudents() {
    let user_query = "SELECT id, email  FROM users WHERE role_id = 2";
    let data_query = "SELECT id, f_name, s_name, f_lastname, s_lastname, user_id FROM data WHERE user_id = ?";
    let role_query = "SELECT id, name FROM roles WHERE id = 2";
    try {
        const [users] = await pool.execute(user_query);
        const students = [];
        for (const user of users) {
            const [[data]] = await pool.execute(data_query, [user.id]);
            const [[role]] = await pool.execute(role_query);
            students.push({ ...user, data, role });
        }
        return students;
    } catch (error) {
        throw error;
    }

}

export async function getStudentById(id) {
    let user_query = "SELECT id, email  FROM users WHERE role_id = 2 AND id = ?";
    let data_query = "SELECT id, f_name, s_name, f_lastname, s_lastname, user_id FROM data WHERE user_id = ?";
    let role_query = "SELECT id, name FROM roles WHERE id = 2";
    try {
        const [[user]] = await pool.execute(user_query, [id]);

        if (!user) {
            throw { message: "student not found", status: 404 };
        }

        const [[data]] = await pool.execute(data_query, [id]);
        const [[role]] = await pool.execute(role_query);
        return { ...user, data, role };
    } catch (error) {
        throw error;
    }
}

/**
 * @description create a new student
 * @param {Object} body 
 * @returns 
 */
export async function createStudent(body) {
    
    try {
      !body.middle_name && (body.middle_name = '');
      !body.second_last_name && (body.second_last_name = '');
        const unique_email = "SELECT email FROM users WHERE email = ?";
        const unique_code = "SELECT registration_code FROM users WHERE registration_code = ?";

        const [[email]] = await pool.execute(unique_email, [body.email]);
        const [[code]] = await pool.execute(unique_code, [body.registration_code]);

        if (email) {
            throw { message: "email already exists", status: 400 };
        }

        if (code) {
            throw { message: "registration code already exists", status: 400 };
        }
 
      const values = [
        body.first_name,
        body.middle_name,
        body.last_name,
        body.second_last_name,
        body.email,
        body.registration_code,
        body.password,
        body.role_id,
        body.controller_id,
        body.recruiter_id,
        body.country_id,
        body.school_id
      ]
  
      const query = "CALL create_new_student(?,?,?,?,?,?,?,?,?,?,?,?)";
      const [res] = await pool.execute(query, values);
  
      return res;
  
    } catch (error) {
      throw error;
    }
  
  }

export default { allStudents, getStudentById, createStudent };