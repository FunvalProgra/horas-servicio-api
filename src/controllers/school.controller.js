import { School } from '../models/school.model.js';
import joi from 'joi';

export async function index(req, res, next) {
    //#swagger.summary = 'Get all schools'
    //#swagger.description = 'Endpoint to get all schools'

    try {
        const school = new School();
        const schools = await school.all();
        res.status(200).json(schools);
    } catch (error) {
        next(error);
    }
}

export async function show(req, res, next) {
    //#swagger.summary = 'Get a school'
    //#swagger.description = 'Endpoint to get a school'

    try {
        const school = new School();
        const { id } = req.params;
        const response = await school.get(id);
        if (!response) {
            return res.status(404).json({ message: "School not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export async function create(req, res, next) {

    /*   #swagger.auto = false
        #swagger.summary = 'Create a new school'
        #swagger.description = 'Endpoint to create a new school'
       #swagger.method = 'Post'
 
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'School Data',
           required: true,
           schema:  {
                $name: 'school name',
           }
       }
         
   */

    try {
        const schema = joi.object({
            name: joi.string().required()
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details);
        }
        const body = {
            name: req.body.name
        }
        const school = new School();

        await school.create(body);
        res.status(201).json({ message: "School created successfully" });
    } catch (error) {
        next(error);
    }
}

export async function update(req, res, next) {
    /*   #swagger.auto = false
      #swagger.summary = 'Updata a new school'
      #swagger.description = 'Endpoint to updata a new school'
     #swagger.method = 'Post'
 
     #swagger.parameters['body'] = {
         in: 'body',
         description: 'School Data',
         required: true,
         schema:  {
              $name: 'school name',
         }
     }
       
 */
    try {
        const schema = joi.object({
            name: joi.string().required()
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details);
        }
        const school = new School();
        const schoolExists = await school.get(req.params.id);
        if (!schoolExists) {
            return res.status(404).json({ message: "School not found" });
        }
        const body = { name: req.body.name }
        await school.update(req.params.id, body);
        res.status(201).json({ message: "School updated successfully" });
    } catch (error) {
        next(error);
    }

}

export default { index, show, create, update };