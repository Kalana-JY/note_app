const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5000";

export async function GET() {
  const response = await fetch(`${BACKEND_URL}/notes`, {
    cache: "no-store",
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function POST(request: Request) {
  const response = await fetch(`${BACKEND_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: await request.text(),
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });
}