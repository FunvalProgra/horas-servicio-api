

 

/**
  *@description user login
    * @param {*} req
    * @param {*} res
    * @param {*} next
    * 
 */
function login(req, res, next) {
  // #swagger.tags = ['Auth']
    res.json("Login");    
}

/**
  *@description user logout
    * @param {*} req
    * @param {*} res
    * @param {*} next
    * 
 */
function logout(req, res, next) {
    // #swagger.tags = ['Auth']
    res.json("Logout");
}

/**
  *@description user register
    * @param {*} req
    * @param {*} res
    * @param {*} next
    * 
 */
function register(req, res, next) {
    // #swagger.tags = ['Auth']
    res.json("Register");
}
 

export  { login, logout, register };

