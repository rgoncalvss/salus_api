/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// middlewares/errorHandler.ts
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { HttpError } from '../errors/http-error';

export function errorHandler(
  err: Error | HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const message = err.message || 'Internal server error.';

  if (err instanceof ZodError) {
    const parsedErrors = err.errors.map((err) => ({
      item: err.path.join('.'),
      message: err.message,
    }));

    res.status(statusCode).json({
      details: parsedErrors,
      msg: 'Validation errors.',
    });
  }

  res.status(statusCode).json({
    error: message,
  });
}
