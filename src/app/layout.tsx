import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.scss";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Generated with next app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={syne.variable}>
      <body>{children}</body>
    </html>
  );
}
