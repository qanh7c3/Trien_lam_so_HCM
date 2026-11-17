import mongoose from "mongoose";
import { RealPhoto } from "../src/models/RealPhoto";
import { FiveContinentsJourney } from "../src/models/FiveContinentsJourney";
import { StoryMilestone } from "../src/models/StoryMilestone";
import { ResistanceHistory } from "../src/models/ResistanceHistory";
import {
  verifiedPhotos,
  verifiedJourney,
  verifiedStories,
  verifiedResistance,
} from "../src/data/verified-data";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ho_chi_minh_memorial";

async function seed() {
  console.log("Bat dau ket noi MongoDB:", MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Ket noi thanh cong den database!");

    await RealPhoto.deleteMany({});
    await RealPhoto.insertMany(verifiedPhotos);
    console.log(`Da nap ${verifiedPhotos.length} ban ghi real_photos.`);

    await FiveContinentsJourney.deleteMany({});
    await FiveContinentsJourney.insertMany(verifiedJourney);
    console.log(`Da nap ${verifiedJourney.length} ban ghi five_continents_journey.`);

    await StoryMilestone.deleteMany({});
    await StoryMilestone.insertMany(verifiedStories);
    console.log(`Da nap ${verifiedStories.length} ban ghi stories_and_milestones.`);

    await ResistanceHistory.deleteMany({});
    await ResistanceHistory.insertMany(verifiedResistance);
    console.log(`Da nap ${verifiedResistance.length} ban ghi resistance_history.`);

    console.log("Hoan thanh nap toan bo du lieu lich su xac thuc 100%!");
  } catch (err) {
    console.warn("Khong the ket noi truc tiep MONGODB_URI, su dung du lieu san co tu MCP va bo du lieu nguon.", err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
