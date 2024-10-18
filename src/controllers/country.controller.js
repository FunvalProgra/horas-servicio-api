import joi from "joi";
import { Country } from "../models/country.model.js";

export const index = async (req, res, next) => {   
    //#swagger.summary = 'Get all countries';
    //#swagger.description = 'get all countries';
    try {
        const country = new Country();
        const countries = await country.all();
        res.status(200).json(countries);
    } catch (error) {
        next(error);
    }
}

export const show = async (req, res, next) => {
    //#swagger.summary = 'Get a country by id';
    //#swagger.description = 'get a country by id';
    try {
        const country = new Country();
        const countries = await country.get(req.params.id);
        res.status(200).json(countries);
    } catch (error) {
        next(error);
    }
}

export const create = async (req, res, next) => {

    /*   #swagger.auto = false
          #swagger.summary = 'Create a new country'
          #swagger.description = 'Endpoint to create a new country'
         #swagger.method = 'Post'
  
         #swagger.parameters['body'] = {
             in: 'body',
             description: 'Country information.',
             required: true,
             schema:  {
                  $name: 'country name',
             }
         }
           
     */
    try {
        const country_schema = joi.object({
            name: joi.string().required(),
        })

        const { error } = country_schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const country = new Country();
        const countries = await country.create(req.body);
        res.status(200).json({ message: 'Country created successfully'});
    } catch (error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
    /*   #swagger.auto = false
         #swagger.summary = 'update a country'
         #swagger.description = 'Endpoint to update a country'
        #swagger.method = 'PUT'
 
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Country data.',
            required: true,
            schema:  {
                 $name: 'country name',
            }
        }
          
    */
    try {
        const country_schema = joi.object({
            name: joi.string().required(),
        })

        const { error } = country_schema.validate(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        const country = new Country();

        const exist = await country.get(req.params.id);

        if (!exist) return res.status(404).json({ error: 'Country not found' });

        const countries = await country.update(req.params.id, req.body);
        res.status(200).json({ message: 'Country updated successfully' });
    } catch (error) {
        next(error);
    }
}


export default { index, show, create, update };