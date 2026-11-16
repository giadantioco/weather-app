"use client";
import style from "./LocateButton.module.scss";
import Image from "next/image";
import { City } from "@/types/weather";

export type LocateButtonProps = {
  onSelect: (selectedCity: City) => void;
};

function handlePosition() {
  navigator.geolocation.getCurrentPosition((pos) => {
    console.log(pos.coords.latitude, pos.coords.longitude);
  });
}

export default function LocateButton({ onSelect }: LocateButtonProps) {
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
