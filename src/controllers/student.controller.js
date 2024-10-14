import { studen_schema } from "../libs/joi/student.schema.js";
import { addstudent } from "../models/user.model.js";
import fs from "fs";


/**
 * @description create a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function create(req, res, next) {

    // #swagger.tags = ['Student']
    // #swagger.description = 'Endpoint para crear un nuevo usuario'
    // #swagger.parameters['first_name'] = { description: 'Nombre del usuario', type: 'string', required: true }
    // #swagger.parameters['middle_name'] = { description: 'Segundo nombre del usuario', type: 'string', required: false }
    // #swagger.parameters['last_name'] = { description: 'Apellido del usuario', type: 'string', required: true }
    // #swagger.parameters['second_last_name'] = { description: 'Segundo apellido del usuario', type: 'string', required: false }
    // #swagger.parameters['email'] = { description: 'Correo del usuario', type: 'string', required: true }
    // #swagger.parameters['registration_code'] = { description: 'Código de registro del usuario', type: 'string', required: true }
    // #swagger.parameters['password'] = { description: 'Contraseña del usuario', type: 'string', required: true }
    // #swagger.parameters['controller_id'] = { description: 'Id del controlador del usuario', type: 'number', required: true }
    // #swagger.parameters['recruiter_id'] = { description: 'Id del reclutador del usuario', type: 'number', required: true }
    // #swagger.parameters['country_id'] = { description: 'Id del país del usuario', type: 'number', required: true }
    // #swagger.parameters['school_id'] = { description: 'Id de la escuela del usuario', type: 'number', required: true }

    try {
        const { body } = req;
        body.role_id = 2;
        const { error } = studen_schema.validate(body);

        if (error) {
            throw { message: error.message, status: 400 };
        }

        const hashPassword = await hash('Funval2024', 10);
        await addstudent({ body, password: hashPassword });
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