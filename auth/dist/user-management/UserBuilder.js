"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserBuilder {
    constructor() {
        this._safe = false;
        this._user = {};
    }
    ;
    // public setSafe(_safe: true | false): this {
    //   this._safe = _safe;
    //   return this;
    // };
    get safe() {
        this._safe = true;
        return this;
    }
    ;
    setUserId(id) {
        this._user.userId = id;
        return this;
    }
    ;
    fromUser(user) {
        this._user.userId = user.userId;
        this._user.email = user.email;
        this._user.name = user.name;
        this._user.lastname = user.lastname;
        this._user.type = user.type;
        if (!this._safe) {
            this._user.password = user.password;
            this._user.refreshToken = user.refreshToken;
        }
        this._safe = false;
        return this;
    }
    ;
    setEmail(email) {
        this._user.email = email;
        return this;
    }
    ;
    setPassword(password) {
        this._user.password = password;
        return this;
    }
    ;
    setName(name) {
        this._user.name = name;
        return this;
    }
    ;
    setLastname(lastname) {
        this._user.lastname = lastname;
        return this;
    }
    ;
    setRefreshToken(refreshToken) {
        this._user.refreshToken = refreshToken;
        return this;
    }
    ;
    setType(type) {
        this._user.type = type;
        return this;
    }
    ;
    buildUser() {
        if (!this._user.userId) {
            throw new Error("Missing required field id.");
        }
        else if (!this._user.email) {
            throw new Error("Missing required field email.");
        }
        ;
        this._safe = false;
        return this._user;
    }
    ;
    reset() {
        this._user = {};
        this._safe = false;
    }
    ;
}
exports.default = UserBuilder;
