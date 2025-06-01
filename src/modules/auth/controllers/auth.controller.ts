import { NextFunction, Request, Response } from 'express';

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
    next(error);
  }
};

export default {
  login,
};
