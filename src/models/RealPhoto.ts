import mongoose, { Schema, Model } from "mongoose";

export interface IRealPhoto {
  title: string;
  year: number;
  location: string;
  historical_context: string;
  image_url: string;
  source_name: string;
  source_url: string;
  verified: boolean;
}

const RealPhotoSchema = new Schema<IRealPhoto>(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    location: { type: String, required: true },
    historical_context: { type: String, required: true },
    image_url: { type: String, required: true },
    source_name: { type: String, required: true },
    source_url: { type: String, required: true },
    verified: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const RealPhoto: Model<IRealPhoto> =
  mongoose.models.RealPhoto || mongoose.model<IRealPhoto>("RealPhoto", RealPhotoSchema, "real_photos");
