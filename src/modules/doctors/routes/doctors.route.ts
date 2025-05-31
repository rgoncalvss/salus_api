import express from 'express';

import doctorsController from '../controllers/doctors.controller';

const router = express.Router();

router.post('/', doctorsController.create);
router.get('/', doctorsController.getAll);
router.get('/:id', doctorsController.getById);
router.patch('/:id', doctorsController.update);
router.delete('/:id', doctorsController.remove);

export default router;
