/* eslint-disable no-console */

import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const database = async () =>
  mongoose
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .connect(process.env.MONGO_URL!)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Error connecting to database");
    });

export default database;
