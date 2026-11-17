import mongoose, { Schema, Model } from "mongoose";

export interface IFiveContinentsJourney {
  order: number;
  year_range: string;
  country: string;
  city: string;
  continent: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  activities: string;
  historical_significance: string;
  image_url: string;
  source_name: string;
  source_url: string;
  verified: boolean;
}

const FiveContinentsJourneySchema = new Schema<IFiveContinentsJourney>(
  {
    order: { type: Number, required: true, unique: true },
    year_range: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    continent: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    activities: { type: String, required: true },
    historical_significance: { type: String, required: true },
    image_url: { type: String, required: true },
    source_name: { type: String, required: true },
    source_url: { type: String, required: true },
    verified: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const FiveContinentsJourney: Model<IFiveContinentsJourney> =
  mongoose.models.FiveContinentsJourney ||
  mongoose.model<IFiveContinentsJourney>("FiveContinentsJourney", FiveContinentsJourneySchema, "five_continents_journey");
