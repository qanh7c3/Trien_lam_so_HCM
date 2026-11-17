import mongoose, { Schema, Model } from "mongoose";

export interface IResistanceHistory {
  war_period: "chong-phap" | "chong-my";
  date_label: string;
  year: number;
  event_title: string;
  campaign_or_context: string;
  ho_chi_minh_role: string;
  authentic_quote: string;
  outcome: string;
  directive_or_order?: string;
  commander?: string;
  image_url: string;
  source_name: string;
  source_url: string;
  verified: boolean;
}

const ResistanceHistorySchema = new Schema<IResistanceHistory>(
  {
    war_period: {
      type: String,
      required: true,
      enum: ["chong-phap", "chong-my"],
    },
    date_label: { type: String, required: true },
    year: { type: Number, required: true },
    event_title: { type: String, required: true },
    campaign_or_context: { type: String, required: true },
    ho_chi_minh_role: { type: String, required: true },
    authentic_quote: { type: String, required: true },
    outcome: { type: String, required: true },
    directive_or_order: { type: String, required: false },
    commander: { type: String, required: false },
    image_url: { type: String, required: true },
    source_name: { type: String, required: true },
    source_url: { type: String, required: true },
    verified: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const ResistanceHistory: Model<IResistanceHistory> =
  mongoose.models.ResistanceHistory ||
  mongoose.model<IResistanceHistory>("ResistanceHistory", ResistanceHistorySchema, "resistance_history");
