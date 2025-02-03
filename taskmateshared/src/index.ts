//Errors folder exports
export * from './errors/CustomError';
export * from './errors/BadRequestError';
export * from './errors/NotAuthorizedError';
export * from './errors/UserInputValidationError';
export * from './errors/NotFoundError';

//Middlewares folder exports
export * from './middlewares/errorHandler';
export * from './middlewares/userInputValidation';
export * from './middlewares/confirmUser';
export * from './middlewares/requireAuthentication';

console.log('Random test log');
