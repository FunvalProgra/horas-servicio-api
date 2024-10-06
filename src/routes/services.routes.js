import { Router } from "express";
import AccessValidation from "../middlewares/AccessValidation.middleware.js";
import { all, create, update, review, remove, show } from "../controllers/services.controller.js";

const services_router = Router();

services_router.get("/", all);
services_router.post("/", create);
services_router.get("/:id", show);
services_router.put("/:id", update);
services_router.patch("/:id/review", AccessValidation, review);
services_router.delete("/:id", AccessValidation, remove);


export default services_router;
