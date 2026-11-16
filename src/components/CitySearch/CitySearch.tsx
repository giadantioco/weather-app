import Image from "next/image";
import style from "./CitySearch.module.scss";
import { useState } from "react";
import { CitySearchResult } from "@/types/weather";

export default function CitySearch() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setInput(inputValue);
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(input);

    const cleanInput = input.trim();
    if (cleanInput.length < 3) {
      setError("input must be at least 3 charachters long");
      setResults([]);
      return;
    }

    setError(null);
    setResults([]);
    setLoading(true);

    try {
      const params = new URLSearchParams({ name: cleanInput });
      const response = await fetch(`/api/geocode?${params}`);
      if (!response.ok) {
        const errorBody = await response.json();
        setError(errorBody.error ?? "Something went wrong, please try again");
        return;
      }
      const data = await response.json();
      setResults(data);
      console.log(data);
    } catch {
      setError("Network error. Please try later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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

        <button type="submit" className={style.submitBtn} disabled={loading}>
          <Image src="/icons/search.svg" width={20} height={20} alt="Search" />
        </button>
      </form>
      {loading && <p>{"Searching"}</p>}
      {error && <p>{error}</p>}
    </>
  );
}
