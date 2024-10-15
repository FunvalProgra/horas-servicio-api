import { all, show } from "../controllers/recruiter.controller.js";

import { Router } from "express";

const recruiter_router = Router();

recruiter_router.get("/", all);
recruiter_router.get("/:id", show);

export default recruiter_router;