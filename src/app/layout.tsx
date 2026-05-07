import type { Metadata } from "next";
import "./globals.css";
import { ibmPlexMono, inriaSans, inter } from "./fonts/fonts";
import Navbar from "@/components/Navigation/NavBar";
import SessionProvider from "@/components/Sessionprovider";

export const metadata: Metadata = {
  title: "DevQuiz",
  description: "Software development quiz game",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${inter.variable} ${ibmPlexMono.variable} ${inriaSans.variable} relative overflow-hidden h-screen flex flex-col`}
      >
        <SessionProvider>
          <Navbar />
          <main className="px-[10%] flex flex-col flex-1 z-10 relative overflow-y-auto">
            {children}
          </main>
        </SessionProvider>
        <div className="absolute top-[90vh] left-1/2 -translate-x-1/2 w-[90vh] aspect-square rounded-full bg-[#D9D9D930] blur-[100px] z-0 blurredItem"></div>
        {/* <div className="circleBg w-[150vw] h-[300vh] absolute top-0 left-1/2 -translate-x-1/2"></div> */}
      </body>
    </html>
  );
}
