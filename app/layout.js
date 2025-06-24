import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuHome from "@/components/MenuHome";
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
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8804622562841633" crossorigin="anonymous"></script>
    </head>
      <body className={inter.className}>
        <Header />
    <MenuHome />
        {children}<Analytics/>
    <a href="/" alt="page hit counter" target="_blank" >
<embed src="//s10.histats.com/109.swf"  flashvars="jver=1&acsid=4958585&domi=4"  quality="high"  width="150" height="20" name="109.swf"  align="middle" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" wmode="transparent" /></a>
<img  src="//sstatic1.histats.com/0.gif?4958585&101" alt="site stats" border="0"/>
        <Footer />
      </body>
    </html>
  );
}
