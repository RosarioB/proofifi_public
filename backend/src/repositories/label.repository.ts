import { Label, LabelModel } from "../models/label.model.js";

class LabelRepository {
  async createLabel(data: Label) {
    const label = new LabelModel(data);
    return label.save();
  }

  async getLabels() {
    return LabelModel.find();
  }

  async getLabelById(id: string) {
    return LabelModel.findOne({ id });
  }

  async deleteLabel(id: string) {
    return LabelModel.findOneAndDelete({ id });
  }

  async updateLabel(id: string, data: Partial<Label>) {
    return LabelModel.findOneAndUpdate({ id }, data, { new: true });
  }

  async getLabelBySmartWallet(smartWallet: string) {
    return LabelModel.findOne({ smartWallet });
  }

  async getLabelsBySmartWallet(smartWallet: string) {
    return LabelModel.find({ smartWallet });
  }
}

export default new LabelRepository();
