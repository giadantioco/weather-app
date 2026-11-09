"use client"
import Header from "@/components/Header/Header";
import CitySelector from "@/components/CitySelector/CitySelector";
import WeatherResult from "@/components/WeatherResult/WeatherResult";
import { WeatherData, City } from "@/types/weather";
import style from "./WeatherApp.module.scss";
import { getTimeSlot } from "@/lib/time/getTimeSlot";
import { useState } from "react";

const timeSlot = getTimeSlot(15);

export default function WeatherApp() {
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null)

  async function handleSelect(selectedCity: City) {
    setCity(selectedCity);
    console.log(selectedCity)

    const cityLat = selectedCity.lat.toString();
    const cityLon = selectedCity.lon.toString()

    const searchParams = new URLSearchParams({ lat: cityLat, lon: cityLon })
    const url = `/api/forecast?${searchParams}`
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      const result = await response.json()
      if (!response.ok) {
        setError(result.error)
        return;
      }
      const weather: WeatherData = {
        cityName: selectedCity.name,
        dateTime: result.current.time,
        description: "will change soon",
        temperature: result.current.temperature_2m,
        wind: result.current.wind_speed_10m,
        humidity: result.current.relative_humidity_2m
      };

      console.log(weather)
      setData(weather);

    } catch (err) {
      setError("I cannot find weather infos atm, sorry. Try later")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={`${style.background} ${style[timeSlot]}`}>
      <div className={style.appContainer}>
        <Header />
        <main className={style.main}>
          <CitySelector onSelect={handleSelect} />
          {loading && loading}
          {error && <p>invalid input </p>}
          {data &&
            <WeatherResult weather={data} />}
        </main>
      </div>
    </div>
  );
}
