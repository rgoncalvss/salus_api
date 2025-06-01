import express from 'express';

import appointmentsController from '../controllers/appointments.controller';

const router = express.Router();

router.post('/', appointmentsController.create);
router.get('/:id', appointmentsController.getById);
router.get('/doctors/:id', appointmentsController.getAllByDoctorId);
router.get('/patients/:id', appointmentsController.getAllByPatientId);
router.patch('/:id', appointmentsController.update);

export default router;
