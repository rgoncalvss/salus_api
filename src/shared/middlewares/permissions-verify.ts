import { NextFunction, Request, Response } from 'express';

import { errorMessages } from '../enums/error-messages';
import { HttpError } from '../errors/http-error';
import { statusCode } from '../status-code/status-code';

export const isDoctor = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.type !== 'doctor') {
      throw new HttpError(statusCode.FORBIDDEN, errorMessages.FORBIDDEN);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const isPatient = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.type !== 'patient') {
      throw new HttpError(statusCode.FORBIDDEN, errorMessages.FORBIDDEN);
    }
    next();
  } catch (error) {
    next(error);
  }
};
