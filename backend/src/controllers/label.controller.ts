import { Request, Response } from "express";
import LabelService from "../services/label.service.js";
import { errorWithTimestamp, logWithTimestamp } from "../utils/logging.js";

export async function createLabel(req: Request, res: Response): Promise<void> {
  try {
    const label = await LabelService.createLabel(req.body);
    logWithTimestamp(`Label Successfully Created: ${label.id}`);
    res.status(200).json({
      status: true,
      message: "Label Successfully Created",
      data: label,
    });
  } catch (error) {
    errorWithTimestamp(
      `[${new Date().toISOString()}] Error creating Label:`,
      error
    );
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function getLabels(req: Request, res: Response): Promise<void> {
  try {
    const labels = await LabelService.getLabels();
    if (!labels) {
      logWithTimestamp(`Labels Not Found`);
      res.status(404).json({
        status: false,
        message: "Labels Not Found",
      });
      return;
    }
    logWithTimestamp(`Labels Successfully fetched: ${labels.map((label) => label.id)}`);
    res.status(200).json({
      status: true,
      message: "Labels Successfully fetched",
      data: labels,
    });
  } catch (error) {
    errorWithTimestamp(`Error fetching Labels:`, error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function getLabelById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const label = await LabelService.getLabelById(id);
    if (!label) {
      logWithTimestamp(`Label Not Found: ${id}`);
      res.status(404).json({
        status: false,
        message: "Label Not Found",
      });
      return;
    }
    logWithTimestamp(`Label Successfully fetched: ${label.id}`);
    res.status(200).json({
      status: true,
      message: "Label Successfully fetched",
      data: label,
    });
  } catch (error) {
    errorWithTimestamp(`Error fetching Label by ID:`, error);
    res.status(500).json({
      status: false,
      message: "An error occurred",
    });
  }
}

export async function deleteLabel(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const label = await LabelService.getLabelById(id);
    if (!label) {
      logWithTimestamp(`Label not found: ${id}`);
      res.status(404).json({
        status: false,
        message: "Label not found",
      });
      return;
    }
    await LabelService.deleteLabel(id);
    logWithTimestamp(`Label Successfully deleted: ${id}`);
    res.status(200).json({
      status: true,
      message: "Label Successfully deleted",
    });
  } catch (error) {
    errorWithTimestamp(`Error deleting Label:`, error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function updateLabel(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const label = await LabelService.getLabelById(id);
    if (!label) {
      logWithTimestamp(`Label not found: ${id}`);
      res.status(404).json({
        status: false,
        message: "Label not found",
      });
      return;
    }
    const updatedLabel = await LabelService.updateLabel(id, req.body);
    logWithTimestamp(`Label Successfully updated: ${updatedLabel.id}`);
    res.json({
      status: true,
      message: "Label Successfully updated",
      data: updatedLabel,
    });
  } catch (error) {
    errorWithTimestamp(`Error updating Label:`, error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}


export async function checkSmartWallet(
  req: Request,
  res: Response
): Promise<void> {
  const { smartWallet } = req.params;
  try {
    const label = await LabelService.getLabelBySmartWallet(smartWallet);

    if (!label) {
      logWithTimestamp(`SmartWallet not found: ${smartWallet}`);
      res.status(404).json({
        status: false,
        message: "SmartWallet not found",
      });
      return;
    }
    logWithTimestamp(`SmartWallet found: ${smartWallet}`);
    res.json({
      status: true,
      message: "SmartWallet found",
      data: { labelId: label.id },
    });
  } catch (error) {
    errorWithTimestamp(`Error checking SmartWallet:`, error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function getLabelsBySmartWallet(
  req: Request,
  res: Response
): Promise<void> {
  const { smartWallet } = req.params;
  try {
    const labels = await LabelService.getLabelsBySmartWallet(smartWallet);
    if (!labels) {
      logWithTimestamp(`Labels not found for SmartWallet: ${smartWallet}`);
      res.status(404).json({
        status: false,
        message: "Labels not found",
      });
      return;
    }

    logWithTimestamp(`Labels Successfully fetched for SmartWallet ${smartWallet}: ${labels.map((label) => label.id)}`);
    res.json({
      status: true,
      message: "Labels Successfully fetched",
      data: labels,
    });
  } catch (error) {
    errorWithTimestamp(`Error fetching labels by SmartWallet:`, error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}
