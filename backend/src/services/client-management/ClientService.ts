import { ClientDal } from 'backend';
import { Client, ClientCreate } from 'backend/types';
import { hash } from 'bcrypt';

export default class ClientService {
    
    private _dal = new ClientDal();

    async store (
        client: ClientCreate
    ): Promise<{
        success: true | false,
        storedClient: Client | null,
        errorCode: 0 | 1
    }>{
        try {
            client.password = await hash(client.password, 10);
            const newClient: Client = await this._dal.store(client);
            return {
                success: true,
                storedClient: newClient,
                errorCode: 0
            };
        } catch(err) {
            console.error(err);
            return {
                success: false,
                storedClient: null,
                errorCode: 1
            };
        };
    };
    
    async find (
        clientId: number
    ): Promise<{
        success: true | false,
        foundClient: Client | null,
        errorCode: 0 | 1 | 2
    }> {
        try {
            const client: Client | null = await this._dal.find(clientId);
            if(client) {
                return {
                    success: true,
                    foundClient: client,
                    errorCode: 0
                };
            } else {
                return {
                    success: false,
                    foundClient: null,
                    errorCode: 1
                };
            };
        } catch(err) {
            console.error(err);
            return {
                success: false,
                foundClient: null,
                errorCode: 2
            };
        };
    };
    
    async update (
        client: Client
    ): Promise<{
        success: true | false,
        updatedClient: Client | null,
        errorCode: 0 | 1 | 2
    }> {
        try {
            const updatedClient: Client | null = await this._dal.update(client);
            if(updatedClient) {
                return {
                    success: true,
                    updatedClient,
                    errorCode: 0
                };
            } else {
                return {
                    success: false,
                    updatedClient: null,
                    errorCode: 1
                };
            };
        } catch(err) {
            console.error(err)
            return {
                success: false,
                updatedClient: null,
                errorCode: 2
            };
        };
    };
    
    async remove (
        clientId: number
    ): Promise<{
        success: true | false,
        removedClient: Client | null,
        errorCode: 0 | 1 | 2
    }> {
        try {
            const removedClient: Client | null = await this._dal.remove(clientId);
            if(removedClient) {
                return {
                    success: true,
                    removedClient: removedClient,
                    errorCode: 0
                };
            } else {
                return {
                    success: false,
                    removedClient: null,
                    errorCode: 1
                };
            };
        } catch(err) {
            console.error(err)
            return {
                success: false,
                removedClient: null,
                errorCode: 2
            };
        };
    };
};
