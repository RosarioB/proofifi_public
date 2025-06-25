import "dotenv/config";
import express from "express";
import cors from "cors";
import indexRoute from "./routes/index.js";
import { connectToMongoDB } from "./lib/mongoose.js";

await connectToMongoDB();

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", indexRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
