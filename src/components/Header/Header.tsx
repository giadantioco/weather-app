import style from "./Header.module.scss";
import Image from "next/image";

export default function Header() {
  return (
    <header className={style.header}>
      <h1 className={style.title}>
        <Image src="/logo.png" alt="Weather App" width={75} height={35} />
      </h1>
    </header>
  );
}
