import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { uuidDto } from '../../../shared/dtos/uuid.dto';
import { HttpError } from '../../../shared/errors/http-error';
import { statusCode } from '../../../shared/status-code/status-code';
import { createAppointmentsDTO } from '../dtos/create.dto';
import { updateAppointmentsDTO } from '../dtos/update.dto';
import appointmentsService from '../services/appointments.service';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointment = createAppointmentsDTO(req.body);

    const result = await appointmentsService.create(appointment);

    res.status(statusCode.CREATED).json({
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const parsedErrors = error.errors.map((err) => ({
        item: err.path.join('.'),
        message: err.message,
      }));
      next(new HttpError(statusCode.BAD_REQUEST, { message: 'Validation errors.', parsedErrors }));
    } else {
      next(error);
    }
  }
};

const getAllByDoctorId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctorId = uuidDto(req.params.id);

    const appointments = await appointmentsService.getAllByDoctorId(doctorId);

    res.status(statusCode.OK).json({
      data: appointments,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const parsedErrors = error.errors.map((err) => ({
        item: err.path.join('.'),
        message: err.message,
      }));
      next(new HttpError(statusCode.BAD_REQUEST, { message: 'Validation errors.', parsedErrors }));
    } else {
      next(error);
    }
  }
};

const getAllByPatientId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patientId = uuidDto(req.params.id);

    const appointments = await appointmentsService.getAllByPatientId(patientId);

    res.status(statusCode.OK).json({
      data: appointments,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const parsedErrors = error.errors.map((err) => ({
        item: err.path.join('.'),
        message: err.message,
      }));
      next(new HttpError(statusCode.BAD_REQUEST, { message: 'Validation errors.', parsedErrors }));
    } else {
      next(error);
    }
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;

    const id = uuidDto(params.id);
    const result = await appointmentsService.getById(id);

    res.status(statusCode.OK).json({
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const parsedErrors = error.errors.map((err) => ({
        item: err.path.join('.'),
        message: err.message,
      }));
      next(new HttpError(statusCode.BAD_REQUEST, { message: 'Validation errors.', parsedErrors }));
    } else {
      next(error);
    }
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;

    const id = uuidDto(params.id);
    const appointment = updateAppointmentsDTO(req.body);
    const result = await appointmentsService.update(id, appointment);

    res.status(statusCode.OK).json({
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const parsedErrors = error.errors.map((err) => ({
        item: err.path.join('.'),
        message: err.message,
      }));
      next(new HttpError(statusCode.BAD_REQUEST, { message: 'Validation errors.', parsedErrors }));
    } else {
      next(error);
    }
  }
};

export default {
  create,
  getAllByDoctorId,
  getAllByPatientId,
  getById,
  update,
};
