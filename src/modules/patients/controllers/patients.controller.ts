import { NextFunction, Request, Response } from 'express';

import { uuidDto } from '../../../shared/dtos/uuid.dto';
import { statusCode } from '../../../shared/status-code/status-code';
import { createPatientDTO } from '../dtos/create.dto';
import { updatePatientDTO } from '../dtos/update.dto';
import patientsService from '../services/patients.service';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patient = createPatientDTO(req.body);

    const result = await patientsService.create(patient);

    res.status(statusCode.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await patientsService.getAll();
    res.status(statusCode.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;

    const id = uuidDto(params.id);
    const result = await patientsService.getById(id);

    res.status(statusCode.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;

    const id = uuidDto(params.id);
    const patient = updatePatientDTO(req.body);
    const result = await patientsService.update(id, patient);

    res.status(statusCode.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;

    const id = uuidDto(params.id);
    await patientsService.remove(id);

    res.status(statusCode.OK).send({ msg: 'User removed!' });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getAll,
  getById,
  remove,
  update,
};
