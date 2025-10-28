import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://virilan362-001-site1.rtempurl.com/api/Reports/summary",
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Don't cache to always get fresh data
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch reports summary:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
