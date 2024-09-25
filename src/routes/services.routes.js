import { Router } from "express";
import { all, create, update, remove, show } from "../controllers/services.controller.js";

const services_router = Router();

services_router.get("/", all);
services_router.post("/", create);
services_router.get("/:id", show);
services_router.put("/:id", update);
services_router.delete("/:id", remove);


export default services_router;
