"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./src/routes"));
const cors_2 = require("./src/configs/cors");
const dbconfig_1 = __importDefault(require("./src/configs/dbconfig"));
dotenv_1.default.config();
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET_KEY;
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_KEY;
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
    });
    res.statusCode = 200;
});
app.use((0, cors_1.default)(cors_2.corsConfig));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
require("./src/middlewares/passport");
// Logging request
app.use((req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(`[${req.method}] ${req.path} - ${req.get("user-agent")}`);
    next();
});
app.use("/api", routes_1.default);
(0, dbconfig_1.default)().catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
});
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running at http://localhost:${port}`);
});
