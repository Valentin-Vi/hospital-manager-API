"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = void 0;
require("dotenv");
const jwt = require('jsonwebtoken');
const verifyAccessToken = (access_token) => {
    return jwt.verify(access_token, process.env.ACCESS_JWT_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
