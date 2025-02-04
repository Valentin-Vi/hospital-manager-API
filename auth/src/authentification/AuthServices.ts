import jwt from "jsonwebtoken";
import { compare, hashSync } from "bcrypt";   
import User, { UserCreate } from '../types/User';
import UserDal from "../user-management/UserDal";

export default class AuthService {

    public _dal: UserDal;

    constructor() {
        this._dal = new UserDal();
    };

    public async signup (
        user: UserCreate
    ): Promise<{
        success: true | false,
        user: User | null,
        errorCode: 0 | 1 | 2,
    }> {
        try {
            user.password = hashSync(user.password, 10);
            try {
                const storedUser = await this._dal.store(user);
                return {
                    success: true,
                    user: storedUser,
                    errorCode: 0
                };
            } catch(err) {
                return {
                    success: false,
                    user: null,
                    errorCode: 1
                };
            };
        } catch(err) {
            console.error(err);
            return {
                success: false,
                user: null,
                errorCode: 2
            };
        };
    };
    
    public async login (
        email: string,
        password: string
    ): Promise<{
        success: true | false,
        refreshToken: string | null,
        accessToken: string | null,
        errorCode: 0 | 1 | 2 | 3
    }> {
        try {
            const foundUser = await this._dal.findByEmail(email);
            if(!foundUser || !foundUser.password) {
                return {
                    success: false,
                    refreshToken: null,
                    accessToken: null,
                    errorCode: 1
                };
            } else if(!await compare(password, foundUser.password)) {
                return {
                    success: false,
                    refreshToken: null,
                    accessToken: null,
                    errorCode: 2
                };
            } else {
                const authTokens = this.generateAuthTokens(foundUser.userId);
                foundUser.refreshToken = authTokens.refreshToken;
                this._dal.updateRefreshToken(foundUser);
                return {
                    success: true,
                    refreshToken: authTokens.refreshToken,
                    accessToken: authTokens.accessToken,
                    errorCode: 0
                };
            };
        } catch(err) {
            console.log(err);
            return {
                success: false,
                refreshToken: null,
                accessToken: null,
                errorCode: 3
            };
        };
    };
    
    public async logout(
        userId: number
    ): Promise<{
        success: true | false,
        errorCode: 0 | 1
    }> {
        const { success } = await this._dal.clearRefreshToken(userId);
        if(success) {
            return {
                success: true,
                errorCode: 0
            }
        } else {
            return {
                success: false,
                errorCode: 1
            }
        }
    }
    
    public refreshAuthCookies(
        refreshToken: string
    ): {
        success: true |  false,
        refreshToken: string | undefined,
        accessToken: string | undefined,
        errorCode: 0 | 1 | 2
    } {
        const { success, userId } = this.validateRefreshToken(refreshToken)
        if(!success || !userId) {
            return {
                success: false,
                refreshToken: undefined,
                accessToken: undefined,
                errorCode: 2
            };
        } else {
            const authGen = this.generateAuthTokens(userId);
            if(authGen.accessToken && authGen.refreshToken) {
                return {
                    success: true,
                    refreshToken: authGen.refreshToken,
                    accessToken: authGen.accessToken,
                    errorCode: 0
                }
            } else {
                return {
                    success: false,
                    refreshToken: undefined,
                    accessToken: undefined,
                    errorCode: 1
                };
            };
        };
    };
    
    public validateRefreshToken(
        refreshToken: string
    ) : {
        success: true | false,
        userId: number | null,
        errorCode: 0 | 1
    } {
        try {
            const secret: string | undefined = process.env.REFRESH_JWT_SECRET;
            if(!secret) {
                throw new Error('REFRESH_JWT_SECRET is not defined in the environment variables')
            }
            const decoded: { userId: number, iat: number, exp: number } | any = jwt.verify(refreshToken, secret);
            return {
                success: true,
                userId: decoded.userId,
                errorCode: 0
            }
        } catch(err) {
            return {
                success: false,
                userId: null,
                errorCode: 1
            }
        }
    }
    
    public validateAccessToken (
        accessToken: string
    ) : {
        success: true | false,
        userId: number | null,
        errorCode: 0 | 1
    } {
        try {
            const secret: string | undefined = process.env.ACCESS_JWT_SECRET;
            if(!secret) {
                throw new Error('ACCESS_JWT_SECRET is not defined in the environment variables')
            }
            const decoded = jwt.verify(accessToken, secret);
            const userId = Number(decoded);
            return {
                success: true,
                userId,
                errorCode: 0
            }
        } catch(err) {
            console.error(err)
            return {
                success: false,
                userId: null,
                errorCode: 1
            }
        }
    }
    
    public generateRefreshToken (
        userId: number
    ): string {
        const secret: string | undefined = process.env.REFRESH_JWT_SECRET;
        if(!secret) {
            throw new Error('REFRESH_JWT_SECRET is not defined in the environment variables')
        };
        return jwt.sign(
            { userId: userId },
            secret,
            { expiresIn: process.env.REFRESH_JWT_LIFE }
        );
    }
    
    public generateAccessToken (
        userId: number
    ): string {
        const secret: string | undefined = process.env.ACCESS_JWT_SECRET;
        if(!secret) {
            throw new Error('ACCESS_JWT_SECRET is not defined in the environment variables')
        };
        return jwt.sign(
            { userId: userId },
            secret,
            { expiresIn: process.env.ACCESS_JWT_LIFE }
        );
    }
    
    public generateAuthTokens(
        userId: number
    ) : {
        refreshToken: string,
        accessToken: string,
    } {
        const refreshToken = this.generateRefreshToken(userId)
        const accessToken = this.generateAccessToken(userId)
    
        return { 
            refreshToken, 
            accessToken,
        };
    };
};
