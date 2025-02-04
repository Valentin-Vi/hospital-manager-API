"use strict";
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
const DeskService_1 = __importDefault(require("./DeskService"));
const getFalseyProperties_1 = __importDefault(require("auth/utils/getFalseyProperties"));
class DeskController {
    constructor() {
        this.serv = new DeskService_1.default();
    }
    ;
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const desk = req.body.desk;
                const falseyFields = (0, getFalseyProperties_1.default)(desk);
                if (!desk || !falseyFields.length) {
                    res.status(400)
                        .send({
                        message: `\`desk\` object has falsey fields: ${falseyFields}`,
                        desk: null
                    });
                }
                else {
                    const { errorCode } = yield this.serv.store(desk);
                    if (errorCode === 0) {
                        res.status(200)
                            .send({
                            message: 'Desk created successfully.',
                            desk: null
                        });
                    }
                    else {
                        res.status(400)
                            .send({
                            message: '\`desk\` object email property needs to be unique.',
                            desk: null
                        });
                    }
                    ;
                }
                ;
            }
            catch (err) {
                console.error(err);
                res.status(500)
                    .send({
                    message: 'Internal server error.',
                    desk: null
                });
            }
            ;
            return res;
        });
    }
    ;
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deskId = req.body.deskId;
                if (!deskId || typeof deskId !== 'number') {
                    res.status(400)
                        .send({
                        message: '\`deskId\` is either falsey or not a number.',
                        desk: null
                    });
                }
                else {
                    const { foundDesk, errorCode } = yield this.serv.find(deskId);
                    if (errorCode === 0) {
                        res.status(200)
                            .send({
                            message: 'Desk found.',
                            desk: JSON.stringify(foundDesk)
                        });
                    }
                    else if (errorCode === 1) {
                        res.status(200)
                            .send({
                            message: 'Desk not found.',
                            desk: null
                        });
                    }
                    else {
                        res.status(500)
                            .send({
                            message: 'Unexpected internal server error.',
                            desk: null
                        });
                    }
                    ;
                }
                ;
            }
            catch (err) {
                console.error(err);
                res.status(500)
                    .send({
                    message: 'Internal server error.',
                    desk: null
                });
            }
            ;
            return res;
        });
    }
    ;
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const desk = req.body.desk;
                const falseyFields = (0, getFalseyProperties_1.default)(desk);
                if (!desk || !falseyFields.length) {
                    res.status(400)
                        .send({
                        message: `Falsey fields detected: ${falseyFields}`,
                        desk: null
                    });
                }
                else {
                    const { updatedDesk, errorCode } = yield this.serv.update(desk);
                    if (updatedDesk) {
                        res.status(200)
                            .send({
                            message: 'Desk found.',
                            desk: JSON.stringify(updatedDesk)
                        });
                    }
                    else if (errorCode === 1) {
                        res.status(200)
                            .send({
                            message: 'Desk not found',
                            desk: null
                        });
                    }
                    else {
                        res.status(500)
                            .send({
                            message: 'Unexpected internal server error.',
                            desk: null
                        });
                    }
                    ;
                }
                ;
            }
            catch (err) {
                console.error(err);
                res.status(500)
                    .send({
                    message: 'Internal server error.',
                    desk: null
                });
            }
            ;
            return res;
        });
    }
    ;
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deskId = req.body.deskId;
                if (!deskId || typeof deskId !== 'number') {
                    res.status(400)
                        .send({
                        message: '\`deskId\` is either falsey or not a number.',
                        desk: null
                    });
                }
                else {
                    const { removedDesk, errorCode } = yield this.serv.remove(deskId);
                    if (removedDesk) {
                        res.status(200)
                            .send({
                            message: "Desk removed successfully.",
                            desk: JSON.stringify(removedDesk)
                        });
                    }
                    else if (errorCode === 1) {
                        res.status(200)
                            .send({
                            message: 'Desk was not found.',
                            desk: null
                        });
                    }
                    else {
                        res.status(500)
                            .send({
                            message: 'Unexpected internal server error.',
                            desk: null
                        });
                    }
                }
                ;
            }
            catch (err) {
                console.error(err);
                res.status(500)
                    .send({
                    message: 'Internal server error.',
                    desk: null
                });
            }
            ;
            return res;
        });
    }
    ;
}
exports.default = DeskController;
;
