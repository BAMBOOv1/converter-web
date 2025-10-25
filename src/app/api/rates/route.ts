import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get("base") || "USD";

  const baseUrl = process.env.EXCHANGE_RATE_API_URL;
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;

  if (!baseUrl) {
    return NextResponse.json(
      { error: "EXCHANGE_RATE_API_URL is not configured" },
      { status: 500 }
    );
  }

  let endpoint: string;
  if (apiKey) {
    endpoint = `${baseUrl.replace(
      /\/$/,
      ""
    )}/${apiKey}/latest/${encodeURIComponent(base)}`;
  } else {
    endpoint = `${baseUrl.replace(/\/$/, "")}/${encodeURIComponent(base)}`;
  }

  try {
    const res = await fetch(endpoint, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();

    const rates = (data && (data.conversion_rates || data.rates)) || null;

    if (!rates || typeof rates !== "object") {
      return NextResponse.json(
        { error: "Invalid response from exchange rate API" },
        { status: 500 }
      );
    }

    return NextResponse.json({ rates }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch exchange rates",
      },
      { status: 500 }
    );
  }
}
