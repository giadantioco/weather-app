import cities from "@/data/cities-with-coords.json";
export type City = (typeof cities)[number];

export type WeatherData = {
  cityName: string;
  dateTime: string;
  isDay: boolean;
  weatherCode: number;
  temperature: number;
  wind: number;
  humidity: number;
};

export type WeatherCodeInfo = {
  day: { description: string; image: string };
  night: { description: string; image: string };
};
