import style from "./WeatherResult.module.scss";
import { WeatherData } from "@/types/weather";
import Image from "next/image";
import WeatherStat from "./WeatherStat/WeatherStat";
import weatherCodes from "@/data/weather-codes.json";

export default function WeatherResult({ weather }: { weather: WeatherData }) {
  return (
    <div className={style.container}>
      <div className={style.weatherResult}>
        <p>{weather.dateTime}</p>
        <h2>{weather.cityName}</h2>
        <div className={style.description}>
          <p>{weather.weatherCode}</p>
          <Image src={"/icons/error.svg"} width={120} height={100} alt="" />
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
