import { Router } from "express";
import { all, create, show, update, remove } from "../controllers/users.controller.js";

const user_router = Router();

user_router.get("/", all);
user_router.post("/", create);
user_router.get("/:id", show);
user_router.put("/:id", update);
user_router.delete("/:id", remove);


export default user_router;