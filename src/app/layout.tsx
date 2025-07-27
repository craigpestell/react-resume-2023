import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { 
  Inter, 
  Roboto, 
  Open_Sans, 
  Poppins, 
  Montserrat,
  Source_Sans_3,
  Nunito,
  Lato,
  Work_Sans,
  DM_Sans,
  Plus_Jakarta_Sans,
  Outfit
} from 'next/font/google';
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

// Configure Google Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sourcesans',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-worksans',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plusjakarta',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "Craig Pestell - Portfolio",
  description: "Full Stack Developer Portfolio showcasing skills and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${nunito.className} ${GeistSans.className} ${inter.variable} ${roboto.variable} ${openSans.variable} ${poppins.variable} ${montserrat.variable} ${sourceSans.variable} ${nunito.variable} ${lato.variable} ${workSans.variable} ${dmSans.variable} ${plusJakarta.variable} ${outfit.variable} tracking-wide antialiased`}
      >
        <ThemeProvider defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
