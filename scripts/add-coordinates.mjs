import { readFile, writeFile } from "fs/promises";

const text = await readFile("src/data/cities.json", "utf-8");
const cities = JSON.parse(text);
const testCities = cities.slice(0, 3);

for (const city of testCities) {
  console.log(city.name);
}
