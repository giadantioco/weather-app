import Image from "next/image";
import style from "./CitySearch.module.scss";
import { useState } from "react";

export default function CitySearch() {
  // TODO 5a: stato query (che tipo? che valore iniziale?)
  const [input, setInput] = useState("");

  // TODO 5a: handleSubmit(e) → niente ricaricamento → console.log(query)
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setInput(inputValue);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(input);
  }

  return (
    <form className={style.formContainer} onSubmit={handleSubmit}>
      <label htmlFor="city-input" className={style.visuallyHidden}>
        Search a city
      </label>
      <input
        type="text"
        id="city-input"
        className={style.cityInput}
        placeholder="Please insert a city"
        required
        value={input}
        onChange={handleChange}
      />
      <button type="submit" className={style.submitBtn}>
        <Image src="/icons/search.svg" width={20} height={20} alt="Search" />
      </button>
    </form>
  );
}
