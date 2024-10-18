import { create, index, update, show } from "../controllers/country.controller.js";
import { Router } from "express";

const country_router = Router();
 
country_router.get('/', index);
country_router.get('/:id', show);
country_router.post('/', create);
country_router.put('/:id', update);

export default country_router;