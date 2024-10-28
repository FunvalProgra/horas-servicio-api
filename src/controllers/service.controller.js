import { Buffer } from 'buffer';
import fs from 'fs';
import joi from 'joi';
import { Service } from "../models/service.model.js";
import { downloadFile, uploadFile, deleteFile } from "../libs/google.drive.js";


/**
 * @description get all services
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function index(req, res, next) {
  /* 
    #swagger.summary = 'Get all services'
    #swagger.description = 'Endpoint to get all services, if the user is a student, it will return only the services of the user, if the user is an admin, it will return all the services, if the status query is passed, it will return the services with the status passed, 0 for pending and 1 for approved, '
    #swagger.method = 'Get'
    #swagger.responses[200] = {
      schema: { $ref: "#/components/servicesResponse" }
    }

  */
  try {
    const { id, role } = req.auth;
    const { status } = req.query;
    if (status && !['0', '1'].includes(status)) {
      throw { status: 400, message: 'Invalid status' }
    }

    const service = new Service();
    let services_res = role.name === 'Student' ? await service.getServicesByUserId(id) : await service.all(status);
    res.status(200).json(services_res);

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
  /*   #swagger.auto = false
       #swagger.summary = 'Create a new service'
       #swagger.description = 'Endpoint to create a new service'
      #swagger.method = 'Post'

      #swagger.parameters['body'] = {
          in: 'body',
          description: 'Service data.',
          required: true,
          schema:  {
               "amount_reported": "Amount reported - number",
               "description": "Description",
               "category_id": "Category id",
               "level": "Level -",
               "evidence": "Evidence - pdf file"
          }
      }
        
  */
  let evidence = ""
  try {
    console.log(!req.file);
    if (!req.file) {
      throw { status: 400, message: 'evidence is required' }
    }
    evidence = await uploadFile('application/pdf', req.file.originalname, req.file.path);

    const { id: user_id, role } = req.auth;

    if (role.name !== "Student") {
      throw { status: 401, message: `${role.name}s are not allowed to report services.` }
    }

    const service_schema = joi.object({
      amount_reported: joi.number().required(),
      description: joi.string().required(),
      category_id: joi.number().required(),
      evidence: joi.string().required(),
      level: joi.number().required()
    });

    const { error } = service_schema.validate({ ...req.body, evidence });
    if (error) {
      throw { status: 400, message: error.details }
    }

    const service = new Service();
    await service.create({ ...req.body, user_id, evidence });
    res.status(201).json({ message: 'Service created successfully', evidence });

  } catch (error) {
    if (evidence) {
      await deleteFile(evidence);
    }
    next(error)
  } finally {
    fs.unlinkSync(req?.file?.path);
  }

}

/**
 * @description get a service
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function show(req, res, next) {
  /*
    #swagger.summary = 'Get a service'
    #swagger.description = 'Endpoint to get a service by id, if the user is a student, it will return only the services of the user, if the user is an admin, it will return all the services'
    #swagger.method = 'Get' 
    #swagger.responses[200] = {
      schema: { $ref: "#/components/servicesResponse" }
    }
  */
  try {
    const { id } = req.params;
    const { id: authId, role } = req.auth;


    if (authId != id && role.name !== "Admin") {
      throw { status: 401, message: 'Unauthorized' }
    }
    const service = new Service();
    const service_res = await service.get(id);
    if (!service_res) {
      throw { status: 404, message: 'Service not found' }
    }
    res.status(200).json(service_res);

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
  /*   #swagger.auto = false
      #swagger.summary = 'update a service'
      #swagger.description = 'Endpoint to update a service, can update amount_reported, description, category_id and evidence only, evidence is a pdf file, if the evidence is passed, it will be updated, if not, it will not be updated, the same for the other fields'
     #swagger.method = 'Post'

     #swagger.parameters['body'] = {
         in: 'body',
         description: 'Service data.',
         required: true,
         schema:  {
              "amount_reported": "Amount reported - number",
              "description": "Description",
              "category_id": "Category id",
              "level": "Level -",
              "evidence": "Evidence - pdf file"
         }
     }
       
 */
  try {

    const { id } = req.params;
    const { id: user_id } = req.auth;

    const service = new Service();
    const exist = await service.get(id);
    const fields = {}

    if (!exist) {
      throw { status: 404, message: 'Service not found' }
    }
    if (service.user_id !== user_id) {
      throw { status: 401, message: 'Unauthorized' }
    }

    if (req.file) {
      const fileId = exist.evidence;
      await deleteFile(fileId);
      const evidence = await uploadFile('application/pdf', req.file.originalname, req.file.path);
      fields['evidence'] = evidence;
    }

    const service_schema = joi.object({
      amount_reported: joi.number(),
      description: joi.string(),
      category_id: joi.number(),
      level: joi.number(),
    });

    const { error } = service_schema.validate(req.body);
    if (error) {
      throw { status: 400, message: error.details }
    }

    await service.update(id, { ...req.body, ...fields });

    res.status(201).json({ message: `Service with id ${id} updated successfully` });

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
  /*   #swagger.auto = false
     #swagger.summary = 'Review a service'
     #swagger.description = 'Endpoint to review or approved a service, can update amount_approved and comment only, comment is optional'
    #swagger.method = 'PUT'

    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Service data.',
        required: true,
        schema:  {
              "amount_approved": "Amount approved - number",
              "comment": "Comment"
        }
    }
      */
  try {
    const service = new Service();
    const { id } = req.params;
    const { id: reviewer_id } = req.auth;
    const { amount_approved, comment } = req.body

    const exist = await service.get(id);
    if (!exist) {
      throw { status: 404, message: 'Service not found' }
    }

    const values = {
      amount_approved,
      status: 1,
      reviewer_id: 11
    }


    const service_res = await service.update(id, values);


    res.status(200).json(`Service with id ${id} updated successfully`);

  } catch (error) {
    next(error)
  }
}

/**
 * @description load service report evidence
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function loadEvidence(req, res, next) {
  // #swagger.summary = 'Download service evidence o render in browser'
  // #swagger.description = 'Endpoint to download the evidence of a service, if the opt query is passed with the value download, it will download the file, if not, it will render in the browser
  try {
    const { opt } = req.query;

    const { fileId } = req.params;
    if (!fileId) {
      throw { status: 400, message: 'File id is required' }
    }

    const result = await downloadFile(fileId);

    if (!result) {
      throw { status: 404, message: 'File not found' }
    }

    const blob = result.data;
    const buffer = Buffer.from(await blob.arrayBuffer());

    res.setHeader('Content-Type', 'application/pdf');
    if (opt === 'download') {
      res.setHeader('Content-Disposition', 'attachment; filename="file.pdf"');
    } else {
      res.setHeader('Content-Disposition', 'inline; filename="file.pdf"');
    }

    res.send(buffer);

  } catch (err) {
    next(err);
  }
}

export { index, create, show, update, review, loadEvidence };
