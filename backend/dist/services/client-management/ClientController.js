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
const ClientService_1 = __importDefault(require("./ClientService"));
const getFalseyProperties_1 = __importDefault(require("../../util/getFalseyProperties"));
class ClientController {
    constructor() {
        this.service = new ClientService_1.default();
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = req.body.client;
                if (!client || JSON.stringify(client) === '{}') {
                    res.status(400)
                        .send({
                        message: "Missing client objet or is empty.",
                        client: null
                    });
                }
                else {
                    const fields = (0, getFalseyProperties_1.default)(client);
                    if (fields.length) {
                        res.status(400)
                            .send({
                            message: `Falsey properties detected: ${fields}`,
                            client: null
                        });
                    }
                    else {
                        const { success, storedClient } = yield this.service.store(client);
                        if (success) {
                            res.status(400)
                                .send({
                                message: 'Client stored.',
                                client: storedClient
                            });
                        }
                        else {
                            res.status(400)
                                .send({
                                message: 'Email must be unique.',
                                client: null
                            });
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            catch (err) {
                console.error(err);
                res.status(500).send({
                    message: 'Internal server error',
                    client: null
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
                const clientId = req.body.clientId;
                if (!clientId) {
                    res.status(400)
                        .send({
                        message: '\`clientId\` is missing or falsey.',
                        client: null
                    });
                }
                else if (typeof clientId !== 'number') {
                    res.status(400)
                        .send({
                        message: '\`clientId\` should be of type number',
                        client: null
                    });
                }
                else {
                    const { success, foundClient, errorCode } = yield this.service.find(clientId);
                    if (success) {
                        res.status(200)
                            .send({
                            message: 'Client found.',
                            client: foundClient
                        });
                    }
                    else if (errorCode === 1) {
                        res.status(200)
                            .send({
                            message: 'Client was not found',
                            client: null
                        });
                    }
                    else {
                        res.status(500)
                            .send({
                            message: 'Unknown internal server error at service layer.',
                            client: null
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
                    client: null
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
                const client = req.body.client;
                if (!client || JSON.stringify(client) === '{}') {
                    res.status(400)
                        .send({
                        message: 'Missing clienct object or is empty.',
                        client: null
                    });
                }
                else {
                    const fields = (0, getFalseyProperties_1.default)(client);
                    if (fields.length) {
                        res.status(400)
                            .send({
                            message: `Falsey fields detected: ${fields}`,
                            client: null
                        });
                    }
                    else {
                        const { updatedClient, errorCode } = yield this.service.update(client);
                        if (updatedClient) {
                            res.status(200)
                                .send({
                                message: 'Client updated.',
                                client: updatedClient
                            });
                        }
                        else if (errorCode === 1) {
                            res.status(200)
                                .send({
                                message: 'Client not found.',
                                client: null
                            });
                        }
                        else {
                            res.status(500)
                                .send({
                                message: 'Unexpected internal error at service layer.',
                                client: null
                            });
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            catch (err) {
                console.error(err);
                res.status(200)
                    .send({
                    message: 'Internal server error.',
                    client: null
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
                const clientId = req.body.clientId;
                if (!clientId) {
                    res.status(400)
                        .send({
                        message: '\`clientId\` is missing or falsey.',
                        client: null
                    });
                }
                else {
                    const { removedClient, errorCode } = yield this.service.remove(clientId);
                    if (removedClient) {
                        res.status(200)
                            .send({
                            message: 'Client removed.',
                            client: removedClient
                        });
                    }
                    else if (errorCode === 1) {
                        res.status(200)
                            .send({
                            message: 'Client not found.',
                            client: null
                        });
                    }
                    else {
                        res.status(500)
                            .send({
                            message: 'Unexpected internal server error as service layer.',
                            client: null
                        });
                    }
                }
            }
            catch (err) {
                console.log(err);
                res.status(500)
                    .send({
                    message: 'Internal server error.',
                    client: null
                });
            }
            ;
            return res;
        });
    }
    ;
}
exports.default = ClientController;
;
