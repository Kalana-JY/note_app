const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5000";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

async function proxyNoteRequest(request: Request, id: string) {
  const response = await fetch(`${BACKEND_URL}/notes/${id}`, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: request.method === "DELETE" ? undefined : await request.text(),
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function GET(request: Request, context: Params) {
  const { id } = await context.params;
  return proxyNoteRequest(request, id);
}

export async function PUT(request: Request, context: Params) {
  const { id } = await context.params;
  return proxyNoteRequest(request, id);
}

export async function DELETE(request: Request, context: Params) {
  const { id } = await context.params;
  return proxyNoteRequest(request, id);
}