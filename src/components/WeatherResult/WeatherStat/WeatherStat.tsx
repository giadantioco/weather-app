import Image from "next/image";
import style from "./WeatherStat.module.scss";

export type WeatherStatProps = {
  icon: string;
  label: string;
  value: number;
  unit: string;
};

export default function WeatherStat(props: WeatherStatProps) {
  return (
    <div className={style.weatherStats}>
      <Image src={props.icon} width={40} height={40} alt="" />
      <p>{props.label}</p>
      <p>
        {props.value} {props.unit}
      </p>
    </div>
  );
}
