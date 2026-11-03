import style from "./Header.module.scss";
import Image from "next/image";

export default function Header() {
  return (
    <header className={style.container}>
      <Image src="/logo.png" alt="weather-app" width={160} height={75} />
      <div className={style.dateTime}></div>
    </header>
  );
}
