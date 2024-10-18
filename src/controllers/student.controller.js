import { hash } from "bcrypt";
import { Student } from "../models/student.model.js";
import { user_schema, data_schema } from "../libs/joi/student.schema.js"
import fs from "fs";


export async function index(req, res, next) {
    // #swagger.summary = 'Get all students'
    // #swagger.description = 'Endpoint to get all students'
    try {
        const student = new Student()
        const students = await student.all();
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }

}

export async function show(req, res, next) {
    // #swagger.summary = 'Get a student'
    // #swagger.description = 'Endpoint to get a student'
    // #swagger.parameters['id'] = { description: 'Student id', type: 'integer', required: true }

    try {
        const { id } = req.params;
        const student = new Student()
        const student_data = await student.find(id);
        res.status(200).json(student_data);
    } catch (error) {
        next(error);
    }
}

export async function create(req, res, next) {
    /*   #swagger.auto = false
           #swagger.summary = 'Create a new student'
           #swagger.description = 'Endpoint to create a new student'
          #swagger.method = 'Post'
   
          #swagger.parameters['body'] = {
              in: 'body',
              description: 'Student data.',
              required: true,
              schema:  {
                  "data": {
                      "f_name": "",
                      "s_name": "",
                      "f_lastname": "",
                      "s_lastname": ""
                  },
                  "user": {
                      "email": "",
                       "registration_code": "",
                  },
                   "student": {
                       "controller_id": 1,
                       "recruiter_id": 1,
                      "country_id": 1,
                      level_id: 1,
                       
                  }    
              }
          }
            
      */
    try {
        const student = new Student()
        const { body } = req;
        const { error } = user_schema.validate(body.user);
        const { error: error_data } = data_schema.validate(body.data);

        if (error) {
            throw { message: error.message, status: 400 };
        }
        if (error_data) {
            throw { message: error_data.message, status: 400 };
        }

        const password = await hash('Funval2024', 10);
        await student.create({ ...body, password });

        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        next(error);
    }


}

export async function update(req, res, next) {
     /*   #swagger.auto = false
           #swagger.summary = 'Update a student'
           #swagger.description = 'Endpoint to update a student, can update whatever field you send in the body of the request. If you send the password field it will be hashed, do not send a field if you do not want to update it'
          #swagger.method = 'Post'
   
          #swagger.parameters['body'] = {
              in: 'body',
              description: 'Student data.',
              required: true,
              schema:  {
                  "data": {
                      "f_name": "",
                      "s_name": "",
                      "f_lastname": "",
                      "s_lastname": ""
                  },
                  "user": {
                      "email": "",
                       "registration_code": "",
                  },
                   "student": {
                       "controller_id": 1,
                       "recruiter_id": 1,
                      "country_id": 1,
                      level_id: 1,
                       
                  }    
              }
          }
            
      */
    try {
        const { id } = req.params;
        const { body } = req;
        const student = new Student()
        await student.update(id, body);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
}

/* export async function masiveCreate(req, res, next) {
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

} */



export default { create, index, show, update };