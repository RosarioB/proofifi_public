import "dotenv/config";
import express from "express";
import cors from "cors";
import indexRoute from "./routes/index.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is empty");
}

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", indexRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`[${new Date().toISOString()}] Server is running on port ${port}`);
  console.log(`[${new Date().toISOString()}] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[${new Date().toISOString()}] Database URL: ${process.env.DATABASE_URL ? 'Set' : 'Not set'}`);
});
