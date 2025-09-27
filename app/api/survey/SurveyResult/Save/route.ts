import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();

    console.log("Proxy API received:", body);

    // Forward the request to the external API
    const response = await fetch(
      "http://virilan362-001-site1.rtempurl.com/api/SurveyResult/Save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    console.log("External API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("External API error:", errorText);
      return NextResponse.json(
        { error: `External API error: ${errorText}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("External API success:", result);

    // Return the response from the external API
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Proxy API error:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Proxy error: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
