import { config } from "@/lib/config";
import axios from "axios";

const BACKEND_URL = config.backed_url;

export const createAllowedContract = async (contractAddress: string) => {
  if (!contractAddress) {
    throw new Error("Contract address is required");
  }
  return await axios.post(`${BACKEND_URL}/allowed-contracts`, {
    id: `${contractAddress}`,
  });
};

export const isAllowedContract = async (
  contractAddress: string
): Promise<boolean> => {
  if (!contractAddress) {
    throw new Error("Contract address is required");
  }
  try {
    const response = await axios.get(
      `${BACKEND_URL}/allowed-contracts/${contractAddress}`
    );
    return response.status === 200 && response.data.data.id?.trim();
  } catch (error) {
    console.error(error);
    return false;
  }
};
