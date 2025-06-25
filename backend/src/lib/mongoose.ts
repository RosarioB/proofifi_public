import mongoose from "mongoose";
import { errorWithTimestamp, logWithTimestamp } from "../utils/logging.js";

export async function connectToMongoDB() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is empty");
    }
    try {
        await mongoose.connect(process.env.DATABASE_URL, { dbName: "proofifi" });
        logWithTimestamp(`Successfully connected to Mongo DB`);
    } catch (err) {
        errorWithTimestamp(`Error connecting to Mongo DB`, err);
    }
}
