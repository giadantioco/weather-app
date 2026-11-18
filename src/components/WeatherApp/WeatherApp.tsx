"use client";
import Header from "@/components/Header/Header";
import CitySelector from "@/components/CitySelector/CitySelector";
import CitySearch from "@/components/CitySearch/CitySearch";
import WeatherResult from "@/components/WeatherResult/WeatherResult";
import { WeatherData, City } from "@/types/weather";
import style from "./WeatherApp.module.scss";
import { getTimeSlot } from "@/lib/time/getTimeSlot";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import LocateButton from "@/components/LocateButton/LocateButton";
import Toast from "@/components/Toast/Toast";
import { TimeSlot } from "@/types/timeslot";

export default function WeatherApp() {
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);
  const [timeSlot, setTimeSlot] = useState<TimeSlot | null>(null);

  useEffect(() => {
    function updateSlot() {
      setTimeSlot(getTimeSlot(new Date().getHours()));
    }
    updateSlot();
    const intervalId = setInterval(updateSlot, 60_000);
    return () => clearInterval(intervalId);
  }, []);

  async function handleSelect(selectedCity: City) {
    setCity(selectedCity);
    console.log(selectedCity);

    const cityLat = selectedCity.lat.toString();
    const cityLon = selectedCity.lon.toString();

    const searchParams = new URLSearchParams({ lat: cityLat, lon: cityLon });
    const url = `/api/forecast?${searchParams}`;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (!response.ok) {
        setError(result.error);
        setData(null);
        return;
      }

      const weather: WeatherData = {
        cityName: selectedCity.name,
        dateTime: result.current.time,
        isDay: result.current.is_day === 1,
        weatherCode: result.current.weather_code,
        temperature: result.current.temperature_2m,
        wind: result.current.wind_speed_10m,
        humidity: result.current.relative_humidity_2m,
      };

      console.log(weather);
      setData(weather);
    } catch (err) {
      setError("Unable to load city. Check your connection and try again.");
      console.error(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }
  console.log("error:", error);
  return (
    <div className={`${style.background} ${timeSlot ? style[timeSlot] : ""}`}>
      <div className={style.appContainer}>
        <Header />
        <main className={style.main}>
          {error && <Toast message={error} onClose={() => setError(null)} />}
          <section className={style.controls}>
            <CitySelector onSelect={handleSelect} isLoading={loading} />
            <LocateButton onSelect={handleSelect} onError={setError} />
            <CitySearch onSelect={handleSelect} onError={setError} />
          </section>
          <div className={style.resultArea} role="status">
            {data && <WeatherResult weather={data} />}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
