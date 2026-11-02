import { cities } from "@/data/cities";
import style from "./CitySelector.module.scss";
import Image from "next/image";

export default function CitySelector() {
  return (
    <section className={style.container}>
      <select className={style.citySelect}>
        {cities.map((city) => (
          <option key={city.value} value={city.value}>
            {city.name}
          </option>
        ))}
      </select>
      <form className={style.formContainer}>
        <label htmlFor="city-input">Search a city</label>
        <input
          type="text"
          id="city-input"
          className={style.cityInput}
          placeholder="Please insert a city"
          required
          title="Please insert a valid input"
        />
        <button type="submit" className={style.submitBtn}>
          <Image src={"/search.svg"} width={20} height={20} alt="search" />
        </button>
      </form>
    </section>
  );
}
