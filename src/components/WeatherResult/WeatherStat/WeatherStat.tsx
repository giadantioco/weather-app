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
    <div className={style.stats}>
      <Image src={props.icon} width={25} height={25} alt="" />
      <p className={style.label}>{props.label}</p>
      <p>
        {props.value} {props.unit}
      </p>
    </div>
  );
}
