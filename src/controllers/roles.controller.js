
/**
 * @description get all roles
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function all(req, res, next) {
    // #swagger.tags = ['Roles']
    res.json("All roles");
}

/**
 * @description create a role
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function create(req, res, next) {
    // #swagger.tags = ['Roles']
    res.json("Role created");
}

/**
 * @description get a role
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function show(req, res, next) {
    // #swagger.tags = ['Roles']
    res.json(`Role with id ${req.params.id}`);
}

/**
 * @description update a role
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function update(req, res, next) {
    // #swagger.tags = ['Roles']
    res.json(`Role with id ${req.params.id} updated`);
}

/**
 * @description delete a role
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function remove(req, res, next) {
    // #swagger.tags = ['Roles']
    res.json(`Role with id ${req.params.id} deleted`);
}


export { all, create, show, update, remove };