import { create, masiveCreate, remove } from '../controllers/student.controller.js';
import AccessValidation from '../middlewares/AccessValidation.middleware.js';
import { Router } from 'express';


const studen_router = Router();

studen_router.post('/student', AccessValidation, create);

studen_router.post('/student/masive', AccessValidation, masiveCreate);

studen_router.delete('/student/:id', AccessValidation, remove);

export default studen_router;