import { readFile, writeFile } from "fs/promises";

const text = await readFile("src/data/cities.json", "utf-8");
const cities = JSON.parse(text);
const testCities = cities.slice(0, 3);

for (const city of testCities) {
  const params = new URLSearchParams({
    name: city.name,
    count: "2",
    language: "en",
    countryCode: "IT",
  })
  const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`
  console.log(url)

  const response = await fetch(url)
  console.log(response.url)

  if (response.ok) {
    const data = await response.json()
    console.log(data.results)
  } else {
    console.log(city.name, response.status)
  }
}
