import Header from "@/components/Header/Header";
import CitySelector from "@/components/CitySelector/CitySelector";
import WeatherResult from "@/components/WeatherResult/WeatherResult";
import { WeatherData } from "@/types/weather";

const fakeWeather: WeatherData = {
  cityName: "Milano",
  dateTime: "04/11/2026, 13.20",
  description: "Windy, Clear",
  temperature: 16,
  wind: 4,
  humidity: 46,
};

export default function Home() {
  return (
    <>
      <Header />
      <CitySelector />
      <WeatherResult weather={fakeWeather} />
    </>
  );
}
