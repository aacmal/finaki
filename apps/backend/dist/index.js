/* eslint-disable no-console */
import cookieParse from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import { corsConfig } from "./src/configs/cors.config";
import database from "./src/configs/database.config";
import AppRoutes from "./src/routes/index.route";
import bot from "./src/services/bot.service";
dotenv.config();
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET_KEY;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_KEY;
const app = express();
const port = process.env.PORT ?? 3000;
app.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
    });
    res.statusCode = 200;
});
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use(passport.initialize());
require("./src/middlewares/passport");
// Logging request
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path} - ${req.get("user-agent")}`);
    next();
});
app.use("/api", AppRoutes);
database().catch((error) => {
    console.log(error);
});
app.listen(port, () => {
    bot
        .launch()
        .then(() => {
        console.log("Bot is running");
    })
        .catch((error) => {
        console.log(error);
    });
    console.log(`Server is running at http://localhost:${port}`);
});
