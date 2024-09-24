import { Router } from "express";

const app_router = Router();

/**  
    This function will be used to define all the routes 
    that will be used in the application.
    @param app - express app instance
*/
function routes(app) {
    app.use("/api/v1", app_router);
}

export default routes;