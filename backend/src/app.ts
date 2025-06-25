import "dotenv/config";
import express from "express";
import cors from "cors";
import indexRoute from "./routes/index.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is empty");
}

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", indexRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
