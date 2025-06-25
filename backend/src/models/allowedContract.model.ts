import mongoose, { Schema, Document, Model } from "mongoose";

export interface AllowedContract extends Document {
  id: string;
}

const allowedContractSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const AllowedContractModel: Model<AllowedContract> = mongoose.model<AllowedContract>("AllowedContract", allowedContractSchema, "allowedContract");
