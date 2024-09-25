
/**
 * @description get all users
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function all(req, res, next) {
    res.json("All users");
}

/**
 * @description create a user
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function create(req, res, next) {
    res.json("User created");
}

/**
 * @description get a user
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function show(req, res, next) {
    res.json(`User with id ${req.params.id}`);
}

/**
 * @description update a user
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function update(req, res, next) {
    res.json(`User with id ${req.params.id} updated`);
}

/**
 * @description delete a user
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function remove(req, res, next) {
    res.json(`User with id ${req.params.id} deleted`);
}

export { all, create, show, update, remove };