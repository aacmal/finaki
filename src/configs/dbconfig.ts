/* eslint-disable no-console */
// create conncection to database
// use mongoose to connect to mongodb

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await mongoose.createConnection(process.env.MONGO_URL!).asPromise();
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to database");
  }
};

export default dbConnection;
