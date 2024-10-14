import { all } from "../controllers/country.controller.js";
import { Router } from "express";

const country_router = Router();

country_router.get('/', all);

export default country_router;