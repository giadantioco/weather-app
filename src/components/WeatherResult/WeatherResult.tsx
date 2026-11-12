import style from "./WeatherResult.module.scss";
import { WeatherData } from "@/types/weather";
import Image from "next/image";
import WeatherStat from "./WeatherStat/WeatherStat";
import weatherCodes from "@/data/weather-codes.json";
import { WeatherCodeInfo } from "@/types/weather";

export default function WeatherResult({ weather }: { weather: WeatherData }) {
  const codes: Record<string, WeatherCodeInfo | undefined> = weatherCodes;

  const currentWeather = weather.isDay
    ? codes[weather.weatherCode]?.day
    : codes[weather.weatherCode]?.night;
  return (
    <div className={style.container}>
      <div className={style.weatherResult}>
        <p>{weather.dateTime}</p>
        <h2>{weather.cityName}</h2>
        <div className={style.description}>
          <p>
            {currentWeather?.description ??
              "weather description not available "}
          </p>
          <Image
            src={currentWeather?.image ?? "/icons/error.svg"}
            width={100}
            height={100}
            alt=""
          />
        </div>
      </div>
      <div className={style.extraResult}>
        <WeatherStat
          icon="/icons/temperature.svg"
          label="Temperature"
          value={weather.temperature}
          unit="°C"
        />
        <WeatherStat
          icon="/icons/humidity.svg"
          label="Humidity"
          value={weather.humidity}
          unit="%"
        />

        <WeatherStat
          icon="/icons/wind.svg"
          label="Wind"
          value={weather.wind}
          unit="km/h"
        />
      </div>
    </div>
  );
}
