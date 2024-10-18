import { Router } from "express";
import { login, profile } from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.middleware.js";
const auth_router = Router();

auth_router.post("/login", login);
auth_router.get("/profile", auth, profile);


export default auth_router;