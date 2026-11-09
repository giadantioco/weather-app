"use client"
import Header from "@/components/Header/Header";
import CitySelector from "@/components/CitySelector/CitySelector";
import WeatherResult from "@/components/WeatherResult/WeatherResult";
import { WeatherData, City } from "@/types/weather";
import style from "./WeatherApp.module.scss";
import { getTimeSlot } from "@/lib/time/getTimeSlot";
import { useState } from "react";


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
      console.log(result)
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
          <WeatherResult weather={fakeWeather} />
        </main>
      </div>
    </div>
  );
}
