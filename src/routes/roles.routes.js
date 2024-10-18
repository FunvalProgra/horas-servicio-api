import { Router } from "express";
import { all, show } from "../controllers/role.controller.js";

const roles_router = Router();

roles_router.get("/", all);
roles_router.get("/:id", show);



export default roles_router;