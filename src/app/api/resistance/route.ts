import { NextRequest, NextResponse } from "next/server";
import { getResistanceHistory } from "@/lib/data-service";

export async function GET(req: NextRequest) {
  const period = req.nextUrl.searchParams.get("period") as "chong-phap" | "chong-my" | null;
  const history = await getResistanceHistory(period || undefined);
  return NextResponse.json({ success: true, count: history.length, data: history });
}
