export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return Response.json({ error: "lat e lon are mandatory" }, { status: 400 });
  }
  if (Number.isNaN(Number(lat))) {
    return Response.json(
      { error: "latitude must be a number" },
      { status: 400 },
    );
  }
  if (Number.isNaN(Number(lon))) {
    return Response.json(
      { error: "longitude must be a number" },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current:
      "is_day,weather_code,relative_humidity_2m,wind_speed_10m,temperature_2m",
    timezone: "auto",
  });
  const apiUrl = `https://api.open-meteo.com/v1/forecast?${params}`;
  const response = await fetch(apiUrl);
  try {
    if (!response.ok) {
      return Response.json(
        { error: "meteo service not available" },
        { status: 502 },
      );
    }
  } catch {
    return Response.json({ error: "error" }, { status: 508 });
  }

  const data = await response.json();

  return Response.json(data);
}
