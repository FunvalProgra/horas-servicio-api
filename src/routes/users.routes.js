import { Router } from "express";
import { all, create, show, update, remove } from "../controllers/users.controller.js";
import AccessValidation from "../middlewares/AccessValidation.middleware.js";
const user_router = Router();

user_router.get("/", all);
user_router.post("/", AccessValidation, create);
user_router.get("/:id", show);
user_router.put("/:id", update);
user_router.delete("/:id", AccessValidation, remove);


export default user_router;