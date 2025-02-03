"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthentication = void 0;
const NotAuthorizedError_1 = require("../errors/NotAuthorizedError");
const requireAuthentication = (req, res, next) => {
    if (!req.user) {
        throw new NotAuthorizedError_1.NotAuthorizedError('You must be logged in to access this route');
    }
    next();
};
exports.requireAuthentication = requireAuthentication;
//# sourceMappingURL=requireAuthentication.js.map