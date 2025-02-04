import { Request, Response } from "express";
import * as serv from './userServices';
import { UserCreate, UserUpdate } from "auth/types/User";
import getFalsyPropertyNames from "auth/utils/getFalseyProperties";

export async function store (
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const user: UserCreate = req.body.user;
        const falseyFields = getFalsyPropertyNames<UserCreate>(user);
        if(falseyFields.length) {
            res.status(400).send({
                message: `Falsy fields detected: ${falseyFields}`
            });
            return res;
        };

        const { success, errorCode } = await serv.store(user);

        if(success) {
            res
            .status(200)
            .send({
                message: "User stored successfully."
            });
        } else {
            res
            .status(500)
            .send({
                message: 'Uknown internal server error',
                errorCode: errorCode
            });
        };
        return res;
    } catch(err) {
        console.error(err);
        res.status(500)
        .send({
            message: 'Internal server error.'
        });
        return res;
    };
};

export async function find (
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const param: number | string = req.body.param;
        if(!param) {
            res.status(400)
            .send({
                message: "Param value is falsey and should not be."
            });
            return res;
        };
        
        const { success, foundUser, errorCode } = await serv.find(param);

        if(success) {
            res.status(200)
            .send({
                message: 'User found.',
                foundUser: foundUser,
            });
        } else {
            res.status(400)
            .send({
                message: 'User was not found.',
            });
        };
        return res;
    } catch(err) {
        console.error(err);
        res.status(500)
        .send({
            message: "Internal server error."
        });
        return res;
    };
};

export async function update (
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const user: UserUpdate = req.body.user;
        const falseyFields = getFalsyPropertyNames<UserUpdate>(user);
        if(falseyFields.length) {
            res.status(400)
            .send({
                message: `Falsey field detected: ${falseyFields}.`
            });
            return res;
        };

        const { success, errorCode } = await serv.update(user);
        if(success) {
            res.status(200)
            .send({
                message: 'User updated successfully.'
            });
        } else if(errorCode === 1) {
            res.status(200)
            .send({
                message: "Provided \`userId\` was not found."
            });
        } else {
            res.status(500)
            .send({
                message: 'Unknown internal server error.'
            });
        };
        return res;
    } catch(err) {
        console.error(err);
        res.status(500)
        .send({
            message: "Internal server error."
        });
        return res;
    };
};

export async function remove (
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const userId: number = req.body.userId;
        if(!userId) {
            res.status(400)
            .send({
                message: 'Either provided \`userId\` is falsey or request was not formatted appropriately.'
            });
            return res;
        };
        const { success, errorCode } = await serv.remove(userId);
        if(success) {
            res.status(200)
            .send({
                message: 'User was removed successfully.'
            });
        } else if(errorCode === 1) {
            res.status(200)
            .send({
                message: 'Provided \`userId\` was not found'
            });
        } else {
            res.status(500)
            .send({
                message: 'Unknown internal server error.'
            });
        };
        return res;
    } catch(err) {
        console.error(err);
        res.status(500)
        .send({
            message: 'Internal server error.'
        });
        return res;
    };
};
