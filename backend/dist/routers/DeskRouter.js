"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DeskController_1 = __importDefault(require("../services/desk-managment/DeskController"));
const endpoint = (0, express_1.Router)();
const desk = new DeskController_1.default();
endpoint.post('/store', desk.store);
endpoint.post('/find', desk.find);
endpoint.post('/update', desk.update);
endpoint.post('/remove', desk.remove);
exports.default = desk;
