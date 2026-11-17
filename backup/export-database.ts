const fs = require('fs');
const path = require('path');

const {
  verifiedPhotos,
  verifiedJourney,
  verifiedStories,
  verifiedResistance,
} = require('../src/data/verified-data');

const backupData = {
  version: "1.0.0",
  backup_date: new Date().toISOString(),
  database: "ho_chi_minh_memorial",
  deployment_url: "https://trien-lam-ho-chi-minh.vercel.app",
  collections: {
    real_photos: verifiedPhotos,
    five_continents_journey: verifiedJourney,
    stories_and_milestones: verifiedStories,
    resistance_history: verifiedResistance,
  },
  stats: {
    real_photos_count: verifiedPhotos.length,
    journey_stops_count: verifiedJourney.length,
    stories_count: verifiedStories.length,
    resistance_events_count: verifiedResistance.length,
  }
};

fs.writeFileSync(
  path.join(__dirname, 'database-backup.json'),
  JSON.stringify(backupData, null, 2),
  'utf8'
);

console.log('Exported database-backup.json successfully!');
