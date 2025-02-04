"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const UserDal_1 = __importDefault(require("../user-management/UserDal"));
class AuthService {
    constructor() {
        this._dal = new UserDal_1.default();
    }
    ;
    async signup(user) {
        try {
            user.password = (0, bcrypt_1.hashSync)(user.password, 10);
            try {
                const storedUser = await this._dal.store(user);
                return {
                    success: true,
                    user: storedUser,
                    errorCode: 0
                };
            }
            catch (err) {
                return {
                    success: false,
                    user: null,
                    errorCode: 1
                };
            }
            ;
        }
        catch (err) {
            console.error(err);
            return {
                success: false,
                user: null,
                errorCode: 2
            };
        }
        ;
    }
    ;
    async login(email, password) {
        try {
            const foundUser = await this._dal.findByEmail(email);
            if (!foundUser || !foundUser.password) {
                return {
                    success: false,
                    refreshToken: null,
                    accessToken: null,
                    errorCode: 1
                };
            }
            else if (!await (0, bcrypt_1.compare)(password, foundUser.password)) {
                return {
                    success: false,
                    refreshToken: null,
                    accessToken: null,
                    errorCode: 2
                };
            }
            else {
                const authTokens = this.generateAuthTokens(foundUser.userId);
                foundUser.refreshToken = authTokens.refreshToken;
                this._dal.updateRefreshToken(foundUser);
                return {
                    success: true,
                    refreshToken: authTokens.refreshToken,
                    accessToken: authTokens.accessToken,
                    errorCode: 0
                };
            }
            ;
        }
        catch (err) {
            console.log(err);
            return {
                success: false,
                refreshToken: null,
                accessToken: null,
                errorCode: 3
            };
        }
        ;
    }
    ;
    async logout(userId) {
        const { success } = await this._dal.clearRefreshToken(userId);
        if (success) {
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
    }
    refreshAuthCookies(refreshToken) {
        const { success, userId } = this.validateRefreshToken(refreshToken);
        if (!success || !userId) {
            return {
                success: false,
                refreshToken: undefined,
                accessToken: undefined,
                errorCode: 2
            };
        }
        else {
            const authGen = this.generateAuthTokens(userId);
            if (authGen.accessToken && authGen.refreshToken) {
                return {
                    success: true,
                    refreshToken: authGen.refreshToken,
                    accessToken: authGen.accessToken,
                    errorCode: 0
                };
            }
            else {
                return {
                    success: false,
                    refreshToken: undefined,
                    accessToken: undefined,
                    errorCode: 1
                };
            }
            ;
        }
        ;
    }
    ;
    validateRefreshToken(refreshToken) {
        try {
            const secret = process.env.REFRESH_JWT_SECRET;
            if (!secret) {
                throw new Error('REFRESH_JWT_SECRET is not defined in the environment variables');
            }
            const decoded = jsonwebtoken_1.default.verify(refreshToken, secret);
            return {
                success: true,
                userId: decoded.userId,
                errorCode: 0
            };
        }
        catch (err) {
            return {
                success: false,
                userId: null,
                errorCode: 1
            };
        }
    }
    validateAccessToken(accessToken) {
        try {
            const secret = process.env.ACCESS_JWT_SECRET;
            if (!secret) {
                throw new Error('ACCESS_JWT_SECRET is not defined in the environment variables');
            }
            const decoded = jsonwebtoken_1.default.verify(accessToken, secret);
            const userId = Number(decoded);
            return {
                success: true,
                userId,
                errorCode: 0
            };
        }
        catch (err) {
            console.error(err);
            return {
                success: false,
                userId: null,
                errorCode: 1
            };
        }
    }
    generateRefreshToken(userId) {
        const secret = process.env.REFRESH_JWT_SECRET;
        if (!secret) {
            throw new Error('REFRESH_JWT_SECRET is not defined in the environment variables');
        }
        ;
        return jsonwebtoken_1.default.sign({ userId: userId }, secret, { expiresIn: process.env.REFRESH_JWT_LIFE });
    }
    generateAccessToken(userId) {
        const secret = process.env.ACCESS_JWT_SECRET;
        if (!secret) {
            throw new Error('ACCESS_JWT_SECRET is not defined in the environment variables');
        }
        ;
        return jsonwebtoken_1.default.sign({ userId: userId }, secret, { expiresIn: process.env.ACCESS_JWT_LIFE });
    }
    generateAuthTokens(userId) {
        const refreshToken = this.generateRefreshToken(userId);
        const accessToken = this.generateAccessToken(userId);
        return {
            refreshToken,
            accessToken,
        };
    }
    ;
}
exports.default = AuthService;
;
