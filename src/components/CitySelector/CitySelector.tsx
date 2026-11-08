
import type { City } from "@/types/weather";
import cities from "@/data/cities-with-coords.json"
import style from "./CitySelector.module.scss";
import Image from "next/image";

export type CitySelectorProps = {
  onSelect: (selectedCity: City) => void;
};

export default function CitySelector({ onSelect }: CitySelectorProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = e.target.value;
    const selectedCity = cities.find((city) => city.value === selectedValue)
    if (!selectedCity) {
      return
    }
    onSelect(selectedCity)
  }

  return (
    <section className={style.container}>
      <select className={style.citySelect} defaultValue="" onChange={handleChange}>
        <option value="" disabled hidden>
          Please choose a city
        </option>
        {cities.map((city) => (
          <option key={city.value} value={city.value}>
            {city.name}
          </option>
        ))}
      </select>

      <button type="button" className={style.geolocation}>
        Use your location
        <Image src="/icons/geolocation.svg" width={20} height={20} alt="" />
      </button>

      <form className={style.formContainer}>
        <label htmlFor="city-input" className={style.visuallyHidden}>
          Search a city
        </label>
        <input
          type="text"
          id="city-input"
          className={style.cityInput}
          placeholder="Please insert a city"
          required
        />
        <button type="submit" className={style.submitBtn}>
          <Image src="/icons/search.svg" width={20} height={20} alt="Search" />
        </button>
      </form>
    </section>
  );
}
