"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const UserBuilder_1 = __importDefault(require("../src/user-management/UserBuilder"));
class UserDal {
    constructor() {
        this._db = new client_1.PrismaClient();
        this._builder = new UserBuilder_1.default();
        this._safe = false;
    }
    get safe() {
        this._safe = true;
        return this;
    }
    ;
    async store(user) {
        const storedUser = await this._db.user.create({
            data: {
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
            },
        });
        if (this._safe) {
            this._safe = false;
            return this._builder.safe.fromUser(storedUser);
        }
        else {
            return this._builder.fromUser(storedUser);
        }
        ;
    }
    ;
    async findByUserId(userId) {
        let foundUser = await this._db.user.findUnique({
            where: { userId: userId },
        });
        this._safe = false;
        if (this._safe) {
            return this._builder.safe.fromUser(foundUser);
        }
        else {
            return this._builder.fromUser(foundUser);
        }
        ;
    }
    ;
    async findByEmail(email) {
        const foundUser = await this._db.user.findUnique({
            where: { email: email },
        });
        this._safe = false;
        return this._builder.safe.fromUser(foundUser);
    }
    ;
    async update(user) {
        const updatedUser = await this._db.user.update({
            where: {
                userId: user.userId,
            },
            data: {
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password
            },
        });
        this._safe = false;
        if (updatedUser) {
            return this._builder.fromUser(updatedUser);
        }
        else {
            return null;
        }
        ;
    }
    ;
    async updateRefreshToken(user) {
        const updatedUser = await this._db.user.update({
            where: { userId: user.userId },
            data: {
                refreshToken: user.refreshToken,
            },
        });
        this._safe = false;
        if (updatedUser) {
            return this._builder.fromUser(updatedUser);
        }
        else {
            return null;
        }
        ;
    }
    ;
    async clearRefreshToken(userId) {
        const updatedUser = await this._db.user.update({
            where: { userId: userId },
            data: { refreshToken: null }
        });
        this._safe = false;
        if (updatedUser) {
            return {
                success: true,
                errorCode: 0
            };
        }
        else {
            return {
                success: false,
                errorCode: 1
            };
        }
        ;
    }
    ;
    async remove(userId) {
        const removedUser = await this._db.user.delete({
            where: {
                userId: userId,
            },
        });
        this._safe = false;
        if (removedUser) {
            return this._builder.fromUser(removedUser);
        }
        else {
            return null;
        }
        ;
    }
    ;
}
exports.default = UserDal;
;
