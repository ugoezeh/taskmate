import { Request, Response, NextFunction } from 'express';

import { NotAuthorizedError } from '../errors/NotAuthorizedError';

export const requireAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new NotAuthorizedError('You must be logged in to access this route');
  }
  next();
};
