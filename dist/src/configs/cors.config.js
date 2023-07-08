"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
exports.corsConfig = {
    origin: [
        "https://finaki.vercel.app",
        "http://localhost:3000", // development
    ],
    credentials: true,
};
