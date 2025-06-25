import { AllowedContract, AllowedContractModel } from "../models/allowedContract.model.js";

class AllowedContractRepository {
  async createAllowedContract(data: AllowedContract) {
    const allowedContract = new AllowedContractModel(data);
    return allowedContract.save();
  }

  async getAllowedContracts() {
    return AllowedContractModel.find();
  }

  async getAllowedContractById(id: string) {
    return AllowedContractModel.findOne({ id });
  }

  async deleteAllowedContract(id: string) {
    return AllowedContractModel.findOneAndDelete({ id });
  }

  async updateAllowedContract(id: string, data: Partial<AllowedContract>) {
    return AllowedContractModel.findOneAndUpdate({ id }, data, { new: true });
  }
}

export default new AllowedContractRepository();
