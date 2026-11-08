import cities from "@/data/cities-with-coords.json";
export type City = (typeof cities)[number];

export type WeatherData = {
  cityName: string;
  dateTime: string;
  description: string;
  temperature: number;
  wind: number;
  humidity: number;
};
