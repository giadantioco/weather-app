export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return Response.json({ error: "error status 400" }, { status: 400 });
  }

  const response = Response.json({ lat, lon });
  return response;
}
