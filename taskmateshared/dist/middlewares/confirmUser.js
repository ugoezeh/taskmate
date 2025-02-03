"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const confirmUser = (req, res, next) => {
    if (!req.session.jwt) {
        return next();
    }
    try {
        const payload = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_SECRET);
        req.user = payload;
    }
    catch (error) {
        console.log(error);
    }
    next();
};
exports.confirmUser = confirmUser;
//# sourceMappingURL=confirmUser.js.map