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
const DeskBuilder_1 = __importDefault(require("./DeskBuilder"));
class DeskDal {
    constructor() {
        this.db = new client_1.PrismaClient();
        this.builder = new DeskBuilder_1.default();
    }
    store(desk) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDesk = yield this.db.desk.create({
                data: {
                    user: {
                        connectOrCreate: {
                            where: { userId: desk.userId },
                            create: {
                                name: desk.name,
                                lastname: desk.lastname,
                                email: desk.email,
                                password: desk.password
                            }
                        },
                    }
                },
                select: {
                    user: {
                        select: {
                            userId: true,
                            email: true,
                            password: false,
                            name: true,
                            lastname: true,
                            refreshToken: false,
                            type: true
                        }
                    },
                    deskId: true
                }
            });
            return this.builder
                .setUserId(newDesk.userId)
                .setDeskId(newDesk.deskId)
                .setName(newDesk.user.name)
                .setLastname(newDesk.user.lastname)
                .setEmail(newDesk.user.email)
                .setPassword("")
                .setRefreshToken("")
                .build();
        });
    }
    ;
    find(deskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const desk = yield this.db.desk.findUnique({
                where: { deskId: deskId },
                select: { user: { select: {
                            userId: true,
                            email: true,
                            name: true,
                            lastname: true,
                            type: true
                        } },
                    deskId: true
                }
            });
            if (!desk)
                return null;
            return this.builder
                .setUserId(desk.userId)
                .setDeskId(desk.deskId)
                .setName(desk.user.name)
                .setLastname(desk.user.lastname)
                .setEmail(desk.user.email)
                .setPassword("")
                .setRefreshToken("")
                .build();
        });
    }
    ;
    update(desk) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDesk = yield this.db.desk.update({
                where: { deskId: desk.deskId },
                data: {
                    user: {
                        connectOrCreate: {
                            where: { userId: desk.userId }
                        },
                        create: {
                            name: desk.name,
                            lastname: desk.lastname,
                            email: desk.email,
                            password: desk.password
                        }
                    }
                },
                select: { user: { select: {
                            userId: true,
                            email: true,
                            name: true,
                            lastname: true,
                            type: true
                        } },
                    deskId: true
                }
            });
            if (!updatedDesk)
                return null;
            return this.builder
                .setUserId(updatedDesk.userId)
                .setDeskId(updatedDesk.deskId)
                .setName(updatedDesk.user.name)
                .setLastname(updatedDesk.user.lastname)
                .setEmail(updatedDesk.user.email)
                .setPassword("")
                .setRefreshToken("")
                .build();
        });
    }
    ;
    remove(deskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const desk = yield this.db.desk.delete({
                where: { deskId: deskId },
                select: { user: { select: {
                            userId: true,
                            email: true,
                            name: true,
                            lastname: true,
                            type: true
                        } },
                    deskId: true
                }
            });
            if (!desk)
                return null;
            return this.builder
                .setUserId(desk.userId)
                .setDeskId(desk.deskId)
                .setName(desk.user.name)
                .setLastname(desk.user.lastname)
                .setEmail(desk.user.email)
                .setPassword("")
                .setRefreshToken("")
                .build();
        });
    }
    ;
}
exports.default = DeskDal;
;
