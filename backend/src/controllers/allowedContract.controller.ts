import { Request, Response } from "express";
import prisma from "../client.js";

export const createAllowedContract = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allowedContract = await prisma.allowedContract.create({
      data: req.body,
    });
    res.status(201).json({
      status: true,
      message: "Allowed Contract Successfully Created",
      data: allowedContract,
    });
    console.log(`[${new Date().toISOString()}] Allowed Contract Created: `, allowedContract.id);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
    console.error(`[${new Date().toISOString()}] Error creating allowed contract: `, error);
  }
};

export const getAllowedContracts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allowedContracts = await prisma.allowedContract.findMany();
    res.status(200).json({
      status: true,
      message: "Allowed Contracts Successfully Fetched",
      data: allowedContracts,
    });
    console.log(`[${new Date().toISOString()}] Allowed Contracts Fetched: `, allowedContracts.map(contract => contract.id));
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
    console.error(`[${new Date().toISOString()}] Error fetching allowed contracts: `, error);
  }
};

export const getAllowedContractById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const allowedContract = await prisma.allowedContract.findUnique({
      where: { id },
    });
    if (!allowedContract) {
      res.status(404).json({
        status: false,
        message: "Allowed Contract Not Found",
      });
      console.log(`[${new Date().toISOString()}] Allowed Contract Not Found: `, id);
      return;
    }
    res.status(200).json({
      status: true,
      message: "Allowed Contract Successfully Fetched",
      data: allowedContract,
    });
    console.log(`[${new Date().toISOString()}] Allowed Contract Fetched: `, allowedContract.id);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
    console.error(`[${new Date().toISOString()}] Error fetching allowed contract by ID: `, error);
  }
};

export const updateAllowedContract = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const allowedContract = await prisma.allowedContract.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json({
      status: true,
      message: "Allowed Contract Successfully Updated",
      data: allowedContract,
    });
    console.log(`[${new Date().toISOString()}] Allowed Contract Updated: `, allowedContract.id);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
    console.error(`[${new Date().toISOString()}] Error updating allowed contract: `, error);
  }
};

export const deleteAllowedContract = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const allowedContract = await prisma.allowedContract.findFirst({
      where: {
        id,
      },
    });

    if (!allowedContract) {
      res.status(404).json({
        status: false,
        message: "Allowed Contract not found",
      });
      console.log(`[${new Date().toISOString()}] Allowed Contract Not Found: `, id);
      return;
    }
    await prisma.allowedContract.delete({
      where: { id },
    });
    res.status(200).json({
      status: true,
      message: "Allowed Contract Successfully Deleted",
    });
    console.log(`[${new Date().toISOString()}] Allowed Contract Deleted: `, id);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
    console.error(`[${new Date().toISOString()}] Error deleting allowed contract: `, error);
  }
};
