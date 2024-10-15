import { all, show } from "../controllers/controller.controller.js";

import { Router } from "express";

const controller_router = Router();

controller_router.get("/", all);
controller_router.get("/:id", show);

export default controller_router;