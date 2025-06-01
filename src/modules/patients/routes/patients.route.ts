import { Router } from 'express';

import { jwtVerify } from '../../../shared/middlewares/jwt-verify';
import { isDoctor } from '../../../shared/middlewares/permissions-verify';
import patientsController from '../controllers/patients.controller';

const router = Router();

router.post('/', patientsController.create);
router.get('/', jwtVerify, isDoctor, patientsController.getAll);
router.get('/:id', jwtVerify, patientsController.getById);
router.patch('/:id', jwtVerify, patientsController.update);
router.delete('/:id', jwtVerify, patientsController.remove);

export default router;
