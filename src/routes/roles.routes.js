import { Router } from "express";
import { all, create, update, remove, show } from "../controllers/roles.controller.js";

const roles_router = Router();

roles_router.get("/", all);
// roles_router.post("/", create);
roles_router.get("/:id", show);
// roles_router.put("/:id", update);
// roles_router.delete("/:id", remove);


export default roles_router;