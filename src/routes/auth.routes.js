import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controller.js";
const auth_router = Router();

auth_router.post("/login", login);
auth_router.post("/register", register);
auth_router.post("/logout", logout);

export default auth_router;