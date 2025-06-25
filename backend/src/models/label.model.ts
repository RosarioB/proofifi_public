import mongoose, { Schema, Document, Model } from "mongoose";

export interface Label extends Document {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    jsonIpfsUrl: string;
    owner: string;
    createdAt: Date;
}

const labelSchema: Schema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        nftId: { type: String, required: true },
        ipfsHash: { type: String, required: true },
        idPrivy: { type: String, required: false },
        embeddedWallet: { type: String, required: false },
        smartWallet: { type: String, required: false },
        base64Image: { type: String, required: false },
    },
    { timestamps: true }
);

export const LabelModel: Model<Label> = mongoose.model<Label>("Label", labelSchema, "label");