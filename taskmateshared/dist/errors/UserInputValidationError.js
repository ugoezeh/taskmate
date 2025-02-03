"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputValidationError = void 0;
const CustomError_1 = require("./CustomError");
class UserInputValidationError extends CustomError_1.CustomError {
    constructor(errors) {
        super('Invalid input, Please check and try again');
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, UserInputValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((err) => {
            if (err.type === 'field') {
                return { message: err.msg, field: err.path };
            }
            return { message: err.msg };
        });
    }
}
exports.UserInputValidationError = UserInputValidationError;
//# sourceMappingURL=UserInputValidationError.js.map