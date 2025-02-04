import { ClientBuilder } from 'backend';
import { Client, ClientCreate } from 'backend/types';
import { PrismaClient } from '@prisma/client';

export default class ClientDal {
    
    private _db = new PrismaClient();
    private _builder = new ClientBuilder();

    public async store(
        client: ClientCreate
    ): Promise<Client> {
        const newClient = await this._db.client.create({
            data: {
                user: {
                    connectOrCreate: {
                        where: { userId: client.user.userId },
                        create: {
                            name: client.name,
                            lastname: client.lastname,
                            email: client.email,
                            password: client.password,
                        }
                    },
                }
            },
            select: {
                user: {
                    select: {
                        userId: true,
                        email: true,
                        name: true,
                        lastname: true,
                        type: true
                    }
                },
                clientId: true
            }
        });
    
        return this._builder
        .setUser(newClient.user)
        .setClientId(newClient.clientId)
        .setVisits(newClient.visit)
        .buildClient();
    };

    public async find(
        clientId: number
    ): Promise<Client | null> {
        const foundClient = await this._db.client.findUnique({
            where: { clientId: clientId },
            select: {
                user: {
                    select: {
                        userId: true,
                        email: true,
                        name: true,
                        lastname: true,
                        type: true
                    }
                },
                clientId: true,
                visits: {
                    select: {
                        visitId: true,
                        cratedAt: true,
                        updatedAt: true,
                        visitDate: true
                    }
                }
            }
        }) ;
    
        if(foundClient) {
            return this._builder
            .setUser(foundClient.user)
            .setClientId(foundClient.clientId)
            .setVisits(foundClient.visits)
            .buildClient();
        } else {
            return null;
        };
    };

    public async update(
        client: Client
    ): Promise<Client | null> {
        const foundClient = await this._db.client.update({
            where: { clientId: client.user.clientId },
            data: {
                user: {
                    connectOrCreate: {
                        where: { userId: client.user.userId },
                    },
                    create: {
                        name: client.user.name,
                        lastname: client.user.lastname,
                        email: client.user.email,
                        password: client.user.password,
                    }
                }
            },
            select: {
                user: {
                    select: {
                        userId: true,
                        email: true,
                        name: true,
                        lastname: true,
                        type: true
                    }
                },
                clientId: true
            }
        });
    
        if(foundClient) {
            return this._builder
            .setUser(foundClient.user)
            .setClientId(foundClient.clientId)
            .buildClient();
        } else {
            return null;
        };
    };

    public async remove (
        clientId: number
    ): Promise<Client | null> {
        const deletedClient = await this._db.client.delete({
            where: { clientId: clientId },
            select: {
                user: {
                    select: {
                        userId: true,
                        email: true,
                        name: true,
                        lastname: true,
                        type: true
                    }
                },
                clientId: true
            }
        });
    
        if(deletedClient) {
            return this._builder
            .setUser(deletedClient.user)
            .setClientId(deletedClient.clientId)
            .setVisits(deletedClient.visits)
            .buildClient();
        } else {
            return null;
        };
    };
};
