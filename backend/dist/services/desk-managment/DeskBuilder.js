"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeskBuilder {
    constructor() {
        this.safe = true;
        this.desk = {};
    }
    setSafe(safe) {
        this.safe = safe;
        return this;
    }
    ;
    setUser(user) {
        this
            .setUserId(user.userId)
            .setEmail(user.email)
            .setPassword(user.password)
            .setName(user.name)
            .setLastname(user.lastname)
            .setRefreshToken(user.refreshToken)
            .setType(user.type);
        return this;
    }
    ;
    setUserId(userId) {
        this.desk.userId = userId;
        return this;
    }
    setDeskId(deskId) {
        this.desk.deskId = deskId;
        return this;
    }
    setEmail(email) {
        this.desk.email = email;
        return this;
    }
    setPassword(password) {
        this.desk.password = password;
        return this;
    }
    setName(name) {
        this.desk.name = name;
        return this;
    }
    setLastname(lastname) {
        this.desk.lastname = lastname;
        return this;
    }
    setRefreshToken(refreshToken) {
        this.desk.refreshToken = refreshToken;
        return this;
    }
    setType(type) {
        this.desk.type = type;
        return this;
    }
    build() {
        if (!this.desk.userId || !this.desk.deskId || !this.desk.email) {
            throw new Error("Missing required fields: userId, deskId, email");
        }
        return this.desk;
    }
    reset() {
        this.desk = {};
    }
}
exports.default = DeskBuilder;
