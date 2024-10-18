import { Category } from "../models/category.model.js";
import joi from 'joi'


async function all(req, res, next) {
  // #swagger.summary = 'Get all categories'
  // #swagger.description = 'Endpoint to get all service categories'

  try {
    const category = new Category();
    const categories = await category.all();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }

}

async function create(req, res, next) {
 /*   #swagger.auto = false
        #swagger.summary = 'Create a new category'
        #swagger.description = 'Endpoint to create a new category'
       #swagger.method = 'Post'

       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Category data.',
           required: true,
           schema:  {
                "name": "Category name",
                "description": "Category description"
           }
       }
         
   */
  try {
    const category_schema = joi.object({
      name: joi.string().required(),
      description: joi.string()
    })
    const { error } = category_schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details);
    }
    const category = new Category();
     await category.create(req.body);
    res.status(201).json({ message: 'Category created successfully'});
  } catch (error) {
    next(error);

  }
}

async function show(req, res, next) {
   // #swagger.summary = 'Get category by id'
  // #swagger.description = 'Endpoint to get a category by id'
  try {
    const category = new Category();
    const category_res = await category.get(req.params.id);
    if (!category_res) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category_res);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
   /*   #swagger.auto = false
        #swagger.summary = 'Update a category'
        #swagger.description = 'Endpoint to update a category, can update name and description only'
       #swagger.method = 'Post'

       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Category data.',
           required: true,
           schema:  {
                "name": "Category name",
                "description": "Category description"
           }
       }
         
   */
  try {

    const {id} = req.params;
    const category = new Category();
    const exist = await category.get(id);

    if (!exist) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const category_schema = joi.object({
      name: joi.string(),
      description: joi.string()
    })
    const { error } = category_schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details);
    }
 
    const updatedCategory = await category.update(req.params.id, req.body);
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    next(error);
  }
}

 
export { all, create, show, update };
