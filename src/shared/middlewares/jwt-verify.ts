import { NextFunction, Request, Response } from 'express';

import authService from '../../modules/auth/services/auth.service';
import { errorMessages } from '../enums/error-messages';
import { HttpError } from '../errors/http-error';
import { statusCode } from '../status-code/status-code';
import { isValidUserPayload } from '../validators/payload.validator';

export const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpError(statusCode.UNAUTHORIZED, errorMessages.UNAUTHORIZED('Token is missing'));
    }

    const decoded = authService.verifyJWT(token);
    if (!decoded) {
      throw new HttpError(statusCode.UNAUTHORIZED, errorMessages.UNAUTHORIZED('Invalid token'));
    }

    if (!isValidUserPayload(decoded)) {
      throw new HttpError(
        statusCode.UNAUTHORIZED,
        errorMessages.UNAUTHORIZED('Invalid token payload'),
      );
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
