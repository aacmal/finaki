"use strict";
/* eslint-disable no-console */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
const database = async () => mongoose_1.default
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .connect(process.env.MONGO_URL)
    .then(() => {
    console.log("Database connected");
})
    .catch((error) => {
    console.log(error);
    throw new Error("Error connecting to database");
});
exports.default = database;
