import Image from "next/image";
import style from "./CitySearch.module.scss";

export default function CitySearch() {
  // TODO 5a: stato query (che tipo? che valore iniziale?)

  // TODO 5a: handleSubmit(e) → niente ricaricamento → console.log(query)

  return (
    <form className={style.formContainer} /* TODO: onSubmit */>
      <label htmlFor="city-input" className={style.visuallyHidden}>
        Search a city
      </label>
      <input
        type="text"
        id="city-input"
        className={style.cityInput}
        placeholder="Please insert a city"
        required
        /* TODO: value + onChange (evento: React.ChangeEvent<???>) */
      />
      <button type="submit" className={style.submitBtn}>
        <Image src="/icons/search.svg" width={20} height={20} alt="Search" />
      </button>
    </form>
  );
}
