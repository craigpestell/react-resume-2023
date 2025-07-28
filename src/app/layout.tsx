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
  Outfit,
  JetBrains_Mono,
  Fira_Code,
  Ubuntu_Mono,
  Space_Mono,
  Inconsolata
} from 'next/font/google';
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-firacode',
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ubuntu',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-spacemono',
});

const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
});

export const metadata: Metadata = {
  title: "Craig Pestell - Senior Software Engineer | React, TypeScript, Enterprise Applications",
  description: "Senior Software Engineer with 15+ years at Apple, Google, Williams Sonoma. Expert in React, TypeScript, Node.js, and enterprise platform architecture. Available for senior engineering roles.",
  keywords: [
    "Senior Software Engineer",
    "React Developer", 
    "TypeScript Expert",
    "Full Stack Developer",
    "Enterprise Applications",
    "Apple Engineer",
    "Google Engineer",
    "Williams Sonoma",
    "Node.js",
    "Next.js",
    "Frontend Architecture",
    "Backend Development",
    "Software Engineering"
  ],
  authors: [{ name: "Craig Pestell" }],
  creator: "Craig Pestell",
  publisher: "Craig Pestell",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://craigpestell.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Craig Pestell - Senior Software Engineer",
    description: "Senior Software Engineer with 15+ years at Apple, Google, Williams Sonoma. Expert in React, TypeScript, and enterprise platform architecture.",
    url: 'https://craigpestell.com',
    siteName: 'Craig Pestell Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/profile.png',
        width: 1200,
        height: 630,
        alt: 'Craig Pestell - Senior Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Craig Pestell - Senior Software Engineer",
    description: "Senior Software Engineer with 15+ years at Apple, Google, Williams Sonoma. Expert in React, TypeScript, and enterprise applications.",
    images: ['/images/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'hAqHzu_K3PfENU9q8cAvUnrUkR4i9mICr47ijQr3qgY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" data-theme="default">
      <body
        className={`${nunito.className} ${GeistSans.className} ${inter.variable} ${roboto.variable} ${openSans.variable} ${poppins.variable} ${montserrat.variable} ${sourceSans.variable} ${nunito.variable} ${lato.variable} ${workSans.variable} ${dmSans.variable} ${plusJakarta.variable} ${outfit.variable} ${jetbrainsMono.variable} ${firaCode.variable} ${ubuntuMono.variable} ${spaceMono.variable} ${inconsolata.variable} tracking-wide antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
