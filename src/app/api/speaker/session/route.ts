import { NextResponse, type NextRequest } from "next/server";
import { getSpeakerIdFromSession } from "@/app/lib/speakerSession";

export async function GET(request: NextRequest) {
  const speakerId = getSpeakerIdFromSession(request);
  return NextResponse.json({
    authenticated: speakerId !== null,
    speakerId,
  });
}
