import "dotenv/config";
import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import indexRoute from "./routes/index.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is empty");
}
if (!process.env.SSL_CERTIFICATE_KEY_PATH) {
  throw new Error("SSL_CERTIFICATE_KEY_PATH is empty");
}
if (!process.env.SSL_CERTIFICATE_PATH) {
  throw new Error("SSL_CERTIFICATE_PATH is empty");
}

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/", indexRoute);

const port = process.env.PORT || 3001;

const options = {
  key: fs.readFileSync(process.env.SSL_CERTIFICATE_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERTIFICATE_PATH),
};

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
