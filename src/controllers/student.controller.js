import { studen_schema } from "../libs/joi/student.schema.js";
import { allStudents, getStudentById, createStudent } from "../models/student.model.js";
import { addstudent } from "../models/user.model.js";
import fs from "fs";

/**
 * @description get all students
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export async function all(req, res, next) {
    try {
        const students = await allStudents();
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
}

export async function show(req, res, next) {
    try {
        const {auth} = req;
        const { id } = req.params;
        if(id !== auth.id && auth.role_id !== 1){
            throw { message: "You don't have permission to access this resource", status: 403 };

        }
        const student = await getStudentById(id);
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
}

/**
 * @description create a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function create(req, res, next) {

    // #swagger.tags = ['Student']
    // #swagger.description = 'Endpoint para crear un nuevo usuario'

    try {
        const { body } = req;
        body.role_id = 2;
        const { error } = studen_schema.validate(body);

        if (error) {
            throw { message: error.message, status: 400 };
        }

        const hashPassword = await hash('Funval2024', 10);
        await createStudent({ body, password: hashPassword });
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        next(error);
    }

}

export async function masiveCreate(req, res, next) {
    // #swagger.tags = ['Student']
    // #swagger.description = 'Endpoint para crear un nuevos usuario de manera masiva'
    // #swagger.parameters['file'] = { description: 'Archivo con los datos de los usuarios', type: 'file', required: true }

    try {
        const { file } = req;
        const data = fs.readFileSync(file.path, 'utf8');
        const rows = data.split('\n');
        const users = [];
        for (const row of rows) {
            const [first_name, middle_name, last_name, second_last_name, email, registration_code, controller_id, recruiter_id, country_id, school_id] = row.split(',');
            users.push({ first_name, middle_name, last_name, second_last_name, email, registration_code, controller_id, recruiter_id, country_id, school_id });
        }
        for (const user of users) {
            await addstudent(user);
        }
        res.status(201).json({ message: 'Users created successfully' });
    } catch (error) {
        next(error);
    }

}

export async function remove(req, res, next) {
    try {
        const { id } = req.params;
        await removeData(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}


export default { create, remove };