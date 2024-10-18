import { Router } from "express";
import { all, create, update, show } from "../controllers/category.controller.js";

const categories_router = Router();

categories_router.get("/", all);
categories_router.post("/", create);
categories_router.get("/:id", show);
categories_router.put("/:id", update);
/* categories_router.delete("/:id", remove); */


export default categories_router;