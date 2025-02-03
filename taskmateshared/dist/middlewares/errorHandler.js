"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../errors/CustomError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError_1.CustomError) {
        res.status(err.statusCode).json({ errors: err.serializeErrors() });
        return;
    }
    console.error(err);
    res.status(500).json({
        errors: [{ message: 'An unexpected error occured on the server' }],
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map