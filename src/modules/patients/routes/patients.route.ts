import { Router } from 'express';

import patientsController from '../controllers/patients.controller';

const router = Router();

router.post('/patients', patientsController.create);
router.get('/patients', patientsController.getAll);
router.get('/patients/:id', patientsController.getById);
router.patch('/patients/:id', patientsController.update);
router.delete('/patients/:id', patientsController.remove);

export default router;
