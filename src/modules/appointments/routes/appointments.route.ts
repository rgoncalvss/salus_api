import express from 'express';

import { jwtVerify } from '../../../shared/middlewares/jwt-verify';
import appointmentsController from '../controllers/appointments.controller';

const router = express.Router();

router.post('/', jwtVerify, appointmentsController.create);
router.get('/:id', jwtVerify, appointmentsController.getById);
router.get('/doctors/:id', jwtVerify, appointmentsController.getAllByDoctorId);
router.get('/patients/:id', jwtVerify, appointmentsController.getAllByPatientId);
router.patch('/:id', jwtVerify, appointmentsController.update);
router.delete('/:id', jwtVerify, appointmentsController.remove);

export default router;
