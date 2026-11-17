import { connectToDatabase } from "./mongodb";
import { RealPhoto, IRealPhoto } from "@/models/RealPhoto";
import { FiveContinentsJourney, IFiveContinentsJourney } from "@/models/FiveContinentsJourney";
import { StoryMilestone, IStoryMilestone } from "@/models/StoryMilestone";
import { ResistanceHistory, IResistanceHistory } from "@/models/ResistanceHistory";
import {
  verifiedPhotos,
  verifiedJourney,
  verifiedStories,
  verifiedResistance,
} from "@/data/verified-data";

export async function getRealPhotos(): Promise<IRealPhoto[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const docs = await RealPhoto.find({ verified: true }).sort({ year: 1 }).lean();
      if (docs && docs.length > 0) {
        return JSON.parse(JSON.stringify(docs));
      }
    }
  } catch {
    // fallback to verified local dataset
  }
  return verifiedPhotos;
}

export async function getJourney(): Promise<IFiveContinentsJourney[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const docs = await FiveContinentsJourney.find({ verified: true }).sort({ order: 1 }).lean();
      if (docs && docs.length > 0) {
        return JSON.parse(JSON.stringify(docs));
      }
    }
  } catch {
    // fallback
  }
  return verifiedJourney;
}

export async function getStories(): Promise<IStoryMilestone[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const docs = await StoryMilestone.find({ verified: true }).sort({ year: 1 }).lean();
      if (docs && docs.length > 0) {
        return JSON.parse(JSON.stringify(docs));
      }
    }
  } catch {
    // fallback
  }
  return verifiedStories;
}

export async function getResistanceHistory(period?: "chong-phap" | "chong-my"): Promise<IResistanceHistory[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const filter = period ? { war_period: period, verified: true } : { verified: true };
      const docs = await ResistanceHistory.find(filter).sort({ year: 1 }).lean();
      if (docs && docs.length > 0) {
        return JSON.parse(JSON.stringify(docs));
      }
    }
  } catch {
    // fallback
  }
  if (period) {
    return verifiedResistance.filter((r) => r.war_period === period);
  }
  return verifiedResistance;
}
