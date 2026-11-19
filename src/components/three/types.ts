import type { MutableRefObject } from "react";
import type { IRealPhoto } from "@/models/RealPhoto";
import type { IFiveContinentsJourney } from "@/models/FiveContinentsJourney";
import type { IStoryMilestone } from "@/models/StoryMilestone";
import type { IResistanceHistory } from "@/models/ResistanceHistory";

export interface Exhibition3DData {
  photos: IRealPhoto[];
  journey: IFiveContinentsJourney[];
  stories: IStoryMilestone[];
  resistanceHistory: IResistanceHistory[];
}

export type ChapterKey =
  | "opening"
  | "photos"
  | "journey"
  | "stories"
  | "resistance";

export interface ExhibitionChapter {
  id: ChapterKey;
  index: number;
  label: string;
  era: string;
  anchorId: string;
}

export interface ScrollTelemetry {
  progress: number;
  activeChapter: number;
  activeStop: number;
}

export type ScrollTelemetryRef = MutableRefObject<ScrollTelemetry>;

export interface PointerOffset {
  x: number;
  y: number;
}

export type PointerOffsetRef = MutableRefObject<PointerOffset>;

export const EXHIBITION_CHAPTERS: ExhibitionChapter[] = [
  {
    id: "opening",
    index: 0,
    label: "Khai Mạc",
    era: "1890 – 1969",
    anchorId: "stage-opening",
  },
  {
    id: "photos",
    index: 1,
    label: "Tư Liệu Ảnh Gốc",
    era: "1910 – 1958",
    anchorId: "stage-photos",
  },
  {
    id: "journey",
    index: 2,
    label: "Hành Trình 5 Châu",
    era: "1911 – 1941",
    anchorId: "stage-journey",
  },
  {
    id: "stories",
    index: 3,
    label: "Kho Tàng Câu Chuyện",
    era: "1911 – 1962",
    anchorId: "stage-stories",
  },
  {
    id: "resistance",
    index: 4,
    label: "Hai Cuộc Kháng Chiến",
    era: "1945 – 1975",
    anchorId: "stage-resistance",
  },
];
