import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import cookieParse from "cookie-parser";
import AppRoutes from "./src/routes";
import { corsConfig } from "./src/configs/cors";
import database from "./src/configs/dbconfig";

dotenv.config();

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET_KEY;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_KEY;

const app = express();

const port = process.env.PORT || 3000;

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
  // eslint-disable-next-line no-console
  console.log(`[${req.method}] ${req.path} - ${req.get("user-agent")}`);
  next();
});

app.use("/api", AppRoutes);

app.listen(port, () => {
  database().catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://localhost:${port}`);
});
