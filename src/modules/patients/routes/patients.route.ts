import { Router } from 'express';

import patientsController from '../controllers/patients.controller';

const router = Router();

router.post('/', patientsController.create);
router.get('/', patientsController.getAll);
router.get('/:id', patientsController.getById);
router.patch('/:id', patientsController.update);
router.delete('/:id', patientsController.remove);

export default router;
