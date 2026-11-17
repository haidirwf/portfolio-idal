import { NextResponse } from "next/server";
import fallbackData from "@/lib/github-contributions-snapshot.json";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch("https://github-contributions-api.jogruber.de/v4/haidirwf?y=last", {
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) {
      throw new Error("External API responded with error");
    }

    const payload = await response.json();
    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    // Return cached fallback data seamlessly
    return NextResponse.json(fallbackData, {
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    });
  }
}
