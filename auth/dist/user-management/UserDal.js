"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const UserBuilder_1 = __importDefault(require("./UserBuilder"));
class UserDal {
    constructor() {
        this._db = new client_1.PrismaClient();
        this._builder = new UserBuilder_1.default();
        this._safe = false;
    }
    ;
    get safe() {
        this._safe = true;
        return this;
    }
    ;
    async store(user) {
        try {
            const storedUser = await this._db.user.create({
                data: user
            });
            if (this._safe) {
                this._safe = false;
                return this._builder
                    .safe
                    .fromUser(storedUser)
                    .buildUser();
            }
            else {
                return this._builder
                    .fromUser(storedUser)
                    .buildUser();
            }
            ;
        }
        catch (err) {
            console.error(err);
            return null;
        }
        ;
    }
    ;
    async findByUserId(userId) {
        try {
            const foundUser = await this._db.user.findUnique({
                where: { userId }
            });
            if (!foundUser)
                return null;
            if (this._safe) {
                this._safe = false;
                return this._builder
                    .safe
                    .fromUser(foundUser)
                    .buildUser();
            }
            else {
                return this._builder
                    .fromUser(foundUser)
                    .buildUser();
            }
            ;
        }
        catch (err) {
            console.error(err);
            return null;
        }
        ;
    }
    ;
    async findByEmail(email) {
        const foundUser = await this._db.user.findUnique({
            where: { email },
        });
        if (!foundUser)
            return null;
        if (this._safe) {
            this._safe = false;
            return this._builder
                .safe
                .fromUser(foundUser)
                .buildUser();
        }
        else {
            return this._builder
                .fromUser(foundUser)
                .buildUser();
        }
        ;
    }
    ;
    async update(user) {
        const updatedUser = await this._db.user.update({
            where: { userId: user.userId },
            data: user,
        });
        if (this._safe) {
            this._safe = false;
            return this._builder
                .safe
                .fromUser(updatedUser)
                .buildUser();
        }
        else {
            return this._builder
                .fromUser(updatedUser)
                .buildUser();
        }
        ;
    }
    ;
    async updateRefreshToken(user) {
        const updatedUser = await this._db.user.update({
            where: { userId: user.userId },
            data: {
                refreshToken: user.refreshToken
            },
        });
        if (this._safe) {
            this._safe = false;
            return this._builder
                .safe
                .fromUser(updatedUser)
                .buildUser();
        }
        else {
            return this._builder
                .fromUser(updatedUser)
                .buildUser();
        }
        ;
    }
    ;
    async clearRefreshToken(userId) {
        const updatedUser = await this._db.user.update({
            where: { userId: userId },
            data: { refreshToken: null }
        });
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
        if (removedUser) {
            return this._builder
                .fromUser(removedUser)
                .buildUser();
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
