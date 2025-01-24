import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import UserInputValidationError from '../errors/UserInputValidationError';

const userInputValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new UserInputValidationError(errors.array());
  }
  next();
};

export default userInputValidation;
