"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
exports.corsConfig = {
    origin: [
        "http://192.168.137.1:3000",
        "https://finaki.acmal.me",
        "https://finaki-frontend-git-test-axcamz.vercel.app/",
        "https://finaki.vercel.app", // vercel domain
    ],
    credentials: true,
};
