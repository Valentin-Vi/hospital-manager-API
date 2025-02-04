"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DoctorBuilder {
    constructor() {
        this.doctor = {};
    }
    setUser(user) {
        this
            .setUserId(user.userId)
            .setEmail(user.email)
            .setName(user.name)
            .setLastname(user.lastname)
            .setType(user.type);
        return this;
    }
    setUserId(userId) {
        this.doctor.userId = userId;
        return this;
    }
    setDoctorId(doctorId) {
        this.doctor.doctorId = doctorId;
        return this;
    }
    setEmail(email) {
        this.doctor.email = email;
        return this;
    }
    setPassword(password) {
        this.doctor.password = password;
        return this;
    }
    setName(name) {
        this.doctor.name = name;
        return this;
    }
    setLastname(lastname) {
        this.doctor.lastname = lastname;
        return this;
    }
    setRefreshToken(refreshToken) {
        this.doctor.refreshToken = refreshToken;
        return this;
    }
    setType(type) {
        this.doctor.type = type;
        return this;
    }
    setSpecialty(specialty) {
        this.doctor.specialty = specialty;
        return this;
    }
    setVisits(visits) {
        this.doctor.visits = visits;
        return this;
    }
    addVisit(visit) {
        if (this.doctor.visits) {
            this.doctor.visits.push(visit);
        }
        else {
            this.doctor.visits = new Array;
            this.doctor.visits.push(visit);
        }
        return this;
    }
    build() {
        if (!this.doctor.userId || !this.doctor.doctorId || !this.doctor.email) {
            throw new Error("Missing required fields: userId, doctorId, email");
        }
        return this.doctor;
    }
    reset() {
        this.doctor = {};
    }
}
exports.default = DoctorBuilder;
