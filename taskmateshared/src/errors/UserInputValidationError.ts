import { ValidationError } from 'express-validator';

import { CustomError } from './CustomError';

export class UserInputValidationError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid input, Please check and try again');
    Object.setPrototypeOf(this, UserInputValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
