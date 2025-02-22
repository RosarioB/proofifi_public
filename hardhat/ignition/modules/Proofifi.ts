// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const owner = process.env.OWNER_ADDRESS;

const ProofifiModule = buildModule("ProofifiModule", (m) => {
  const proofifi = m.contract("Proofifi", [owner], {});
  return { proofifi };
});

export default ProofifiModule;
