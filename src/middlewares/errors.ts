/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// middlewares/errorHandler.ts
import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../shared/errors/http-error';

export function errorHandler(
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const message = err.message || 'Internal server error.';

  res.status(statusCode).json({
    error: message,
  });
}
