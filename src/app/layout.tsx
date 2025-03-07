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
        className={`antialiased ${inter.variable} ${ibmPlexMono.variable} ${inriaSans.variable} relative overflow-hidden`}
      >
        <SessionProvider>
          <main className="px-[10%] flex flex-col min-h-screen z-10 relative">
            <Navbar />
            {children}
          </main>
        </SessionProvider>
        <div className="absolute top-[90vh] left-1/2 -translate-x-1/2 w-[90vh] aspect-square rounded-full bg-[#D9D9D930] blur-[100px] z-0 blurredItem"></div>
        {/* <div className="circleBg w-[150vw] h-[300vh] absolute top-0 left-1/2 -translate-x-1/2"></div> */}
      </body>
    </html>
  );
}
