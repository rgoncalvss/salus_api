import { NextFunction, Request, Response } from 'express';

import { uuidDto } from '../../../shared/dtos/uuid.dto';
import { statusCode } from '../../../shared/status-code/status-code';
import { createDoctorDTO } from '../dtos/create.dto';
import { updateDoctorDTO } from '../dtos/update.dto';
import doctorsService from '../services/doctors.service';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctor = createDoctorDTO(req.body);

    const result = await doctorsService.create(doctor);

    res.status(statusCode.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await doctorsService.getAll();
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
    const result = await doctorsService.getById(id);

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
    const doctor = updateDoctorDTO(req.body);
    const result = await doctorsService.update(id, doctor);

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
    await doctorsService.remove(id);

    res.status(statusCode.OK).send({ msg: 'Doctor removed!' });
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
