import { NextResponse } from "next/server";
import { getRealPhotos } from "@/lib/data-service";

export async function GET() {
  const photos = await getRealPhotos();
  return NextResponse.json({ success: true, count: photos.length, data: photos });
}
