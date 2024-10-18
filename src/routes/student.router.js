import { create, index, show,update } from '../controllers/student.controller.js';
import AccessValidation from '../middlewares/AccessValidation.middleware.js';
import { Router } from 'express';


const studen_router = Router();

studen_router.get('/', AccessValidation, index);

studen_router.get('/:id', show);

studen_router.post('/', AccessValidation, create);

studen_router.put('/:id', AccessValidation, update);

// studen_router.post('/student/masive', AccessValidation, masiveCreate);

// studen_router.delete('/student/:id', AccessValidation, remove);

export default studen_router;