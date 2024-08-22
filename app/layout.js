import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CricketDen - Latest Cricket Score and Analysis",
  description: "Cricket live Score by Abhay Patel. Get latest cricket score, Cricket Schedule, Upcoming Cricket tour details",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
