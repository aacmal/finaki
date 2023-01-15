import express from "express";
import dotenv from "dotenv";
import dbConnection from "./src/configs/dbconfig";
import { TransactionRoute } from "./src/routes/transaction.route";
import { UserRoute } from "./src/routes/user.route";
import passport from "passport";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
  res.statusCode = 200;
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

require("./src/configs/passport");

// Logging request
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.use("/api/transaction", passport.authenticate("jwt", { session: false }), TransactionRoute);
app.use("/api/user", UserRoute);

dbConnection().then(() => {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${port}`);
  });
});
