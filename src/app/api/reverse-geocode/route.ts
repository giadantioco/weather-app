export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return Response.json(
      { error: "Lat and lon are required" },
      { status: 400 },
    );
  }
  const numberLat = Number(lat);
  const numberLon = Number(lon);

  if (Number.isNaN(numberLat)) {
    return Response.json(
      { error: "Latitude must be a number" },
      { status: 400 },
    );
  }

  if (Number.isNaN(numberLon)) {
    return Response.json(
      { error: "Longitude must be a number" },
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
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?${params}`;
    console.log(nominatimUrl);
    const response = await fetch(nominatimUrl, {
      headers: { "User-Agent": "weather-app (giadantioco)" },
    });
    if (!response.ok) {
      return Response.json(
        { error: "Weather forecast for selected city not available" },
        { status: 503 },
      );
    }

    const data = await response.json();

    const name =
      data.address?.city ?? data.address?.town ?? data.address?.village;
    if (!name) {
      return Response.json(
        { error: "Please insert a valid city" },
        { status: 400 },
      );
    }

    return Response.json({ name: name });
  } catch {
    return Response.json(
      { error: "Location service not available" },
      { status: 503 },
    );
  }
}
