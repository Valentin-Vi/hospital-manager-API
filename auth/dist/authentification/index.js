"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.AuthService = exports.AuthController = void 0;
const AuthController_1 = __importDefault(require("./AuthController"));
exports.AuthController = AuthController_1.default;
const AuthServices_1 = __importDefault(require("./AuthServices"));
exports.AuthService = AuthServices_1.default;
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
exports.authRouter = AuthRouter_1.default;
