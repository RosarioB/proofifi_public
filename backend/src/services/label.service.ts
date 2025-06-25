import { Label } from "../models/label.model.js";
import LabelRepository from "../repositories/label.repository.js";

class LabelService {
  async createLabel(data: Label): Promise<Label> {
    return LabelRepository.createLabel(data);
  }

  async getLabels(): Promise<Label[]> {
    return LabelRepository.getLabels();
  }

  async getLabelById(id: string): Promise<Label | null> {
    return LabelRepository.getLabelById(id);
  }

  async deleteLabel(id: string): Promise<void> {
    LabelRepository.deleteLabel(id);
  }

  async updateLabel(id: string, data: Partial<Label>): Promise<Label> {
    return LabelRepository.updateLabel(id, data);
  }

  async getLabelBySmartWallet(smartWallet: string): Promise<Label | null> {
    return LabelRepository.getLabelBySmartWallet(smartWallet);
  }

  async getLabelsBySmartWallet(smartWallet: string): Promise<Label[]> {
    return LabelRepository.getLabelsBySmartWallet(smartWallet);
  }
}

export default new LabelService();
