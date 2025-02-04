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
const client_1 = require("@prisma/client");
const ClientBuilder_1 = __importDefault(require("./ClientBuilder"));
class ClientDal {
    constructor() {
        this._db = new client_1.PrismaClient();
        this._builder = new ClientBuilder_1.default();
    }
    store(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClient = yield this._db.client.create({
                data: {
                    user: {
                        connectOrCreate: {
                            where: { userId: client.user.userId },
                            create: {
                                name: client.name,
                                lastname: client.lastname,
                                email: client.email,
                                password: client.password,
                            }
                        },
                    }
                },
                select: {
                    user: {
                        select: {
                            userId: true,
                            email: true,
                            name: true,
                            lastname: true,
                            type: true
                        }
                    },
                    clientId: true
                }
            });
            return this._builder
                .setUser(newClient.user)
                .setClientId(newClient.clientId)
                .setVisits(newClient.visit)
                .buildClient();
        });
    }
    ;
    find(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundClient = yield this._db.client.findUnique({
                where: { clientId: clientId },
                select: {
                    user: {
                        select: {
                            userId: true,
                            email: true,
                            name: true,
                            lastname: true,
                            type: true
                        }
                    },
                    clientId: true,
                    visits: {
                        select: {
                            visitId: true,
                            cratedAt: true,
                            updatedAt: true,
                            visitDate: true
                        }
                    }
                }
            });
            if (foundClient) {
                return this._builder
                    .setUser(foundClient.user)
                    .setClientId(foundClient.clientId)
                    .setVisits(foundClient.visits)
                    .buildClient();
            }
            else {
                return null;
            }
            ;
        });
    }
    ;
    update(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundClient = yield this._db.client.update({
                where: { clientId: client.user.clientId },
                data: {
                    user: {
                        connectOrCreate: {
                            where: { userId: client.user.userId },
                        },
                        create: {
                            name: client.user.name,
                            lastname: client.user.lastname,
                            email: client.user.email,
                            password: client.user.password,
                        }
                    }
                },
                select: {
                    user: {
                        select: {
                            userId: true,
                            email: true,
                            name: true,
                            lastname: true,
                            type: true
                        }
                    },
                    clientId: true
                }
            });
            if (foundClient) {
                return this._builder
                    .setUser(foundClient.user)
                    .setClientId(foundClient.clientId)
                    .buildClient();
            }
            else {
                return null;
            }
            ;
        });
    }
    ;
    remove(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedClient = yield this._db.client.delete({
                where: { clientId: clientId },
                select: {
                    user: {
                        select: {
                            userId: true,
                            email: true,
                            name: true,
                            lastname: true,
                            type: true
                        }
                    },
                    clientId: true
                }
            });
            if (deletedClient) {
                return this._builder
                    .setUser(deletedClient.user)
                    .setClientId(deletedClient.clientId)
                    .setVisits(deletedClient.visits)
                    .buildClient();
            }
            else {
                return null;
            }
            ;
        });
    }
    ;
}
exports.default = ClientDal;
;
