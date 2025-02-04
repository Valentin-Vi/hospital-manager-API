"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("auth");
class ClientBuilder extends auth_1.UserBuilder {
    constructor() {
        super(...arguments);
        this._client = {};
    }
    setUser(user) {
        this._client.user = user;
        return this;
    }
    ;
    setClientId(clientId) {
        this._client.clientId = clientId;
        return this;
    }
    ;
    setVisits(visits) {
        this._client.visits = visits;
        return this;
    }
    ;
    addVisits(visit) {
        if (this._client.visits) {
            this._client.visits.push(visit);
        }
        else {
            this._client.visits = [];
            this._client.visits.push(visit);
        }
        ;
        return this;
    }
    ;
    buildClient() {
        if (!this._client.clientId) {
            throw new Error('Missing \`clientId\`');
        }
        ;
        this._client.user = super.buildUser();
        return this._client;
    }
    ;
    resetClient() {
        this._client = {};
    }
    ;
    reset() {
        super.reset();
        this.resetClient();
    }
    ;
}
exports.default = ClientBuilder;
;
