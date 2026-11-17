import mongoose, { Schema, Model } from "mongoose";

export interface IStoryMilestone {
  date_label: string;
  year: number;
  period: string;
  title: string;
  summary: string;
  full_story: string;
  lesson_or_quote: string;
  historical_context?: string;
  witness_or_teller?: string;
  image_url: string;
  source_name: string;
  source_url: string;
  verified: boolean;
}

const StoryMilestoneSchema = new Schema<IStoryMilestone>(
  {
    date_label: { type: String, required: true },
    year: { type: Number, required: true },
    period: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    full_story: { type: String, required: true },
    lesson_or_quote: { type: String, required: true },
    historical_context: { type: String, required: false },
    witness_or_teller: { type: String, required: false },
    image_url: { type: String, required: true },
    source_name: { type: String, required: true },
    source_url: { type: String, required: true },
    verified: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const StoryMilestone: Model<IStoryMilestone> =
  mongoose.models.StoryMilestone ||
  mongoose.model<IStoryMilestone>("StoryMilestone", StoryMilestoneSchema, "stories_and_milestones");
