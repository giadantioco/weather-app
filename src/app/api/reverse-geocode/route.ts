import { CitySearchResult } from "@/types/weather";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return Response.json(
      { error: "lat and lon are required" },
      { status: 400 },
    );
  }
  const numberLat = Number(lat);
  const numberLon = Number(lon);

  if (Number.isNaN(numberLat)) {
    return Response.json(
      { error: "latitude must be a number" },
      { status: 400 },
    );
  }

  if (Number.isNaN(numberLon)) {
    return Response.json(
      { error: "longitude must be a number" },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({
    lat: lat,
    lon: lon,
    format: "jsonv2",
    "accept-language": "it",
  });

  try {
    const nominatiumUrl = `https://nominatim.openstreetmap.org/reverse?${params}`;
    console.log(nominatiumUrl);
    const response = await fetch(nominatiumUrl, {
      headers: { "User-Agent": "weather-app (giadantioco)" },
    });
    if (!response.ok) {
      return Response.json(
        { error: "meteo service for selected city not available" },
        { status: 503 },
      );
    }

    const data = await response.json()
    return Response.json(data);


  } catch {
    return Response.json(
      { error: "impossible contact meteo service" },
      { status: 503 },
    );
  }
}
