import { School } from '../models/school.model.js';
import joi from 'joi';
export async function all(req, res, next) {
    //#swagger.tags = ['Schools']
    //#swagger.description = 'Endpoint to get all schools'
    //#swagger.example = [{"id": 1, "name": "School 1"}, {"id": 2, "name": "School 2"}]

    try {
        const school = new School();
        const schools = await school.all();
        res.status(200).json(schools);
    } catch (error) {
        next(error);
    }
}

export async function get(req, res, next) {
    //#swagger.tags = ['Schools']
    //#swagger.description = 'Endpoint to get a school'
    //#swagger.parameters['id'] = { description: 'School ID' }
    //#swagger.responses[200] = { description: 'School found' }
    //#swagger.responses[404] = { description: 'School not found' }
    //#swagger.example = {"id": 1, "name": "School 1"}
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
    //#swagger.tags = ['Schools']
    //#swagger.description = 'Endpoint to create a school'
    //#swagger.parameters['name'] = { description: 'School name' }
    //#swagger.responses[201] = { description: 'School created successfully' }
    //#swagger.responses[400] = { description: 'Invalid data' }
    //#swagger.example = { "name": "School 1" }


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
    //#swagger.tags = ['Schools']
    //#swagger.description = 'Endpoint to update a school'
    //#swagger.parameters['id'] = { description: 'School ID' }
    //#swagger.parameters['name'] = { description: 'School name' }
    //#swagger.responses[201] = { description: 'School updated successfully' }
    //#swagger.responses[400] = { description: 'Invalid data' }
    //#swagger.example = { "name": "School 1" }
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

