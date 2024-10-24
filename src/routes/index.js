import { Router } from "express";
import services_router from "./service.routes.js";
import user_router from "./users.routes.js";
import auth_router from "./auth.routes.js";
import roles_router from "./roles.routes.js";
import categories_router from "./categories.routes.js";
import documentation_router from "./documentation.router.js";
import verifyToken from "../middlewares/auth.middleware.js";
import studen_router from "./student.router.js";
import country_router from "./country.routes.js";
import school_router from "./school.routes.js";
import AccessValidation from "../middlewares/AccessValidation.middleware.js";

const app_router = Router();

/**  
    This function will be used to define all the routes 
    that will be used in the application.
    @param app - express app instance
*/
function routes(app) {
    app.use("/api/v1", app_router);

    app_router.use("/auth", auth_router /* #swagger.tags = ['Auth'] #swagger.autoHeaders = false */);

    app_router.use("/services", verifyToken, services_router /* #swagger.tags = ['Services'] #swagger.autoHeaders = false #swagger.security = [{ "authorization": [] }] */);
    app_router.use("/users", verifyToken, user_router   /* #swagger.tags = ['Users'] #swagger.autoHeaders = false #swagger.security = [{ "authorization": [] }]*/);
    app_router.use("/roles", verifyToken, AccessValidation, roles_router /* #swagger.tags = ['Roles']  #swagger.autoHeaders = false #swagger.security = [{ "authorization": [] }]*/);
    app_router.use("/categories", verifyToken, categories_router /* #swagger.tags = ['Categories'] #swagger.autoHeaders = false #swagger.security = [{ "authorization": [] }] */);
    app_router.use("/students", verifyToken, studen_router /* #swagger.tags = ['Students']  #swagger.autoHeaders = false #swagger.security = [{ "authorization": [] }]*/);
    app_router.use("/country", verifyToken, country_router /* #swagger.tags = ['Country'] #swagger.autoHeaders = false #swagger.security = [{ "authorization": [] }]*/);
    app_router.use("/schools", verifyToken, school_router /* #swagger.tags = ['Schools'] #swagger.autoHeaders = false #swagger.security = [{ "authorization": [] }]*/);

    app_router.use("/docs", documentation_router /* #swagger.ignore = true */);
}

export default routes;