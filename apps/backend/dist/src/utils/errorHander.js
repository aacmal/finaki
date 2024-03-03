"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const errorResponse = (param, msg) => ({
    errors: [
        {
            param,
            msg,
        },
    ],
});
exports.errorResponse = errorResponse;
