import Image from "next/image";
import style from "./CitySearch.module.scss";
import { useState } from "react";
import { CitySearchResult } from "@/types/weather";

export default function CitySearch() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CitySearchResult[]>([]);


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setInput(inputValue);
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(input);

    try {
      const params = new URLSearchParams({ name: input, });
      const response = await fetch(`/api/geocode?${params}`);
      if (!response.ok) {
        setError("prease insert a valid input");
        return;
      }
      const data = await response.json()
      setResults(data)
      console.log(data)

    } catch {

    }

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
