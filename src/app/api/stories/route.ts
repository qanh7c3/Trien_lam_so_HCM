import { NextResponse } from "next/server";
import { getStories } from "@/lib/data-service";

export async function GET() {
  const stories = await getStories();
  return NextResponse.json({ success: true, count: stories.length, data: stories });
}
