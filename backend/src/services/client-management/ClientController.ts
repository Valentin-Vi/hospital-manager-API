import { getFalseyPropertyNames } from "auth/utils";
import { Client, ClientCreate } from 'backend/types';
import { Request, Response } from "express";
import { ClientService } from 'backend';

export default class ClientController {
    
    private _service: ClientService;

    constructor() {
        this._service = new ClientService();

        // this.store = this.store.bind(this);
        // this.find = this.find.bind(this);
        // this.update = this.update.bind(this);
        // this.remove = this.remove.bind(this);
    };

    // public async store (
    //     req: Request,
    //     res: Response
    // ): Promise<Response> {
    //     try {
    //         const client: ClientCreate = req.body.client;
    //         if(!client || !client.email || !client.password || !client.name || !client.lastname) {
    //             res.status(400)
    //             .send({
    //                 message: "Missing client objet or is empty.",
    //                 client: null
    //             });
    //         } else {
    //             const fields = getFalseyPropertyNames<ClientCreate>(client);
    //             if(fields.length) {
    //                 res.status(400)
    //                 .send({
    //                     message: `Falsey properties detected: ${fields}`,
    //                     client: null
    //                 });
    //             } else {
    //                 const { success, storedClient } = await this._service.store(client);
    //                 if(success) {
    //                     res.status(400)
    //                     .send({
    //                         message: 'Client stored.',
    //                         client: storedClient
    //                     });
    //                 } else {
    //                     res.status(400)
    //                     .send({
    //                         message: 'Email must be unique.',
    //                         client: null
    //                     });
    //                 };
    //             };    
    //         };
    //     } catch(err) {
    //         console.error(err);
    //         res.status(500).send({
    //             message: 'Internal server error',
    //             client: null
    //         });
    //     };
    //     return res;
    // };

    // public async find(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const clientId: number = req.body.clientId;
    //         if(!clientId) {
    //             res.status(400)
    //             .send({
    //                 message: '\`clientId\` is missing or falsey.',
    //                 client: null
    //             });
    //         } else if(typeof clientId !== 'number') {
    //             res.status(400)
    //             .send({
    //                 message: '\`clientId\` should be of type number',
    //                 client: null
    //             });
    //         } else {
    //             const { success, foundClient, errorCode } = await this._service.find(clientId);
    //             if(success) {
    //                 res.status(200)
    //                 .send({
    //                     message: 'Client found.',
    //                     client: foundClient
    //                 });
    //             } else if(errorCode === 1) {
    //                 res.status(200)
    //                 .send({
    //                     message: 'Client was not found',
    //                     client: null
    //                 });
    //             } else {
    //                 res.status(500)
    //                 .send({
    //                     message: 'Unknown internal server error at service layer.',
    //                     client: null
    //                 });
    //             };
    //         };
    //     } catch(err) {
    //         console.error(err);
    //         res.status(500)
    //         .send({
    //             message: 'Internal server error.',
    //             client: null
    //         });
    //     };
    //     return res;
    // };

    // public async update (
    //     req: Request,
    //     res: Response
    // ): Promise<Response> {
    //     try {
    //         const client = req.body.client
    //         if(!client || JSON.stringify(client) === '{}') {
    //             res.status(400)
    //             .send({
    //                 message: 'Missing clienct object or is empty.',
    //                 client: null
    //             })
    //         } else {
    //             const fields = getFalseyPropertyNames<Client>(client);
    //             if(fields.length) {
    //                 res.status(400)
    //                 .send({
    //                     message: `Falsey fields detected: ${fields}`,
    //                     client: null
    //                 });
    //             } else {
    //                 const { updatedClient, errorCode } = await this._service.update(client)
    //                 if(updatedClient) {
    //                     res.status(200)
    //                     .send({
    //                         message: 'Client updated.',
    //                         client: updatedClient
    //                     });
    //                 } else if(errorCode === 1) {
    //                     res.status(200)
    //                     .send({
    //                         message: 'Client not found.',
    //                         client: null
    //                     });
    //                 } else {
    //                     res.status(500)
    //                     .send({
    //                         message: 'Unexpected internal error at service layer.',
    //                         client: null
    //                     });
    //                 };
    //             };
    //         };
    //     } catch(err) {
    //         console.error(err);
    //         res.status(200)
    //         .send({
    //             message: 'Internal server error.',
    //             client: null
    //         });
    //     };
    //     return res;
    // };

    // public async remove (
    //     req: Request,
    //     res: Response
    // ): Promise<Response> {
    //     try {
    //         const clientId = req.body.clientId;
    //         if(!clientId) {
    //             res.status(400)
    //             .send({
    //                 message: '\`clientId\` is missing or falsey.',
    //                 client: null
    //             });
    //         } else {
    //             const { removedClient, errorCode } = await this._service.remove(clientId);
    //             if(removedClient) {
    //                 res.status(200)
    //                 .send({
    //                     message: 'Client removed.',
    //                     client: removedClient
    //                 });
    //             } else if(errorCode === 1) {
    //                 res.status(200)
    //                 .send({
    //                     message: 'Client not found.',
    //                     client: null
    //                 });
    //             } else {
    //                 res.status(500)
    //                 .send({
    //                     message: 'Unexpected internal server error as service layer.',
    //                     client: null
    //                 });
    //             }
    //         }
    //     } catch(err) {
    //         console.log(err);
    //         res.status(500)
    //         .send({
    //             message: 'Internal server error.',
    //             client: null
    //         });
    //     };
    //     return res;
    // };
};
