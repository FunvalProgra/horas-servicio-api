import { Router } from "express";
import { index, show, create, update } from "../controllers/users.controller.js";
import AccessValidation from "../middlewares/AccessValidation.middleware.js";

const user_router = Router();

user_router.get("/", index);
user_router.post("/", AccessValidation, create);
user_router.get("/:id", show);
user_router.put("/:id", update);



export default user_router;