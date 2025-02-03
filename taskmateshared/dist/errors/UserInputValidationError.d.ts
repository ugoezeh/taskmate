import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';
export declare class UserInputValidationError extends CustomError {
    errors: ValidationError[];
    statusCode: number;
    constructor(errors: ValidationError[]);
    serializeErrors(): {
        message: string;
        field?: string;
    }[];
}
