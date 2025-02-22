import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "baseSepolia",
  networks: {
    baseSepolia: {
      url: process.env.RPC_URL_BASE_SEPOLIA,
      accounts: [process.env.OWNER_PRIVATE_KEY!] 
    }
  }
};

export default config;
