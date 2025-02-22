import axios from "axios";
import { DOMAIN } from "../lib/constants";
import { Label } from "./Label";
import { config } from "@/lib/config";

const BACKEND_URL = config.backed_url;

export const createLabel = async (
  subdomainName: string,
  name: string,
  description: string,
  nftId: string,
  ipfsHash: string,
  idPrivy?: string,
  embeddedWallet?: string,
  smartWallet?: string,
  base64Image?: string
) => {
  if (!subdomainName || !name || !description || !nftId || !ipfsHash) {
    throw new Error("All fields are required");
  }
  return await axios.post(`${BACKEND_URL}/labels`, {
    id: `${subdomainName}.${DOMAIN}`,
    name,
    description,
    nftId,
    ipfsHash,
    idPrivy,
    embeddedWallet,
    smartWallet,
    base64Image,
  });
};

export const isSubdomainExistent = async (name: string): Promise<boolean> => {
  if (!name) {
    throw new Error("Subdomain name is required");
  }
  try {
    const response = await axios.get(`${BACKEND_URL}/labels/${name}.${DOMAIN}`);
    return response.status === 200 && response.data?.data?.id?.trim();
  } catch (error) {
    console.error(error);
    return false;
  }
};

interface GetLabelBySmartWalletResponse {
  data: {
    data: Label[];
  };
}

export const getLabelsBySmartWallet = async (
  smartWallet: string
): Promise<Label[] | null> => {
  if (!smartWallet) {
    throw new Error("Smart wallet is required");
  }
  try {
    const response: GetLabelBySmartWalletResponse = await axios.get(
      `${BACKEND_URL}/labels/smartWallet/${smartWallet}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLabelById = async (id: string): Promise<Label | null> => {
  if (!id) {
    throw new Error("Label id is required");
  }
  try {
    const response = await axios.get(`${BACKEND_URL}/labels/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
