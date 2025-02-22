import { Router } from "express";
import {
  createLabel,
  deleteLabel,
  getLabelById,
  getLabels,
  updateLabel,
  checkSmartWallet,
  getLabelsBySmartWallet
} from "../controllers/label.controller.js";


const labelRoute = Router();

labelRoute.post("", createLabel);
labelRoute.get("", getLabels);
labelRoute.get("/:labelId", getLabelById);
labelRoute.delete("/:labelId", deleteLabel);
labelRoute.put("/:labelId", updateLabel);
labelRoute.get("/check-smartwallet/:smartWallet", checkSmartWallet);
labelRoute.get("/smartwallet/:smartWallet", getLabelsBySmartWallet);

export default labelRoute;
