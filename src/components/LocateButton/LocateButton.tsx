"use client";
import style from "./LocateButton.module.scss";
import Image from "next/image";
import { City } from "@/types/weather";
import { useState } from "react";

export type LocateButtonProps = {
  onSelect: (selectedCity: City) => void;
  onError: (message: string) => void;
};

export default function LocateButton({ onSelect, onError }: LocateButtonProps) {
  const [loading, setLoading] = useState(false);

  function handlePosition() {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const params = new URLSearchParams({
          lat: pos.coords.latitude.toString(),
          lon: pos.coords.longitude.toString(),
        });
        const url = `/api/reverse-geocode?${params}`;

        let name = "Your location";

        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            name = data.name;
          }
        } catch {
          console.log("Reverse geocode failed, using fallback name");
        } finally {
          setLoading(false);
        }

        const city: City = {
          name,
          value: "geolocation",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        onSelect(city);
      },

      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          onError("Location access denied. Allow it in your browser settings.");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          onError("Sorry, position unavailable at the moment. Try later.");
        } else if (err.code === err.TIMEOUT) {
          onError("Sorry, the request is taking too long.");
        }
        setLoading(false);
      },

      { timeout: 10000 },
    );
  }

  return (
    <>
      <button
        type="button"
        className={style.geolocation}
        onClick={handlePosition}
        disabled={loading}
      >
        Use your location
        <Image src="/icons/geolocation.svg" width={20} height={20} alt="" />
      </button>
    </>
  );
}
