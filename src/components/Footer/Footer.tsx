import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Weather data by{" "}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open-Meteo.com
        </a>
        {" · "}
        Icons by{" "}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenWeather
        </a>
      </p>
    </footer>
  );
}
