import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
const auth_router = Router();

auth_router.post("/login", login);


export default auth_router;