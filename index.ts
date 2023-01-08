import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
  res.statusCode = 200;
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${port}`);
});
