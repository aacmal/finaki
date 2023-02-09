"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
exports.corsConfig = {
    origin: [
        "http://localhost:3000",
        "http://192.168.137.1:3000",
        "https://finaki.acmal.me",
        "https://finaki-frontend-git-test-axcamz.vercel.app/", // test
    ],
    credentials: true,
};
