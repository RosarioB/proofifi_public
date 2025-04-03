import { Request, Response } from "express";
import prisma from "../client.js";

export async function createLabel(req: Request, res: Response): Promise<void> {
  try {
    const label = await prisma.label.create({
      data: req.body,
    });

    console.log(
      `[${new Date().toISOString()}] Label Successfully Created:`,
      label.id
    );
    res.status(201).json({
      status: true,
      message: "Label Successfully Created",
      data: label,
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error creating label:`, error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function getLabels(req: Request, res: Response): Promise<void> {
  try {
    const labels = await prisma.label.findMany();
    if (!labels) {
      console.log(`[${new Date().toISOString()}] Labels Not Found`);
      res.status(404).json({
        status: false,
        message: "Labels Not Found",
      });
      return;
    }
    console.log(
      `[${new Date().toISOString()}] Labels Successfully fetched:`,
      labels.map((label) => label.id)
    );
    res.status(200).json({
      status: true,
      message: "Labels Successfully fetched",
      data: labels,
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error fetching labels:`,
      error
    );
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function getLabelById(req: Request, res: Response): Promise<void> {
  try {
    const { labelId } = req.params;
    const label = await prisma.label.findFirst({
      where: {
        id: labelId,
      },
    });
    if (!label) {
      console.log(`[${new Date().toISOString()}] Label Not Found:`, labelId);
      res.status(404).json({
        status: false,
        message: "Label Not Found",
      });
      return;
    }
    console.log(
      `[${new Date().toISOString()}] Label Successfully fetched:`,
      label.id
    );
    res.status(200).json({
      status: true,
      message: "Label Successfully fetched",
      data: label,
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error fetching label by ID:`,
      error
    );
    res.status(500).json({
      status: false,
      message: "An error occurred",
    });
  }
}

export async function checkSmartWallet(
  req: Request,
  res: Response
): Promise<void> {
  const { smartWallet } = req.params;
  try {
    const label = await prisma.label.findFirst({
      where: {
        smartWallet: smartWallet,
      },
    });

    if (!label) {
      console.log(
        `[${new Date().toISOString()}] SmartWallet not found:`,
        smartWallet
      );
      res.status(404).json({
        status: false,
        message: "SmartWallet not found",
      });
      return;
    }
    console.log(
      `[${new Date().toISOString()}] SmartWallet found:`,
      smartWallet
    );
    res.json({
      status: true,
      message: "SmartWallet found",
      data: { labelId: label.id },
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error checking SmartWallet:`,
      error
    );
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
    const labels = await prisma.label.findMany({
      where: {
        smartWallet: smartWallet,
      },
    });
    if (!labels) {
      console.log(
        `[${new Date().toISOString()}] Labels not found for SmartWallet:`,
        smartWallet
      );
      res.status(404).json({
        status: false,
        message: "Labels not found",
      });
      return;
    }

    console.log(
      `[${new Date().toISOString()}] Labels Successfully fetched for SmartWallet ${smartWallet}`,
      labels.map((label) => label.id)
    );
    res.json({
      status: true,
      message: "Labels Successfully fetched",
      data: labels,
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error fetching labels by SmartWallet:`,
      error
    );
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function deleteLabel(req: Request, res: Response): Promise<void> {
  try {
    const { labelId } = req.params;
    const label = await prisma.label.findFirst({
      where: {
        id: labelId,
      },
    });

    if (!label) {
      console.log(`[${new Date().toISOString()}] Label not found:`, labelId);
      res.status(404).json({
        status: false,
        message: "Label not found",
      });
      return;
    }
    await prisma.label.delete({
      where: {
        id: labelId,
      },
    });
    console.log(
      `[${new Date().toISOString()}] Label Successfully deleted:`,
      labelId
    );
    res.status(200).json({
      status: true,
      message: "Label Successfully deleted",
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error deleting label:`, error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

export async function updateLabel(req: Request, res: Response): Promise<void> {
  try {
    const { labelId } = req.params;

    const label = await prisma.label.findFirst({
      where: {
        id: labelId,
      },
    });

    if (!label) {
      console.log(`[${new Date().toISOString()}] Label not found:`, labelId);
      res.status(401).json({
        status: false,
        message: "Label not found",
      });
      return;
    }

    const updatedLabel = await prisma.label.update({
      where: {
        id: labelId,
      },
      data: req.body,
    });

    console.log(
      `[${new Date().toISOString()}] Label Successfully updated:`,
      updatedLabel.id
    );
    res.json({
      status: true,
      message: "Label Successfully updated",
      data: updatedLabel,
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error updating label:`, error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}
