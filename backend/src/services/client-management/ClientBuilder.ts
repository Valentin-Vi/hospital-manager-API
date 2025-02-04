import { Client, SafeClient } from "backend/types";
import { Visit } from "backend/types";
import { SafeUser } from "auth/types";
import { UserBuilder } from 'auth';

export default class ClientBuilder extends UserBuilder {

    private _client: Partial<SafeClient> = {};

    public setUser(user: SafeUser): this {
        this._client.user = user;
        return this;
    };

    public setClientId(clientId: number | null): this {
        this._client.clientId = clientId;
        return this;
    };

    public setVisits(visits: Visit[]): this {
        this._client.visits = visits;
        return this;
    };

    public addVisits(visit: Visit): this {
        if(this._client.visits) {
            this._client.visits.push(visit)
        } else {
            this._client.visits = [];
            this._client.visits.push(visit);
        };
        return this;
    };

    public buildClient(): Client {
        if(!this._client.clientId) {
            throw new Error('Missing \`clientId\`');
        };
        this._client.user = super.buildUser();
        return this._client as Client;
    };

    public resetClient(): void {
        this._client = {};
    };

    public reset(): void {
        super.reset();
        this.resetClient();
    };
};
