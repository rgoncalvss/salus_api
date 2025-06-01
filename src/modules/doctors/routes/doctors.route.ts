import express from 'express';

import { jwtVerify } from '../../../shared/middlewares/jwt-verify';
import doctorsController from '../controllers/doctors.controller';

const router = express.Router();

router.post('/', doctorsController.create);
router.get('/', jwtVerify, doctorsController.getAll);
router.get('/:id', jwtVerify, doctorsController.getById);
router.patch('/:id', jwtVerify, doctorsController.update);
router.delete('/:id', jwtVerify, doctorsController.remove);

export default router;
