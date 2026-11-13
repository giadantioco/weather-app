import type { City } from "@/types/weather";
import cities from "@/data/cities-with-coords.json";
import style from "./CitySelector.module.scss";
import Image from "next/image";

export type CitySelectorProps = {
  onSelect: (selectedCity: City) => void;
  isLoading: boolean;
};

export default function CitySelector({
  onSelect,
  isLoading,
}: CitySelectorProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = e.target.value;
    const selectedCity = cities.find((city) => city.value === selectedValue);
    if (!selectedCity) {
      return;
    }
    onSelect(selectedCity);
  }

  return (
    <>
      <div className={style.selectWrapper}>
        <select
          className={style.citySelect}
          defaultValue=""
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            Please choose a city
          </option>
          {cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.name}
            </option>
          ))}
        </select>
        {isLoading && <span className={style.spinner}>⏳</span>}
      </div>
      <button type="button" className={style.geolocation}>
        Use your location
        <Image src="/icons/geolocation.svg" width={20} height={20} alt="" />
      </button>
    </>
  );
}
