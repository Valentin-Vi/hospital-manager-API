import { Request, Response } from "express";
import { Desk, DeskCreate } from 'backend/types';
import DeskService from './DeskService';
import { getFalsyPropertyNames } from "auth/utils";

export default class DeskController {
    
    public serv = new DeskService();
    
    constructor() {
    };

    public async store (
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const desk: DeskCreate = req.body.desk;
            const falseyFields = getFalsyPropertyNames<DeskCreate>(desk)
            if(!desk || !falseyFields.length) {
                res.status(400)
                .send({
                    message: `\`desk\` object has falsey fields: ${falseyFields}`,
                    desk: null
                });
            } else {
                const { errorCode } = await this.serv.store(desk);
                if(errorCode === 0) {
                    res.status(200)
                    .send({
                        message: 'Desk created successfully.',
                        desk: null
                    });
                } else {
                    res.status(400)
                    .send({
                        message: '\`desk\` object email property needs to be unique.',
                        desk: null
                    });
                };
            };
        } catch(err) {
            console.error(err);
            res.status(500)
            .send({
                message: 'Internal server error.',
                desk: null
            });
        };
        return res;
    };

    public async find (
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const deskId: number = req.body.deskId;
            if(!deskId || typeof deskId !== 'number') {
                res.status(400)
                .send({
                    message: '\`deskId\` is either falsey or not a number.',
                    desk: null
                });
            } else {
                const { foundDesk, errorCode } = await this.serv.find(deskId);
                if(errorCode === 0) {
                    res.status(200)
                    .send({
                        message: 'Desk found.',
                        desk: JSON.stringify(foundDesk)
                    });
                } else if(errorCode === 1) {
                    res.status(200)
                    .send({
                        message: 'Desk not found.',
                        desk: null
                    });
                } else {
                    res.status(500)
                    .send({
                        message: 'Unexpected internal server error.',
                        desk: null
                    });
                };
            };
        } catch(err) {
            console.error(err);
            res.status(500)
            .send({
                message: 'Internal server error.',
                desk: null
            });
        };
        return res;
    };

    public async update (
        req: Request, 
        res: Response
    ): Promise<Response> {
        try {
            const desk: Desk = req.body.desk;
            const falseyFields = getFalsyPropertyNames<Desk>(desk);
            if(!desk || !falseyFields.length) {
                res.status(400)
                .send({
                    message: `Falsey fields detected: ${falseyFields}`,
                    desk: null
                });
            } else {
                const { updatedDesk, errorCode } = await this.serv.update(desk);
                if(updatedDesk) {
                    res.status(200)
                    .send({
                        message: 'Desk found.',
                        desk: JSON.stringify(updatedDesk)
                    });
                } else if(errorCode === 1) {
                    res.status(200)
                    .send({
                        message: 'Desk not found',
                        desk: null
                    });
                } else {
                    res.status(500)
                    .send({
                        message: 'Unexpected internal server error.',
                        desk: null
                    });
                };
            };
        } catch(err) {
            console.error(err);
            res.status(500)
            .send({
                message: 'Internal server error.',
                desk: null
            });
        };
        return res;
    };

    public async remove (
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const deskId: number = req.body.deskId;
            if(!deskId || typeof deskId !== 'number') {
                res.status(400)
                .send({
                    message: '\`deskId\` is either falsey or not a number.',
                    desk: null
                });
            } else {
                const { removedDesk, errorCode } = await this.serv.remove(deskId);
                if(removedDesk) {
                    res.status(200)
                    .send({
                        message: "Desk removed successfully.",
                        desk: JSON.stringify(removedDesk)
                    });
                } else if(errorCode === 1) {
                    res.status(200)
                    .send({
                        message: 'Desk was not found.',
                        desk: null
                    });
                } else {
                    res.status(500)
                    .send({
                        message: 'Unexpected internal server error.',
                        desk: null
                    });
                }
            };
        } catch(err) {
            console.error(err);
            res.status(500)
            .send({
                message: 'Internal server error.',
                desk: null
            });
        };
        return res;
    };
};
