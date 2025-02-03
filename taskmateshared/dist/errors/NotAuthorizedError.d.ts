import { CustomError } from './CustomError';
export declare class NotAuthorizedError extends CustomError {
    statusCode: number;
    constructor(message: string);
    serializeErrors(): {
        message: string;
        field?: string;
    }[];
}
