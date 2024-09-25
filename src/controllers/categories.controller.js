

/**
 * @description get all categories
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function all(req, res, next) {
    res.json("All categories");
}

/**
 * @description create a category
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function create(req, res, next) {
    res.json("Category created");
}

/**
 * @description get a category
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function show(req, res, next) {
    res.json(`Category with id ${req.params.id}`);
}

/**
 * @description update a category
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function update(req, res, next) {
    res.json(`Category with id ${req.params.id} updated`);
}

/**
 * @description delete a category
 * @param {*} req  
 * @param {*} res 
 * @param {*} next 
 */
function remove(req, res, next) {
    res.json(`Category with id ${req.params.id} deleted`);
}


export { all, create, show, update, remove };