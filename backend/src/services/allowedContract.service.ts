import { AllowedContract } from "../models/allowedContract.model.js";
import AllowedContractRepository from "../repositories/allowedContract.repository.js";

class AllowedContractService {
  async createAllowedContract(data: AllowedContract): Promise<AllowedContract> {
    return AllowedContractRepository.createAllowedContract(data);
  }

  async getAllowedContracts(): Promise<AllowedContract[]> {
    return AllowedContractRepository.getAllowedContracts();
  }

  async getAllowedContractById(id: string): Promise<AllowedContract | null> {
    return AllowedContractRepository.getAllowedContractById(id);
  }

  async deleteAllowedContract(id: string): Promise<void> {
    AllowedContractRepository.deleteAllowedContract(id);
  }

  async updateAllowedContract(id: string, data: Partial<AllowedContract>): Promise<AllowedContract> {
    return AllowedContractRepository.updateAllowedContract(id, data);
  }
}

export default new AllowedContractService();
