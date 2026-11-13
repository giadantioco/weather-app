export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");

  if (name === null) {
    return Response.json(
      { error: "No cityname provided. Please write a city name" },
      { status: 400 },
    );
  }
  const cleanName = name.trim();
  if (cleanName.length < 3) {
    return Response.json(
      { error: "please insert at least three characters" },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({
    name: cleanName,
    count: "5",
    language: "it",
    format: "json",
  });

  try {
    const openUrl = `https://geocoding-api.open-meteo.com/v1/search?${params}`;
    console.log(openUrl);
    const response = await fetch(openUrl);
    if (!response.ok) {
      return Response.json(
        { error: "meteo service for selected city not available" },
        { status: 503 },
      );
    }

    const data = await response.json();
    console.log(data);
    const cityList = data.results ?? [];
    return Response.json(cityList);
  } catch {
    return Response.json(
      { error: "impossible contact meteo service" },
      { status: 503 },
    );
  }
}
