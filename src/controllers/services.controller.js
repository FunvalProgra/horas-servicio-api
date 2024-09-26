
/**
 * @description get all services
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function all(req, res, next) {
    // #swagger.tags = ['Services']
    res.json("All services");
}

/**
 * @description create a service
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function create(req, res, next) {
    // #swagger.tags = ['Services']
    res.json("Service created");
}

/**
 * @description get a service
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function show(req, res, next) {
    // #swagger.tags = ['Services']
    res.json(`Service with id ${req.params.id}`);
}

/**
 * @description update a service
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function update(req, res, next) {
    // #swagger.tags = ['Services']
    res.json(`Service with id ${req.params.id} updated`);
}

/**
 * @description delete a service
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function remove(req, res, next) {
    // #swagger.tags = ['Services']
    res.json(`Service with id ${req.params.id} deleted`);
}

export { all, create, show, update, remove };