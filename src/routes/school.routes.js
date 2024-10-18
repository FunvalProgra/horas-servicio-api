import { index, create, show, update } from "../controllers/school.controller.js";
import { Router } from "express";

const school_router = Router();

school_router.get("/", index);
school_router.get("/:id", show);
school_router.post("/", create);
school_router.put("/:id", update);

export default school_router;