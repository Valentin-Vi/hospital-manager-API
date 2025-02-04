"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFalsyPropertyNames;
function getFalsyPropertyNames(obj) {
    return Object.entries(obj)
        .filter(([_, value]) => !value)
        .map(([key]) => key);
}
