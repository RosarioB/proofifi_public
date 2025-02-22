import { Router } from "express";
import labelRoute from "./label.routes.js";
import allowedContractRoute from "./allowedContract.routes.js";

// Index
const indexRoute = Router();

indexRoute.get("", async (req, res) => {
  res.json({ message: "The server is online" });
});

indexRoute.use("/labels", labelRoute);
indexRoute.use("/allowed-contracts", allowedContractRoute);

export default indexRoute;
