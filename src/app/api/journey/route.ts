import { NextResponse } from "next/server";
import { getJourney } from "@/lib/data-service";

export async function GET() {
  const journey = await getJourney();
  return NextResponse.json({ success: true, count: journey.length, data: journey });
}
