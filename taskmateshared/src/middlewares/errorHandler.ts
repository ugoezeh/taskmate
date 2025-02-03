import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

import { CustomError } from '../errors/CustomError';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ errors: err.serializeErrors() });
    return;
  }

  console.error(err);
  res.status(500).json({
    errors: [{ message: 'An unexpected error occured on the server' }],
  });
};
