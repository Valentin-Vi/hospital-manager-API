"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("./AuthController"));
const authRouter = (0, express_1.Router)();
const controller = new AuthController_1.default();
authRouter.post('/signup', controller.signup);
authRouter.post('/login', controller.login);
authRouter.post('/logout', controller.logout);
authRouter.post('/refresh', controller.refreshAuthCookies);
exports.default = authRouter;
