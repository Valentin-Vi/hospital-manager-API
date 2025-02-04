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
const DeskDal_1 = __importDefault(require("./DeskDal"));
const bcrypt_1 = require("bcrypt");
class DeskService {
    constructor() {
        this.dal = new DeskDal_1.default();
    }
    ;
    store(desk) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                desk.password = yield (0, bcrypt_1.hash)(desk.password, 10);
                const storedDesk = yield this.dal.store(desk);
                return {
                    success: true,
                    storedDesk,
                    errorCode: 0
                };
            }
            catch (err) {
                console.error(err);
                return {
                    success: false,
                    storedDesk: null,
                    errorCode: 1
                };
            }
            ;
        });
    }
    ;
    find(deskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundDesk = yield this.dal.find(deskId);
                if (foundDesk) {
                    return {
                        success: true,
                        foundDesk,
                        errorCode: 0
                    };
                }
                else {
                    return {
                        success: true,
                        foundDesk: null,
                        errorCode: 1
                    };
                }
                ;
            }
            catch (err) {
                console.error(err);
                return {
                    success: false,
                    foundDesk: null,
                    errorCode: 2
                };
            }
            ;
        });
    }
    ;
    update(desk) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedDesk = yield this.dal.update(desk);
                if (updatedDesk) {
                    return {
                        success: true,
                        updatedDesk,
                        errorCode: 0
                    };
                }
                else {
                    return {
                        success: true,
                        updatedDesk: null,
                        errorCode: 1
                    };
                }
                ;
            }
            catch (err) {
                console.error(err);
                return {
                    success: false,
                    updatedDesk: null,
                    errorCode: 2
                };
            }
            ;
        });
    }
    ;
    remove(deskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removedDesk = yield this.dal.remove(deskId);
                if (removedDesk) {
                    return {
                        success: true,
                        removedDesk,
                        errorCode: 0
                    };
                }
                else {
                    return {
                        success: true,
                        removedDesk,
                        errorCode: 1
                    };
                }
                ;
            }
            catch (err) {
                console.error(err);
                return {
                    success: false,
                    removedDesk: null,
                    errorCode: 2
                };
            }
            ;
        });
    }
    ;
}
exports.default = DeskService;
;
