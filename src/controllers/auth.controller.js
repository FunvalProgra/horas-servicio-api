

 

/**
  *@description user login
    * @param {*} req
    * @param {*} res
    * @param {*} next
    * 
 */
function login(req, res, next) {
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
    res.json("Register");
}
 

export  { login, logout, register };

