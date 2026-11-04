import Header from "@/components/Header/Header";
import CitySelector from "@/components/CitySelector/CitySelector";
import WeatherResult from "@/components/WeatherResult/WeatherResult";
import { WeatherData } from "@/types/weather";
import style from "./WeatherApp.module.scss";
import { getTimeSlot } from "@/lib/time/getTimeSlot";

const fakeWeather: WeatherData = {
  cityName: "Milano",
  dateTime: "04/11/2026, 13.20",
  description: "Windy, Clear",
  temperature: 16,
  wind: 4,
  humidity: 46,
};

const timeSlot = getTimeSlot(15);

export default function WeatherApp() {
  return (
    <div className={`${style.background} ${style[timeSlot]}`}>
      <div className={style.appContainer}>
        <Header />
        <main className={style.main}>
          <CitySelector />
          <WeatherResult weather={fakeWeather} />
        </main>
      </div>
    </div>
  );
}
