import type { Metadata } from "next";
import Exhibition3DShell from "@/components/three/Exhibition3DShell";
import {
  getJourney,
  getRealPhotos,
  getResistanceHistory,
  getStories,
} from "@/lib/data-service";

export const metadata: Metadata = {
  title: "Triển Lãm Số 3D: Tưởng Nhớ Chủ Tịch Hồ Chí Minh (1890 - 1969)",
  description:
    "Phiên bản Triển Lãm Số 3D Showcase — Tái hiện không gian nghệ thuật đương đại, hành trình 30 năm tìm đường cứu nước và tư liệu lịch sử chính thống 100%.",
};

export default async function Exhibition3DPage() {
  const [photos, journey, stories, resistanceHistory] = await Promise.all([
    getRealPhotos(),
    getJourney(),
    getStories(),
    getResistanceHistory(),
  ]);

  return (
    <main className="min-h-screen bg-[#12100E] text-[#FAF6F0]">
      <Exhibition3DShell
        data={{
          photos,
          journey,
          stories,
          resistanceHistory,
        }}
      />
    </main>
  );
}
