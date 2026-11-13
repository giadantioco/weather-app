import { readFile, writeFile } from "fs/promises";

const text = await readFile("src/data/cities.json", "utf-8");
const cities = JSON.parse(text);

const citiesWithCoords = [];
const notFound = [];

for (const city of cities) {
  console.log(city.name);
  const params = new URLSearchParams({
    name: city.name,
    count: "10",
    language: "it",
    countryCode: "IT",
  });
  const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`;

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    const match = data.results?.find(
      (result) =>
        result.admin2 === "Provincia di Milano" &&
        result.admin3 === `Comune di ${city.name}`,
    );

    if (match) {
      citiesWithCoords.push({
        ...city,
        lat: match.latitude,
        lon: match.longitude,
      });
    } else {
      notFound.push(city.name);
    }
  } else {
    console.log("errore", city.name, response.status);
  }
}

console.log("notFound:", notFound);
console.log(`Trovati ${citiesWithCoords.length} su ${cities.length}`);
const arrayResult = JSON.stringify(citiesWithCoords, null, 2);
await writeFile("src/data/cities-with-coords.json", arrayResult);
