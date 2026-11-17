import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { RealPhoto } from "../src/models/RealPhoto";
import { FiveContinentsJourney } from "../src/models/FiveContinentsJourney";
import { StoryMilestone } from "../src/models/StoryMilestone";
import { ResistanceHistory } from "../src/models/ResistanceHistory";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ho_chi_minh_memorial";

async function restore() {
  const backupPath = path.join(__dirname, "database-backup.json");
  if (!fs.existsSync(backupPath)) {
    console.error("Khong tim thay file backup tai:", backupPath);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(backupPath, "utf8"));
  console.log(`Dang khoi phuc ban sao luu phien ban ${data.version} tu ngay ${data.backup_date}...`);

  await mongoose.connect(MONGODB_URI);
  console.log("Da ket noi toi MongoDB:", MONGODB_URI);

  await RealPhoto.deleteMany({});
  await RealPhoto.insertMany(data.collections.real_photos);
  console.log(`Da khoi phuc ${data.collections.real_photos.length} anh tu lieu.`);

  await FiveContinentsJourney.deleteMany({});
  await FiveContinentsJourney.insertMany(data.collections.five_continents_journey);
  console.log(`Da khoi phuc ${data.collections.five_continents_journey.length} chang hanh trinh.`);

  await StoryMilestone.deleteMany({});
  await StoryMilestone.insertMany(data.collections.stories_and_milestones);
  console.log(`Da khoi phuc ${data.collections.stories_and_milestones.length} cau chuyen lich su.`);

  await ResistanceHistory.deleteMany({});
  await ResistanceHistory.insertMany(data.collections.resistance_history);
  console.log(`Da khoi phuc ${data.collections.resistance_history.length} moc son khang chien.`);

  console.log("KHOI PHUC DU LIEU THANH CONG 100%!");
  await mongoose.disconnect();
}

restore().catch((err) => {
  console.error("Loi khi khoi phuc du lieu:", err);
  process.exit(1);
});
