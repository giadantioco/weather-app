export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return Response.json({ error: "lat and lon are mandatory" }, { status: 400 });
  }

  const numberLat = Number(lat)
  const numberLon = Number(lon)

  if (Number.isNaN(numberLat) || numberLat < -90 || numberLat > 90) {
    return Response.json(
      { error: "latitude must be a number between -90 and 90" },
      { status: 400 },
    );
  }
  if (Number.isNaN(numberLon) || numberLon < -180 || numberLon > 180) {
    return Response.json(
      { error: "longitude must be a number between -180 and 180" },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({
    latitude: numberLat.toString(),
    longitude: numberLon.toString(),
    current:
      "is_day,weather_code,relative_humidity_2m,wind_speed_10m,temperature_2m",
    timezone: "auto",
  });

  try {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?${params}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return Response.json(
        { error: "meteo service not available" },
        { status: 502 },
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch {
    return Response.json(
      { error: "impossible contatct meteo service" },
      { status: 502 },
    );
  }
}
