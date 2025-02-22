import { Router } from "express";
import {
  createAllowedContract,
  getAllowedContracts,
  getAllowedContractById,
  updateAllowedContract,
  deleteAllowedContract,
} from "../controllers/allowedContract.controller.js";

const allowedContractRoute = Router();

allowedContractRoute.post("", createAllowedContract);
allowedContractRoute.get("", getAllowedContracts);
allowedContractRoute.get("/:id", getAllowedContractById);
allowedContractRoute.put("/:id", updateAllowedContract);
allowedContractRoute.delete("/:id", deleteAllowedContract);

export default allowedContractRoute;