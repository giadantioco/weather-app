"use client";
import style from "./LocateButton.module.scss";
import Image from "next/image";
import { City } from "@/types/weather";

export type LocateButtonProps = {
  onSelect: (selectedCity: City) => void;
};

export default function LocateButton({ onSelect }: LocateButtonProps) {
  function handlePosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const city: City = {
        name: "your locaTION",
        value: "geolocation",
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      onSelect(city);
    });
  }

  return (
    <button
      type="button"
      className={style.geolocation}
      onClick={handlePosition}
    >
      Use your location
      <Image src="/icons/geolocation.svg" width={20} height={20} alt="" />
    </button>
  );
}
