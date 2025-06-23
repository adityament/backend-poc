import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI: string = process.env.MONGO_URI as string;

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successfully to DB");
  } catch (e) {
    console.error("Database connection failed", e);
    process.exit(0);
  }
};

export default connectDb;
