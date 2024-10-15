import { all, create, get, remove, update } from "../controllers/school.controller.js";
import { Router } from "express";

const school_router = Router();

school_router.get("/", all);
school_router.get("/:id", get);
school_router.post("/", create);
school_router.put("/:id", update);
school_router.delete("/:id", remove);

export default school_router;