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
const ClientDal_1 = __importDefault(require("./ClientDal"));
const bcrypt_1 = require("bcrypt");
class ClientServices {
    constructor() {
        this.dal = new ClientDal_1.default();
    }
    store(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                client.password = yield (0, bcrypt_1.hash)(client.password, 10);
                const newClient = yield this.dal.store(client);
                return {
                    success: true,
                    storedClient: newClient,
                    errorCode: 0
                };
            }
            catch (err) {
                console.error(err);
                return {
                    success: false,
                    storedClient: null,
                    errorCode: 1
                };
            }
            ;
        });
    }
    ;
    find(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield this.dal.find(clientId);
                if (client) {
                    return {
                        success: true,
                        foundClient: client,
                        errorCode: 0
                    };
                }
                else {
                    return {
                        success: false,
                        foundClient: null,
                        errorCode: 1
                    };
                }
                ;
            }
            catch (err) {
                console.error(err);
                return {
                    success: false,
                    foundClient: null,
                    errorCode: 2
                };
            }
            ;
        });
    }
    ;
    update(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedClient = yield this.dal.update(client);
                if (updatedClient) {
                    return {
                        success: true,
                        updatedClient,
                        errorCode: 0
                    };
                }
                else {
                    return {
                        success: false,
                        updatedClient: null,
                        errorCode: 1
                    };
                }
                ;
            }
            catch (err) {
                console.error(err);
                return {
                    success: false,
                    updatedClient: null,
                    errorCode: 2
                };
            }
            ;
        });
    }
    ;
    remove(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removedClient = yield this.dal.remove(clientId);
                if (removedClient) {
                    return {
                        success: true,
                        removedClient: removedClient,
                        errorCode: 0
                    };
                }
                else {
                    return {
                        success: false,
                        removedClient: null,
                        errorCode: 1
                    };
                }
                ;
            }
            catch (err) {
                console.error(err);
                return {
                    success: false,
                    removedClient: null,
                    errorCode: 2
                };
            }
            ;
        });
    }
    ;
}
exports.default = ClientServices;
;
