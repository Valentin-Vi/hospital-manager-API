"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientController_1 = __importDefault(require("../services/client-management/ClientController"));
const endpoint = (0, express_1.Router)();
const client = new ClientController_1.default();
endpoint.post('/store', client.store);
endpoint.post('/find', client.find);
endpoint.post('/update', client.update);
endpoint.post('/remove', client.remove);
exports.default = endpoint;
