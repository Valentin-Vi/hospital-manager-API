"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = store;
exports.find = find;
exports.update = update;
exports.remove = remove;
const serv = __importStar(require("./userServices"));
const getFalseyProperties_1 = __importDefault(require("auth/utils/getFalseyProperties"));
function store(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body.user;
            const falseyFields = (0, getFalseyProperties_1.default)(user);
            if (falseyFields.length) {
                res.status(400).send({
                    message: `Falsy fields detected: ${falseyFields}`
                });
                return res;
            }
            ;
            const { success, errorCode } = yield serv.store(user);
            if (success) {
                res
                    .status(200)
                    .send({
                    message: "User stored successfully."
                });
            }
            else {
                res
                    .status(500)
                    .send({
                    message: 'Uknown internal server error',
                    errorCode: errorCode
                });
            }
            ;
            return res;
        }
        catch (err) {
            console.error(err);
            res.status(500)
                .send({
                message: 'Internal server error.'
            });
            return res;
        }
        ;
    });
}
;
function find(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const param = req.body.param;
            if (!param) {
                res.status(400)
                    .send({
                    message: "Param value is falsey and should not be."
                });
                return res;
            }
            ;
            const { success, foundUser, errorCode } = yield serv.find(param);
            if (success) {
                res.status(200)
                    .send({
                    message: 'User found.',
                    foundUser: foundUser,
                });
            }
            else {
                res.status(400)
                    .send({
                    message: 'User was not found.',
                });
            }
            ;
            return res;
        }
        catch (err) {
            console.error(err);
            res.status(500)
                .send({
                message: "Internal server error."
            });
            return res;
        }
        ;
    });
}
;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body.user;
            const falseyFields = (0, getFalseyProperties_1.default)(user);
            if (falseyFields.length) {
                res.status(400)
                    .send({
                    message: `Falsey field detected: ${falseyFields}.`
                });
                return res;
            }
            ;
            const { success, errorCode } = yield serv.update(user);
            if (success) {
                res.status(200)
                    .send({
                    message: 'User updated successfully.'
                });
            }
            else if (errorCode === 1) {
                res.status(200)
                    .send({
                    message: "Provided \`userId\` was not found."
                });
            }
            else {
                res.status(500)
                    .send({
                    message: 'Unknown internal server error.'
                });
            }
            ;
            return res;
        }
        catch (err) {
            console.error(err);
            res.status(500)
                .send({
                message: "Internal server error."
            });
            return res;
        }
        ;
    });
}
;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.body.userId;
            if (!userId) {
                res.status(400)
                    .send({
                    message: 'Either provided \`userId\` is falsey or request was not formatted appropriately.'
                });
                return res;
            }
            ;
            const { success, errorCode } = yield serv.remove(userId);
            if (success) {
                res.status(200)
                    .send({
                    message: 'User was removed successfully.'
                });
            }
            else if (errorCode === 1) {
                res.status(200)
                    .send({
                    message: 'Provided \`userId\` was not found'
                });
            }
            else {
                res.status(500)
                    .send({
                    message: 'Unknown internal server error.'
                });
            }
            ;
            return res;
        }
        catch (err) {
            console.error(err);
            res.status(500)
                .send({
                message: 'Internal server error.'
            });
            return res;
        }
        ;
    });
}
;
