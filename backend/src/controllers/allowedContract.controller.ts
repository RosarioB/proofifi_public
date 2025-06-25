import { Request, Response } from "express";
import AllowedContractService from "../services/allowedContract.service.js";
import { errorWithTimestamp, logWithTimestamp } from "../utils/logging.js";

export async function createAllowedContract(req: Request, res: Response): Promise<void> {
  try {
    const allowedContract = await AllowedContractService.createAllowedContract(req.body);
    logWithTimestamp(`AllowedContract Successfully Created: ${allowedContract.id}`);
    res.status(200).json({
      status: true,
      message: "AllowedContract Successfully Created",
      data: allowedContract,
    });
  } catch (error) {
    errorWithTimestamp(
      `[${new Date().toISOString()}] Error creating AllowedContract:`,
      error
    );
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function getAllowedContracts(req: Request, res: Response): Promise<void> {
  try {
    const allowedContracts = await AllowedContractService.getAllowedContracts();
    if (!allowedContracts) {
      logWithTimestamp(`AllowedContracts Not Found`);
      res.status(404).json({
        status: false,
        message: "AllowedContracts Not Found",
      });
      return;
    }
    logWithTimestamp(`AllowedContracts Successfully fetched: ${allowedContracts.map((allowedContract) => allowedContract.id)}`);
    res.status(200).json({
      status: true,
      message: "AllowedContracts Successfully fetched",
      data: allowedContracts,
    });
  } catch (error) {
    errorWithTimestamp(`Error fetching AllowedContracts:`, error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function getAllowedContractById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const allowedContract = await AllowedContractService.getAllowedContractById(id);
    if (!allowedContract) {
      logWithTimestamp(`AllowedContract Not Found: ${id}`);
      res.status(404).json({
        status: false,
        message: "AllowedContract Not Found",
      });
      return;
    }
    logWithTimestamp(`AllowedContract Successfully fetched: ${allowedContract.id}`);
    res.status(200).json({
      status: true,
      message: "AllowedContract Successfully fetched",
      data: allowedContract,
    });
  } catch (error) {
    errorWithTimestamp(`Error fetching AllowedContract by ID:`, error);
    res.status(500).json({
      status: false,
      message: "An error occurred",
    });
  }
}

export async function deleteAllowedContract(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const allowedContract = await AllowedContractService.getAllowedContractById(id);
    if (!allowedContract) {
      logWithTimestamp(`AllowedContract not found: ${id}`);
      res.status(404).json({
        status: false,
        message: "AllowedContract not found",
      });
      return;
    }
    await AllowedContractService.deleteAllowedContract(id);
    logWithTimestamp(`AllowedContract Successfully deleted: ${id}`);
    res.status(200).json({
      status: true,
      message: "AllowedContract Successfully deleted",
    });
  } catch (error) {
    errorWithTimestamp(`Error deleting AllowedContract:`, error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function updateAllowedContract(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const allowedContract = await AllowedContractService.getAllowedContractById(id);
    if (!allowedContract) {
      logWithTimestamp(`AllowedContract not found: ${id}`);
      res.status(404).json({
        status: false,
        message: "AllowedContract not found",
      });
      return;
    }
    const updatedAllowedContract = await AllowedContractService.updateAllowedContract(id, req.body);
    logWithTimestamp(`AllowedContract Successfully updated: ${updatedAllowedContract.id}`);
    res.json({
      status: true,
      message: "AllowedContract Successfully updated",
      data: updatedAllowedContract,
    });
  } catch (error) {
    errorWithTimestamp(`Error updating AllowedContract:`, error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}
