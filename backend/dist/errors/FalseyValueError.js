"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FalsyValueError extends Error {
    constructor(falsyFieldNames) {
        if (falsyFieldNames.length > 1) {
            super(`Invalid value for the following field: ${falsyFieldNames[0]}. Falsy values are not allowed.`);
        }
        else {
            super(`Invalid values for the following fields: \`${falsyFieldNames.join("\`, \`")}\`. Falsy values are not allowed.`);
        }
        this.name = "FalsyValueError";
    }
}
exports.default = FalsyValueError;
