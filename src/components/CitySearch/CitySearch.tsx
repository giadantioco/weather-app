import Image from "next/image";
import style from "./CitySearch.module.scss";
import { useState, useEffect } from "react";
import { CitySearchResult, City } from "@/types/weather";

export type CitySearchProps = {
  onSelect: (selectedCity: City) => void;
};

export default function CitySearch({ onSelect }: CitySearchProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const cleanInput = input.trim();
      if (cleanInput.length < 3) {
        setResults([]);
        return;
      }
      searchCities(cleanInput);
    }, 400);
    return () => {
      clearTimeout(timerId);
    };
  }, [input]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setInput(inputValue);
  }

  async function searchCities(query: string) {
    setError(null);
    setResults([]);
    setLoading(true);

    try {
      const params = new URLSearchParams({ name: query });
      const response = await fetch(`/api/geocode?${params}`);
      if (!response.ok) {
        const errorBody = await response.json();
        setError(errorBody.error ?? "Something went wrong, please try again");
        return;
      }
      const data = await response.json();
      setResults(data);
    } catch {
      setError("Network error. Please try later");
    } finally {
      setLoading(false);
    }
  }

  function handleCitySelect(result: CitySearchResult) {
    const city: City = {
      name: result.name,
      value: result.id.toString(),
      lat: result.latitude,
      lon: result.longitude,
    };

    onSelect(city);
    setResults([]);
    setInput("");
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanInput = input.trim();
    if (cleanInput.length < 3) {
      setError("input must be at least 3 charachters long");
      setResults([]);
      return;
    }
    searchCities(cleanInput);
  }

  return (
    <>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <label htmlFor="city-input" className={style.visuallyHidden}>
          Search a city
        </label>
        <div className={style.searchWrapper}>
          <input
            type="text"
            id="city-input"
            className={`${style.cityInput} ${results.length > 0 ? style.cityInputOpen : ""}`}
            placeholder="Please insert a city"
            required
            value={input}
            onChange={handleChange}
          />
          {results.length > 0 && (
            <ul className={style.resultsList}>
              {results.map((city) => (
                <li key={city.id}>
                  <button type="button" onClick={() => handleCitySelect(city)}>
                    {city.name}, {city.admin1}, {city.country}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className={style.submitBtn} disabled={loading}>
          <Image src="/icons/search.svg" width={20} height={20} alt="Search" />
        </button>
      </form>
      {loading && <p>{"Searching"}</p>}
      {error && <p>{error}</p>}
    </>
  );
}
