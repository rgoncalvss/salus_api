import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { HttpError } from '../../../shared/errors/http-error';
import { statusCode } from '../../../shared/status-code/status-code';
import { loginDTO } from '../dtos/login.dto';
import authService from '../services/auth.service';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, type } = loginDTO(req.body);
    const result = await authService.login(email, password, type);

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
    }

    next(error);
  }
};

export default {
  login,
};
