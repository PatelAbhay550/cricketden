import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CricketDen - Latest Cricket Score and Analysis",
  description:
    "Cricket live Score by Abhay Patel. Get latest cricket score, Cricket Schedule, Upcoming Cricket tour details",
   keywords: ['Cricketden', 'Cricket den', 'IPL 2025','IPL','IPL News','Live cricket','Live cricket scorecard']
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
    <meta name="google-site-verification" content="7-6j7haeyJWEhikD2wtLIv8Ei8tdX7VOIO3amkGNYdo" />
    <meta name="google-site-verification" content="CP-bBZfPoKzhXDdIAAeb5AvIDbZoMMJToPGRiBTbb00" />
    </head>
      <body className={inter.className}>
        <Header />
        {children}<Analytics/>
        <Footer />
      </body>
    </html>
  );
}
