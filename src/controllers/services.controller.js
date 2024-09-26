import {
  allServices,
  getServiceById,
  createService,
  updateService,
  removeService,
} from "../models/service.model.js";

/**
 * @description get all services
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function all(req, res, next) {
  const services = await allServices();
  res.json(services);
}

/**
 * @description create a service
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function create(req, res, next) {
  const {
    amountReported,
    evidence,
    description,
    userId,
    reviewerId,
    categoryId,
  } = req.body;
  const newService = await createService(
    amountReported,
    evidence,
    description,
    userId,
    reviewerId,
    categoryId
  );
  res.json({ service: newService });
}
/**
 * @description get a service
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function show(req, res, next) {
  const { id } = req.params;
  const service = await getServiceById(id);
  res.json(service);
}

/**
 * @description update a service
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function update(req, res, next) {
  const { id } = req.params;
  const {
    amountReported,
    evidence,
    description,
    userId,
    reviewerId,
    categoryId,
  } = req.body;
  const updated = await updateService(
    id,
    amountReported,
    evidence,
    description,
    userId,
    reviewerId,
    categoryId
  );
  res.json(`Service with id ${req.params.id} updated`);
}

/**
 * @description delete a service
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function remove(req, res, next) {
  const { id } = req.params;
  const deleted = await removeService(id);
  res.json(`Service with id ${req.params.id} deleted`);
}

export { all, create, show, update, remove };
