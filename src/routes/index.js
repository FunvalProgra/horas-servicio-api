import { Router } from "express";
import services_router from "./services.routes.js";
import user_router from "./users.routes.js";
import auth_router from "./auth.routes.js";
import roles_router from "./roles.routes.js";
import categories_router from "./categories.routes.js";
import verifyToken from "../middlewares/auth.middleware.js";

const app_router = Router();

/**  
    This function will be used to define all the routes 
    that will be used in the application.
    @param app - express app instance
*/
function routes(app) {
    app.use("/api/v1", app_router);

    app_router.use("/auth", auth_router);

    app_router.use("/services", verifyToken, services_router);
    app_router.use("/users", verifyToken, user_router);
    app_router.use("/roles", verifyToken, roles_router);
    app_router.use("/categories", verifyToken, categories_router);
}

export default routes;