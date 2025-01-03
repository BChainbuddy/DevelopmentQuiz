import { IBM_Plex_Mono, Inter, Inria_Sans } from "next/font/google";

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ibmPlexMono",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const inriaSans = Inria_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inriaSans"
});
