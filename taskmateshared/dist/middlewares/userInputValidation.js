"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputValidation = void 0;
const express_validator_1 = require("express-validator");
const UserInputValidationError_1 = require("../errors/UserInputValidationError");
const userInputValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new UserInputValidationError_1.UserInputValidationError(errors.array());
    }
    next();
};
exports.userInputValidation = userInputValidation;
//# sourceMappingURL=userInputValidation.js.map