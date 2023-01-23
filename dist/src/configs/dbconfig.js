"use strict";
/* eslint-disable no-console */
// create conncection to database
// use mongoose to connect to mongodb
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConnection = async () => {
    try {
        mongoose_1.default.set("strictQuery", false);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("Database connected");
    }
    catch (error) {
        console.log(error);
        throw new Error("Error connecting to database");
    }
};
exports.default = dbConnection;
