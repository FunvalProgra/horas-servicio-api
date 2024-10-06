import { serve } from "swagger-ui-express";
import { allServices, getServiceById, createService, updateService, removeService, getServicesByUserId } from "../models/service.model.js";
import typeValidation from "../utils/TypeValidation.js";
/**
 * @description get all services
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function all(req, res, next) {
  // #swagger.tags = ['Services']
  try {
    const { id, role } = req.auth;
    let services = []
    if (role.name === 'student') {
      services = await getServicesByUserId(id);
    } else {
      services = await allServices();
    }
    res.json(services);

  } catch (error) {
    next(error)
  }

}

/**
 * @description create a service
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function create(req, res, next) {
  // #swagger.tags = ['Services']

  try {
    const { amount_reported, evidence, description, category_id } = req.body;
    const { id: user_id } = req.auth;
    const rules = {
      amount_reported: { type: 'number', required: true },
      evidence: { type: 'string', required: true },
      description: { type: 'string' },
    }

    typeValidation(req.body, rules);
    await createService(amount_reported, evidence, description, user_id, category_id);

    res.status(201).json({ message: 'Service created successfully' });
  } catch (error) {
    next(error)
  }



}

/**
 * @description get a service
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function show(req, res, next) {
  // #swagger.tags = ['Services']
  try {
    const { id } = req.params;
    const { id: authId, role } = req.auth;

    if (authId != id && role.name !== 'admin') {
      throw { status: 401, message: 'Unauthorized' }
    }

    const service = await getServiceById(id);
    res.json(service);

  } catch (error) {
    next(error)

  }

}

/**
 * @description update a service
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function update(req, res, next) {
  // #swagger.tags = ['Services']
  try {
    const { id } = req.params;
    const { id: user_id } = req.auth;
    const { amount_reported, evidence, description, category_id } = req.body;
    const service = await getServiceById(id);

    if (!service) {
      throw { status: 404, message: 'Service not found' }
    }
    if (service.user_id !== user_id) {
      throw { status: 401, message: 'Unauthorized' }
    }

    const rules = {}
    const fields = {}

    if (amount_reported) {
      rules['amount_reported'] = { type: 'number' }
      fields['amount_reported'] = amount_reported;
    }
    if (evidence) {
      rules['evidence'] = { type: 'string' }
      fields['evidence'] = evidence
    }
    if (description) {
      rules['description'] = { type: 'string' }
      fields['description'] = description;
    }
    if (category_id) {
      rules['category_id'] = { type: 'number' }
      fields['category_id'] = category_id;
    }

    typeValidation(req.body, rules);


    await updateService(fields, id);
    res.json(`Service with id ${id} updated successfully`);
  } catch (error) {
    next(error)

  }

}

/**
 * @description review a service by a reviewer
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function review(req, res, next) {
  // #swagger.tags = ['Services']
  try {
    const { id } = req.params;
    const { id: reviewerId } = req.auth;
    const { amount_approved, comment } = req.body

    const rules = {
      amount_approved: { type: 'number', required: true },
    }
    const values = {
      amount_approved,
      status: 1,
      reviewer_id: reviewerId,
    }
    if (comment) {
      rules['comment'] = { type: 'string' },
        values['comment'] = comment;
    }

    typeValidation(req.body, rules);

    await updateService(values, id);
    res.status(200).json(`Service with id ${id} updated successfully`);

  } catch (error) {
    next(error)
  }
}


/**
 * @description delete a service
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function remove(req, res, next) {
  // #swagger.tags = ['Services']
  const { id } = req.params;
  const deleted = await removeService(id);
  res.json(`Service with id ${req.params.id} deleted`);
}

export { all, create, show, update, remove, review };
