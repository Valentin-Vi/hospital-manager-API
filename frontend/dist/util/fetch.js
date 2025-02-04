"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = api;
const constants_1 = require("./constants");
function api(route, options) {
    return __awaiter(this, void 0, void 0, function* () {
        options.credentials = 'include';
        options.headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': constants_1.CLIENT_URL,
            'Access-Control-Allow-Credentials': 'true',
        };
        let res = yield fetch(constants_1.API_URL + route, options);
        if (res.status === 401) {
            console.log('Access token expired. Attempting to refresh...');
            const refRes = yield fetch(constants_1.API_URL + '/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (refRes.ok) {
                res = yield fetch(constants_1.API_URL + route, options);
            }
            else {
                console.log('Refresh token expired or is invalid. Login is required...');
                throw new Error('Session expired. Please log in again.');
            }
            ;
        }
        ;
        return res;
    });
}
;
