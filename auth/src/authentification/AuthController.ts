import getFalseyPropertyNames from "../utils/getFalseyPropertyNames";
import { Request, Response } from "express";
import { UserCreate } from "../types/User";
import AuthService from './AuthServices';

export default class AuthController {

    private _service: AuthService;
    private _REFRESH_TOKEN_MAX_AGE = 1000 * 60 * 60 * 24 * 30 // 30 days //
    private _ACCESS_TOKEN_MAX_AGE = 1000 * 60 * 60 // 1 hour //

    constructor() {
        this._service = new AuthService();
        
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.refreshAuthCookies = this.refreshAuthCookies.bind(this);
    };
    
    public async signup (
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const user: UserCreate = req.body.user;
            if(!user || !user.email || !user.password || !user.name || !user.name) {
                res.status(400)
                .send({
                    message: "Missing user object or has falsey fields email, password, name, and/or lastname."
                });
            } else {
                const falseyFieldNames = getFalseyPropertyNames<UserCreate>(user);
                if(falseyFieldNames.length) {
                    res.status(400)
                    .send({
                        message: `Falsey fields detected: ${falseyFieldNames}.`
                    });
                } else {
                    const { success, errorCode } = await this._service.signup(user)
                    if(success) {
                        res.status(200)
                        .send({
                            message: 'Signup sucesful.'
                        });
                    } else if(errorCode === 1) {
                        res.status(200)
                        .send({
                            message: 'Email must be unique.'
                        });
                    } else {
                        res.status(500)
                        .send({
                            message: 'Unknown internal server error at service layer.'
                        });
                    };
                };
            };
        } catch(err) {
            console.error(err);
            res.status(500)
            .send({
                message: 'Internal server error.'
            });
        };
        return res;
    };
    
    public async login (
        req: Request,
        res: Response
    ) : Promise< Response > {
        try {
            const email = req.body.email;
            const password = req.body.password;
            if(!email || !password) {
                res.status(400)
                .send({
                    message: 'Email and or password strings are invalid.'
                });
            } else {
                const { errorCode, refreshToken, accessToken } = await this._service.login(email, password);
                if(errorCode === 0) {
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        sameSite: 'none',
                        maxAge: this._REFRESH_TOKEN_MAX_AGE
                    });
                    res.cookie('accessToken', accessToken, {
                        httpOnly: true,
                        sameSite: 'none',
                        maxAge: this._REFRESH_TOKEN_MAX_AGE
                    });
                    res.status(200)
                    .send({
                        message: 'Login successful.'
                    });
                } else if(errorCode === 1) {
                    res.status(200)
                    .send({
                        message: 'Email was not found or its password is invalid.'
                    });
                } else if(errorCode === 2){
                    res.status(400)
                    .send({
                        message: 'Incorrect password.'
                    });
                } else {
                    res.status(500)
                    .send({
                        message: 'Unexpected internal server error in service layer.'
                    });
                };
            };
        } catch(err) {
            console.error(err);
            res.status(500)
            .send({
                message: 'Internal server error.'
            });
        };
        return res;
    };
    
    public async refreshAuthCookies (
        req: Request,
        res: Response
    ) : Promise< Response > {
        try {
            const oldRefreshToken: string = req.cookies.refreshToken;
            if(!oldRefreshToken) {
                res.status(400)
                .send({
                    message: 'Missing refreshToken.'
                });
            } else {
                const { success, refreshToken, accessToken } = this._service.refreshAuthCookies(oldRefreshToken);
                if(success) {
                    res
                    .cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        sameSite: 'none',
                        maxAge: this._REFRESH_TOKEN_MAX_AGE
                    })
                    .cookie('accessToken', accessToken, {
                        httpOnly: true,
                        sameSite: 'none',
                        maxAge: this._ACCESS_TOKEN_MAX_AGE
                    })
                    .status(200)
                    .send({
                        message: 'Auth cookies refreshed.'
                    });
                } else {
                    res.status(400)
                    .send({
                        message: 'Invalid refreshToken.'
                    });
                };
            };
        } catch(err) {
            console.error(err)
            res.status(500).send({
                message: 'Internal server error.'
            });
        };
        return res;
    };
    
    public async logout (
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const refreshToken = req.cookies.refreshToken;
            const { userId } = this._service.validateRefreshToken(refreshToken);
            console.log(userId)
            if(!userId || typeof userId !== 'number') {
                res.status(400)
                .send({
                    message: 'RereshToken invalid.'
                });
            } else {
                await this.clearAuthCookies(req, res);
                const { success } = await this._service.logout(userId);
                if(success) {
                    res.status(200)
                    .send({
                        message: 'Logout successful.'
                    });
                } else {
                    res.status(200)
                    .send({
                        message: 'Auth cookies cleared. User not found.'
                    });
                };
            };
        } catch(err) {
            console.error(err);
            res.status(500)
            .send({
                message: 'Intenral server error.'
            });
        };
        return res;
    };
    
    async clearAuthCookies (
        req: Request,
        res: Response
    ): Promise<{
        success: true | false,
        errorCode: 0 | 1
    }> {
        try {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: 'none',
            });
            res.clearCookie('accessToken', {
                httpOnly: true,
                sameSite: 'none',
            });
            return {
                success: true,
                errorCode: 0
            };
        } catch(err) {
            console.error(err);
            return {
                success: false,
                errorCode: 1
            };
        };
    };    
};
